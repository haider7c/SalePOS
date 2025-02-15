const path = require('path');
const url = require('url');
const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const fs = require('fs');

let mainWindow;
let backendProcess;
let isDev = process.env.NODE_ENV === 'development';

// Function to create the main browser window
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 800,
    show: false,
    icon: path.join(__dirname, 'assets', 'icons', 'icon.png'), // Ensure this path is correct
    webPreferences: {
      nodeIntegration: true, // Allow Node.js integration in the renderer process
      contextIsolation: false, // Disable context isolation for legacy support
    },
  });

  let indexPath;

  // Development mode configuration
  if (isDev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true,
    });
  } else {
    // Start the backend server in production mode
    startBackend();

    // Production build path
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true,
    });
  }

  mainWindow.loadURL(indexPath);

  // Wait for window to be ready and then show it
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();

    // Open DevTools if in development mode
    if (isDev) {
      const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

      installExtension(REACT_DEVELOPER_TOOLS).catch((err) => {
        console.error('Error loading React DevTools: ', err);
      });

      mainWindow.webContents.openDevTools();
    }
  });

  // Handle the window close event
  mainWindow.on('closed', () => {
    mainWindow = null;

    // Stop backend when the main window is closed
    stopBackend();
  });
}

// Function to start the backend server
function startBackend() {
  const backendPath = path.join(__dirname, 'dist', 'backend', 'server.js');

  // Check if the backend file exists
  if (!fs.existsSync(backendPath)) {
    console.error(`Backend server file not found at: ${backendPath}`);
    return;
  }

  console.log('Starting backend server from:', backendPath);

  // Spawn a new Node.js process to run the backend server
  backendProcess = spawn('node', [backendPath], {
    cwd: path.join(__dirname, 'dist', 'backend'), // Working directory for the backend
    stdio: ['inherit', 'pipe', 'pipe'], // Capture stdout and stderr
    shell: true, // Use shell for compatibility
  });

  // Capture backend output for debugging
  backendProcess.stdout.on('data', (data) => {
    console.log(`Backend: ${data}`);
  });

  backendProcess.stderr.on('data', (data) => {
    console.error(`Backend error: ${data}`);
  });

  backendProcess.on('error', (err) => {
    console.error('Error starting backend server:', err);
  });

  backendProcess.on('exit', (code) => {
    if (code !== 0) {
      console.error(`Backend server exited with code: ${code}`);
    } else {
      console.log('Backend server exited successfully.');
    }
  });
}

// Function to stop the backend server
function stopBackend() {
  if (backendProcess) {
    console.log('Stopping backend server...');
    backendProcess.kill();
    backendProcess = null;
  }
}

// App is ready, create the main window
app.on('ready', createMainWindow);

// Quit app when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    stopBackend();
    app.quit();
  }
});

// Recreate the window if the app is reactivated (macOS-specific behavior)
app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});

// Stop Electron renderer process reuse errors in newer Electron versions
app.allowRendererProcessReuse = true;
