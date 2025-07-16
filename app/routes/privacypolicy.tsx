import React from "react";

export default function PPRoute() {
  return (
    <div className="max-w-xl mx-auto px-4">
      <h1 className="pb-4 font-black">
        Merelaagri gossipi üldised privaatsustingimused
      </h1>

      <p className="pb-4">
        Nendes privaatsustingimustes (Privaatsustingimused) kirjeldame, kuidas
        töötleme isikuandmeid merelaagri gossipi (Gossip) veebi- ja
        mobiilirakendustes.
      </p>

      <p className="font-medium">Milliseid (isiku)andmeid me kogume?</p>
      <ul className="list-disc list-inside">
        <li>Lapse täisnimi</li>
        <li>Autentimise teave (kasutajanimi)</li>
        <li>
          Lapse enda Gossipisse postitatud sisu, mis võivad, aga ei pruugi olla
          isikuandmed.
        </li>
      </ul>

      <p className="pt-2 pb-2">
        Lapsel on alati võimalik ära kustutada mõni kindel enda tehtud postitus
        või terve oma konto. Hiljemalt 2 kuud peale laagrisuve lõppu kustutame
        kogu Gossipi sisu, sh postitused, pildid ja kontod.
      </p>

      <p className="pb-2">
        Tavakasutaja (laagrilapse) vaatest on postitamine anonüümne ja Gossip ei
        võimalda kasutajal ka erinevaid postitusi siduda, kui just postitus ise
        seda infot ei sisalda. Sellegipoolest on kasvatajatele postituste
        autorid teada.
      </p>

      <p>
        Ühe vahetuse postitusi näevad vaid selle vahetuse lapsed, kasvatajad ja
        süsteemiadministraator. Ligipääsu ei jagata vahetusevälistele isikutele,
        sh lapsevanematele või teiste vahetuste liikmetele.
      </p>

      <p className="pt-4 font-medium">Alla 13-aastased lapsed</p>
      <p className="pb-2">
        Eesti Vabariigi seaduse järgi ei tohi me töödelda (sh koguda) laste
        isikuandmeid ilma lapsevanema eelneva nõusolekuta.
      </p>
      <p className="pb-2">
        Kuna Gossip on eraldiseisev süsteem laagri broneerimisüsteemist, siis ei
        laiene lapsevanema nõusolek laagriks vajalike lapse isikuandmete
        töötlemiseks Gossipile.
      </p>
      <p className="pb-2">
        Kui me lapsevanema nõusolekut Gossipi raames lapse andmete töötlemiseks
        ei saa, ei tähenda see veel seda, et laps ei saa Gossipit kasutada. Laps
        saab siiski teha konto selleks, et näha teiste postitusi, küll aga ei
        saa ta ise postitada. See piirang on vajalik selleks, et laps ei jagaks
        kogemata infot, mis oleks isikustatav ja mida me seega töödelda ei tohi.
      </p>
      <p className="pb-2">
        Sellised kontod loob süsteem anonüümselt: süsteem pakub lapsele
        kasutajanime, mis ei ole isikuga seotav (nt kala- või linnuliik) ja
        seega ei teki sidet lapse ja konto vahel.
      </p>
    </div>
  );
}
