import React from "react";

export default function PPRoute() {
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="pb-4 font-black">
        Merelaagri gossipi üldised privaatsustingimused
      </h1>
      <div className="mb-4">
        <p>
          Nendes privaatsustingimustes (Privaatsustingimused) kirjeldame, kuidas
          töötleme isikuandmeid merelaagri gossipi (Gossip) veebi- ja
          mobiilirakendustes.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="font-medium">
          Gossipi <q>anonüümsuse</q> põhimõte
        </h2>
        <p className="pb-2">
          Tavakasutaja (laagrilapse) vaatest on postitamine anonüümne ja Gossip
          ei võimalda tavakasutajatel ka erinevaid postitusi sama autoriga
          siduda, kui just postitus(t)e sisu ise seda infot ei sisalda.
        </p>
        <p className="pb-2">
          Vaikimisi ei kuvata postituste autoreid isegi kasvatajatele. Siiski on
          autorite info andmebaasis olemas ja vahetuse juhata võib seda infot
          süsteemiadministaatorilt vajadusel küsida.
        </p>
        <p>
          Ühe vahetuse postitusi näevad vaid selle vahetuse lapsed, kasvatajad
          ja süsteemiadministraator. Ligipääsu ei jagata vahetusevälistele
          isikutele, sh lapsevanematele või teiste vahetuste liikmetele.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="font-medium">Milliseid (isiku)andmeid me kogume?</h2>
        <ul className="list-disc list-inside">
          <li>Kasutaja täisnimi</li>
          <li>Autentimise teave (kasutajanimi)</li>
          <li>
            Kasutaja enda Gossipisse postitatud sisu, mis võib, aga ei pruugi
            sisaldada isikuandmeid
          </li>
        </ul>
        <p className="pt-2 pb-2">
          Kasutajal on alati võimalik ära kustutada enda tehtud postitus(ed) või
          terve oma konto koos kõikide postitustega. Seda saab teha nii
          rakenduses kui ka veebiportaalis.
        </p>
        <p>
          Hiljemalt 2 kuud peale laagrisuve lõppu kustutame kogu Gossipi sisu,
          sh postitused, pildid ja kontod.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="font-medium">Andmete kogumise eesmärk</h2>
        <p className="pb-2">
          Andmeid, mida sisaldavad postitused, kogume, töötleme ja kuvame
          Gossipi funktsionaalsuse tagamiseks. Gossipi eesmärk ongi postituste
          kuvamine. Neid andmeid kogume postituse loomise hetkel.
        </p>
        <p className="pb-2">
          Autentimisteavet kogume, et piirata postituste ligipääsu vaid vahetuse
          liikmetele ja et kindlaks määrata kasutaja roll (kasvataja,
          laagrilaps). Neid andmeid kogume konto loomise ja sisselogimise
          hetkel.
        </p>
        <p className="pb-2">
          Seostame kontodega kasutajate pärisnimed selleks, et ebasobiliku
          postitatud sisu korral oleks vajadusel võimalik autor tuvastada ja
          temaga sellel teemal rääkida.
        </p>
        <p className="pb-2">
          Nime kanname andmebaasi kutsekoodi loomise hetkel ja seda vaid siis,
          kui meil on konto loomiseks lapse (vähemalt 13a) või tema vanema (alla
          13a) nõusolek. Nime seostame kontoga konto loomise (kutsekoodi
          kasutamise) hetkel juhul, kui nimi andmebaasis olemas on.
        </p>
        <p>Muid andmeid me ei kogu ja muudel eesmärkidel me neid ei töötle.</p>
      </div>
      <div className="mb-4">
        <h2 className="font-medium">Alla 13-aastased lapsed</h2>
        <p className="pb-2">
          Eesti Vabariigi seaduse järgi ei tohi me töödelda (sh koguda) laste
          isikuandmeid ilma lapsevanema eelneva nõusolekuta.
        </p>
        <p className="pb-2">
          Kuna Gossip on eraldiseisev süsteem laagri broneerimisüsteemist, siis
          ei laiene lapsevanema nõusolek laagriks vajalike lapse isikuandmete
          töötlemiseks Gossipile.
        </p>
        <p className="pb-2">
          Kui me lapsevanema nõusolekut Gossipi raames lapse andmete
          töötlemiseks ei saa, ei tähenda see veel seda, et laps ei saa Gossipit
          kasutada. Laps saab siiski teha konto selleks, et näha teiste
          postitusi, küll aga ei saa ta ise postitada. See piirang on vajalik
          selleks, et laps ei jagaks kogemata infot, mis oleks isikustatav ja
          mida me seega töödelda ei tohi.
        </p>
        <p>
          Sellised kontod loob süsteem anonüümselt: süsteem pakub lapsele
          kasutajanime, mis ei ole isikuga seotav (nt kala- või linnuliik) ja
          seega ei teki sidet lapse ja konto vahel. Nii väldime lapse
          isikuandmete töötlemist, tagades talle siiski Gossipi ligipääsu.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="font-medium">
          Isikuandmete edastamine ja volitatud töötlemine
        </h2>
        <p className="pb-2">
          Talletame isikuandmeid andmebaasis, mida majutab Zone Media OÜ.{" "}
          <a
            href="https://www.zone.ee/et/zone-media-ou-privacy-policy/"
            target="_blank"
            className="inline-flex items-end hover:opacity-80"
          >
            <span className="underline">
              Zone Media OÜ privaatsuspõhimõtted
            </span>
            <span className="material-symbols-rounded scale-75">
              open_in_new
            </span>
          </a>
        </p>
        <p>
          Me ei edasta kasutajate isikuandmeid muudele välistele osapooltele.
        </p>
      </div>
      <div className="mb-4">
        <h2 className="font-medium">Muudatused</h2>
        <p>Privaatsuspõhimõtete jõustumine:</p>
        <p>Avaldamine 2025 juuli</p>
        <p>Jõustumine 2025 juuli</p>
      </div>
      <div className="mb-4">
        <h2 className="font-medium">Kontaktandmed</h2>
        <p>
          Kui Teil on isikuandmete töötlemise kohta küsimusi, kirjutage meile
          aadressil{" "}
          <a
            href="mailto:webmaster@merelaager.ee"
            className="underline hover:opacity-80"
          >
            webmaster@merelaager.ee
          </a>
          .
        </p>
      </div>
    </div>
  );
}
