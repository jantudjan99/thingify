                                                        **Implementacija backenda za web shop u mikroservisnoj arhitekturi**

Završni rad Autor - Jan Tuđan

Mentor: doc. dr. sc. Nikola Tanković (ntankovic.unipu.hr)

Fakultet informatike u Puli: https://fipu.unipu.hr/

**Sažetak**

**Radio sam aplikaciju u okruženju mikroservisne arhitekture. Izabrao sam ovu temu upravo zbog toga jer je ovaj način izrade web aplikacije sve češći, a i kvalitetniji od same monolitne arhitekture kada je u pitanju detaljna aplikacija. Zato se i aplikacije dijele na manje servise. Moja aplikacija Thingify sastoji se od 5 mikroservisa: Posts, Comments, Cart, Payment i Auth. Mikroservis Posts korišten je da bi objavljeni proizvodi bili vidljivi. Povezan je s mikroservisom Komentari na način da dohvaća sve komentare o pojedinom proizvodu. Mikroservis Comments odnosi se na komentare o pojedinom proizvodu i kao što je navedeno komentari su prosljeđeni prema odgovarajućem proizvodu. Cart je servis koji omogućuje dodavanje pojedinog proizvoda u košaricu, napravljen je s mehanizmom koji zbraja ukupnu cijenu i količinu proizvoda koji su dodani u košaricu. Users je servis koji služi kao provjera korisnika, sprema korisničke podatke te kada se korisnik prijavi obavlja se provjera da li korisnik postoji u bazi podataka. Payment služi da bi provjeravao da li postoji navedeni korisnik u bazi. Također Payment vrši provjeru da li je u košaricu uneseno točno koliko je tih podataka u bazi, ako je sve zadovoljavajuće proces plaćanja je uspješan. Također aplikacija je smještena u Docker okruženju gdje su smješteni kontejneri za svaki prijašnje navedeni servis.**
