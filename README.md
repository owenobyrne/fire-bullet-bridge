# fire-bullet-bridge

Run ```npm install``` to get all node dependencies installed.

Run ```node app.js``` to start the server (port 3002 by default).

List all business ID currently set up on the bridge
```bash
curl -o - http://127.0.0.1:3002/businesses
```

Add the details of a new business. Returns the Business ID that can be used as the webhook URL.
```bash
curl -o - -H "Content-Type: application/json" --data '{"email":"email@gmail.com", "token":"19c8d4d1f4c4a98110", "businessid":"", "fireprivatetoken":"asjdk"}' http://127.0.0.1:3002/businesses
```

Get the details of a business ID
```bash
curl -o - http://127.0.0.1:3002/businesses/42135d63-b34f-4eeb-882b-740563490e73
```

Send a test webhook to the bridge. Use jwt.io to generate the JWT using the format { ref: 'INV007', currency: 'EUR', amount: 4800, iban: 'IE69CPAY99119998765432' }
```bash
curl -o - -H "Content-Type: application/jwt" --data "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eG5JZCI6ODAwMSwicmVmSWQiOjEzMDAxLCJ0eG5UeXBlIjp7InR5cGUiOiJMT0RHRU1FTlQiLCJkZXNjcmlwdGlvbiI6IkxvZGdlbWVudCJ9LCJmcm9tIjp7InR5cGUiOiJXSVRIRFJBV0FMX0FDQ09VTlQiLCJhY2NvdW50Ijp7ImlkIjoxNTAwMSwiYWxpYXMiOiJERUZBVUxUIEVVUk8iLCJuc2MiOiI5MDQ5MTUiLCJhY2NvdW50TnVtYmVyIjoiNDc3MzU2NjEiLCJiaWMiOiJCT0ZJSUUyRCIsImliYW4iOiJJRTQ3Qk9GSTkwNDkxNTQ3NzM1NjYxIn19LCJ0byI6eyJ0eXBlIjoiRklSRV9BQ0NPVU5UIiwiYWNjb3VudCI6eyJpZCI6MjAwMSwiYWxpYXMiOiJCdXNpbmVzcyIsIm5zYyI6IjAwMDAwMSIsImFjY291bnROdW1iZXIiOiIwMDAwMDAwMSIsImJpYyI6IkNQQVlJRTJEIiwiaWJhbiI6IklFMTFDUEFZMDAwMDAxMDAwMDAwMDEifX0sImN1cnJlbmN5Ijp7ImNvZGUiOiJFVVIiLCJkZXNjcmlwdGlvbiI6IkV1cm8ifSwiYW1vdW50QmVmb3JlRmVlIjoxMDAwMDAsImZlZUFtb3VudCI6MCwiYW1vdW50QWZ0ZXJGZWUiOjEwMDAwMCwiYmFsYW5jZSI6MTA4OTEzLCJteVJlZiI6IkNhcmFwYXkgMTcxMDIwMTQiLCJkYXRlIjoxNDIxNzYzNTI4NDMwfQ.Q7j31kVtf1bt3HKMdBhFj8XlvQOHhoNywMmglVgqlEU" http://127.0.0.1:3002/webhooks/42135d63-b34f-4eeb-882b-740563490e73
```
