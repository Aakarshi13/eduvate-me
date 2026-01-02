# MongoDB Installation & Setup for Windows

## Step 1: Download MongoDB

1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - **Version**: Latest (e.g., 8.0.x)
   - **Platform**: Windows x64
   - **Package**: MSI
3. Click **Download**

## Step 2: Install MongoDB

1. Run the downloaded `.msi` file
2. Click **Next** through the setup wizard
3. Accept the license agreement
4. Choose **Complete** installation
5. When asked "Install MongoDB as a Service", **CHECK the box** to enable it
6. Leave username/password blank (for local development)
7. Click **Install**
8. Click **Finish**

MongoDB will now run automatically as a Windows Service on port `27017`

## Step 3: Verify Installation

Open PowerShell and run:
```powershell
mongosh
```

You should see:
```
MongoDB shell version v8.0.x
connecting to: mongodb://127.0.0.1:27017/?directConnection=true
Session started.
test>
```

Type `exit` to close mongosh

## Step 4: Update Server Configuration

In `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/eduvate
```

## Step 5: Install Server Dependencies

```bash
cd server
npm install
```

## Step 6: Run MongoDB Seed

```bash
npm run seed:mongodb
```

## Troubleshooting

### MongoDB Service Not Running?
```powershell
# Start MongoDB service
Start-Service MongoDB

# Check service status
Get-Service MongoDB

# Stop MongoDB service
Stop-Service MongoDB
```

### Port 27017 Already in Use?
MongoDB might already be running. Check with:
```powershell
netstat -ano | findstr :27017
```

### Connection Refused?
1. Make sure MongoDB service is running: `Get-Service MongoDB`
2. Restart the service: `Restart-Service MongoDB`
3. Check MONGODB_URI in .env file

## Next Steps

After MongoDB is installed and running:

1. Open terminal in `server` directory
2. Run: `npm run seed:mongodb`
3. Start server: `npm run dev`
4. Application is ready!

## Verify with MongoDB Compass (Optional)

Download MongoDB Compass from: https://www.mongodb.com/products/tools/compass

1. Run MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. You should see the "eduvate" database with all collections

That's it! MongoDB is now set up. 🎉
