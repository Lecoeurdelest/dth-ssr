#!/bin/bash
# Deploy Frontend (Next.js) to EC2
# This script builds and deploys the Next.js application

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}→ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Configuration
APP_DIR="/opt/dth/dth-ssr"
SERVICE_NAME="dth-frontend"
PORT=3000

echo "========================================="
echo "Frontend Deployment Script"
echo "========================================="

# Check if directory exists
if [ ! -d "$APP_DIR" ]; then
    print_error "Application directory not found: $APP_DIR"
    exit 1
fi

cd "$APP_DIR"

# Check if package.json exists
if [ ! -f "package.json" ]; then
    print_error "package.json not found!"
    exit 1
fi

# Stop service if running
print_info "Stopping service if running..."
sudo systemctl stop $SERVICE_NAME 2>/dev/null || true
# Also stop PM2 if used
pm2 stop $SERVICE_NAME 2>/dev/null || true
print_success "Service stopped"

# Install/Update dependencies
print_info "Installing dependencies..."
npm install
print_success "Dependencies installed"

# Check for .env.production
if [ ! -f ".env.production" ]; then
    print_info "Creating .env.production..."
    cat > .env.production << EOF
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NODE_ENV=production
PORT=$PORT
EOF
    print_success ".env.production created"
fi

# Build application
print_info "Building Next.js application..."
npm run build

if [ ! -d ".next" ]; then
    print_error "Build failed! .next directory not found"
    exit 1
fi

print_success "Build completed"

# Create logs directory
mkdir -p /opt/dth/logs

# Detect instance type and set optimized NODE_OPTIONS
INSTANCE_TYPE=$(curl -s http://169.254.169.254/latest/meta-data/instance-type 2>/dev/null || echo "unknown")
if [[ "$INSTANCE_TYPE" == *"t2.medium"* ]] || [[ "$INSTANCE_TYPE" == *"t3.medium"* ]]; then
    print_info "Detected instance type: $INSTANCE_TYPE - Using optimized Node.js memory settings"
    NODE_OPTIONS="--max-old-space-size=512"
    MEMORY_LIMIT="768M"
    CPU_QUOTA="100%"
else
    NODE_OPTIONS="--max-old-space-size=1024"
    MEMORY_LIMIT="1536M"
    CPU_QUOTA="150%"
fi

# Create systemd service file
print_info "Creating systemd service with optimized settings..."
sudo tee /etc/systemd/system/$SERVICE_NAME.service > /dev/null << EOF
[Unit]
Description=DTH Frontend Service
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$APP_DIR
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10
StandardOutput=append:/opt/dth/logs/frontend.log
StandardError=append:/opt/dth/logs/frontend-error.log
Environment="NODE_ENV=production"
Environment="PORT=$PORT"
Environment="NODE_OPTIONS=$NODE_OPTIONS"

# Resource limits for optimization
MemoryLimit=$MEMORY_LIMIT
CPUQuota=$CPU_QUOTA

[Install]
WantedBy=multi-user.target
EOF

print_success "Systemd service created"

# Reload systemd and start service
print_info "Starting service..."
sudo systemctl daemon-reload
sudo systemctl enable $SERVICE_NAME
sudo systemctl start $SERVICE_NAME

# Wait a bit for service to start
sleep 5

# Check service status
if sudo systemctl is-active --quiet $SERVICE_NAME; then
    print_success "Service started successfully!"
    print_info "Service status:"
    sudo systemctl status $SERVICE_NAME --no-pager -l
else
    print_error "Service failed to start!"
    print_info "Check logs with: sudo journalctl -u $SERVICE_NAME -n 50"
    exit 1
fi

echo ""
echo "========================================="
print_success "Frontend Deployment Completed!"
echo "========================================="
echo ""
echo "Service: $SERVICE_NAME"
echo "Status: sudo systemctl status $SERVICE_NAME"
echo "Logs: sudo journalctl -u $SERVICE_NAME -f"
echo "Or: tail -f /opt/dth/logs/frontend.log"
echo ""
echo "Frontend should be available at: http://localhost:$PORT"

