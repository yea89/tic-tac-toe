
Hur man spelar

1.  Starta din lokala server (typ WAMP eller nåt liknande).
2.  Lägg projektmappen i din webbmapp (c:/wamp64/www/tic-tac-toe)
3.  Öppna http://localhost/tic-tac-toe/ i två olika flikar eller på två
    datorer.
4.  Skriv in ditt namn och gå med som ‘X’ i ena och ‘O’ i den andra.
5.  Sen bara kör



1.  Vad är ett API? Ett API är typ som en mellanhand mellan olika
    program så att de kan snacka med varandra. I vårt projekt funkar
    PHP-filerna som ett API så att JavaScript kan hämta och spara grejer
    på servern.

2.  Varför måste servern kolla reglerna? Servern måste ha koll så att
    ingen fuskar. Om allt bara låg i JavaScript hade man ganska lätt
    kunnat ändra saker själv och typ göra drag när det inte ens är ens
    tur.

3.  Vad händer om reglerna bara finns i JavaScript? Då hade det varit
    superlätt att fuska. Man kan typ gå in i webbläsaren och ändra saker
    så att man vinner eller gör konstiga drag.

4.  Varför är JSON bra? JSON är ganska enkelt att läsa och använda. Det
    funkar med typ alla språk och är standard på webben så det är
    smidigt när man skickar data fram och tillbaka.

Del 3 Integration

1.  Vad är frontend och backend? Frontend är det man ser alltså det i
    webbläsaren (HTML, CSS, JavaScript). Backend är det som händer
    bakom typ servern och databasen där all logik och data finns.

2.  Varför kan vi inte ha logiken i JavaScript längre? Eftersom det är
    multiplayer måste alla se samma sak. Då behövs en central grej
    (servern) som bestämmer vad som gäller annars hade alla haft sina
    egna versioner av spelet.

3.  Vad gör fetch()? fetch() används för att skicka requests till
    servern utan att sidan laddas om. Vi använder det för att typ hämta
    spelets status skicka drag joina spelet och resetta.

4.  Vad är polling? Polling är när webbläsaren frågar servern hela
    tiden typ varje sekund om något har ändrats. Det gör att spelet
    känns som realtid även om det inte är det på riktigt.

5.  Vad händer om två klickar samtidigt? Servern tar en sak i taget. Så
    den som kommer först går igenom och den andra blir stoppad typ med
    “inte din tur” eller “rutan är upptagen”.
