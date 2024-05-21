# Kuvaus

Tämä on HY:n fullstack kurssin [osan 13](https://fullstackopen.com/osa13) palautusrepo.

## Apu tarkastajille

Populoi `.env` tiedosto nopsaa alla tavalla:

```sh
PGPASS=$(uuidgen)
echo "\
POSTGRES_PASSWORD=$PGPASS
DATABASE_URL=postgres://postgres:$PGPASS@localhost:5432/postgres
" > .env

# start the containerized database via
docker-compose -f docker-compose.dev.yml up
```
