# fire-bullet-bridge

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
curl -o - -H "Content-Type: application/jwt" --data "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWYiOiJJTlYwMDciLCJjdXJyZW5jeSI6IkVVUiIsImFtb3VudCI6NDgwMCwiaWJhbiI6IklFNjlDUEFZOTkxMTk5OTg3NjU0MzIifQ.vmJJGwVjp5vANR5MikRppTpZh-3T9GD1oo9iztFUIRY" http://127.0.0.1:3002/webhooks/42135d63-b34f-4eeb-882b-740563490e73
```
