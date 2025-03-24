# Kuvaus

Tämä on HY:n fullstack kurssin [osan 13](https://fullstackopen.com/osa13) palautusrepo.

## Apu tarkastajille

Populoi `.env` tiedosto nopsaa alla tavalla:

```sh
PGPASS=$(uuidgen)
echo "\
POSTGRES_PASSWORD=$PGPASS
DATABASE_URL=postgres://postgres:$PGPASS@localhost:5432/postgres
SECRET=$(uuidgen)
" > .env

# start the containerized database via
docker-compose -f docker-compose.dev.yml up
```

- 13.10 jälkeen piti ajaa `delete from blogs;` kannassa
- tässä vedin git rebase -i <toka-kommentin-hash> kun pidin joku 10kk tauko ennen kun tuli valmiiksi, voin vain suositella, mahtava työkalu! (kirjoittaa historiaa uudelleen)
