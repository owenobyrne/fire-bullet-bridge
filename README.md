# fire-bullet-bridge
A bridge between a Fire Business Account and BulletHQ. When a lodgement is received in your Fire account, a webhook call is made containing the details of the payment. 
The bridge uses the BulletHQ API to check if this payment matches an open invoice based on the amount, currency and lodgement reference/PO Number. If so, a client payment
against this invoice is made. Otherwise, an email is sent to the BulletHQ user email containing infomation about the payment made.  

Have Node installed first, then pull the code to your server:
```bash
git clone https://github.com/owenobyrne/fire-bullet-bridge.git
cd fire-bullet-bridge
```

Run ```npm install``` to get all node dependencies installed.

Run ```node app.js``` to start the server (port 3002 by default).

List all business ID currently set up on the bridge
```bash
curl -o - http://127.0.0.1:3002/businesses
```

Add the details of a new BulletHQ business by setting the BulletHQ API details and the Fire API Private Token. Returns the Business ID that can be used as the webhook URL.
```bash
curl -o - -H "Content-Type: application/json" --data '{"email":"email@gmail.com", "token":"19c8d4d1f4c4a98110", "businessid":"", "fireprivatetoken":"asjdk"}' http://127.0.0.1:3002/businesses
```

Get the details of a business ID
```bash
curl -o - http://127.0.0.1:3002/businesses/42135d63-b34f-4eeb-882b-740563490e73
```

Send a test webhook to the bridge. Use [jwt.io][] to generate the JWT using the minimal format ```{ "myRef": "INV007", "currency": { "code": "EUR"}, "amountBeforeFee": 4800, "to": { "account": { "iban": "IE69CPAY99119912121212" }}}``` (That's just part of the details in a Fire webhook, but it's all we need for this test.)

| Field | Value                    |
|--------|-------------------------|
| myRef   | This should be the PO Number of an outstanding invoice  |
| currency.code   | This is the currency  |
| amountBeforeFee   | The amount of the invoice in cent (500 = 5 EUR.)  |
| to.account.iban   | The IBAN of one of the bank accounts set up in BulletHQ.  |


```bash
curl -o - -H "Content-Type: application/jwt" --data "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eG5JZCI6ODAwMSwicmVmSWQiOjEzMDAxLCJ0eG5UeXBlIjp7InR5cGUiOiJMT0RHRU1FTlQiLCJkZXNjcmlwdGlvbiI6IkxvZGdlbWVudCJ9LCJmcm9tIjp7InR5cGUiOiJXSVRIRFJBV0FMX0FDQ09VTlQiLCJhY2NvdW50Ijp7ImlkIjoxNTAwMSwiYWxpYXMiOiJERUZBVUxUIEVVUk8iLCJuc2MiOiI5MDQ5MTUiLCJhY2NvdW50TnVtYmVyIjoiNDc3MzU2NjEiLCJiaWMiOiJCT0ZJSUUyRCIsImliYW4iOiJJRTQ3Qk9GSTkwNDkxNTQ3NzM1NjYxIn19LCJ0byI6eyJ0eXBlIjoiRklSRV9BQ0NPVU5UIiwiYWNjb3VudCI6eyJpZCI6MjAwMSwiYWxpYXMiOiJCdXNpbmVzcyIsIm5zYyI6IjAwMDAwMSIsImFjY291bnROdW1iZXIiOiIwMDAwMDAwMSIsImJpYyI6IkNQQVlJRTJEIiwiaWJhbiI6IklFMTFDUEFZMDAwMDAxMDAwMDAwMDEifX0sImN1cnJlbmN5Ijp7ImNvZGUiOiJFVVIiLCJkZXNjcmlwdGlvbiI6IkV1cm8ifSwiYW1vdW50QmVmb3JlRmVlIjoxMDAwMDAsImZlZUFtb3VudCI6MCwiYW1vdW50QWZ0ZXJGZWUiOjEwMDAwMCwiYmFsYW5jZSI6MTA4OTEzLCJteVJlZiI6IkNhcmFwYXkgMTcxMDIwMTQiLCJkYXRlIjoxNDIxNzYzNTI4NDMwfQ.Q7j31kVtf1bt3HKMdBhFj8XlvQOHhoNywMmglVgqlEU" http://127.0.0.1:3002/webhooks/42135d63-b34f-4eeb-882b-740563490e73
```

[jwt.io]: http://jwt.io/
