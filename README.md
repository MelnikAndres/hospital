
# Help

To run servers  use the following on root folder:
```
docker compose up
```

To run tests on hospital api, first run servers then use the following on hospital folder:
```
npm test:local
```

Remember once docker already executed db creation scripts, you need to delete associated volumes before composing, to restart db.


[See Main API](./hospital/README.md)

[See Auth API](./hospital_auth/README.md)