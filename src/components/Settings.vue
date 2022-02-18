<template>
  <div>
    <div class="h-8 flex items-center text-black p-2 justify-between bg-gray-300">
      <div class="flex h-5 items-center gap-1">
        <span class="font-bold select-none">Einstellungen &amp; Datenschutz</span>
      </div>
    </div>

    <div class="h-5/6 p-1 w-full flex bg-white text-base">
        
        <div class="w-full h-full flex flex-col px-4 pt-2 pb-10 space-y-2">
        
        <div class="">
          <div class="text-xl font-semibold">Willkommen bei der IG-Story Crowdsourcing Plattform!</div>

          Diese Chrome-Extension ist teil eines laufenden Forschungsprojekts am Lehrstuhl für Medieninformatik der Universität Regensburg. Wir sammeln, kodieren und transkribieren gerade Instagram Stories um ihre Nutzung und Verwendung zu analysieren. Normalerweise 
          Posts auf Social Media Plattformen wie Facebook oder Twitter für immer online. Stories sind anders: Sie laufen nach 24 Stunden ab. Das erschwert die Analyse, da die Inhalte nur in diesem Zeitraum gesammelt werden können. Außerdem wirft die Sammlung von Stories ethische
          Fragen auf: Sollten Forschende Stories speicher, obwohl die Urheber doch annehmen, dass sie nach 24 Stunden ablaufen? Sollten Forschende die Medien der Nutzer speichern, die ihre Stories nur auf privaten Profilen mit ihren Freund*innen teilen? Sicherlich nicht, zumindest
          nicht ohne Einverständnis! Deshalb unser Crowdsourcing-Ansatz: Du hilfst und dabei einen tieferen Einblick in den Long-Tail der Stories zu erhalten, während wir die Privatsphäre der Nutzer*innen und den Datenschutz wahren! 

        </div>

        <div>
          <div class="text-xl font-semibold">Welche Daten werden gesammelt?</div>
           
           <p>Wir bitten dich um die Mithilfe bei der Kodierung nach Kategorien aus der Literatur <a class="text-gray-400 hover:text-gray-700" href="http://dx.doi.org/10.1177/1461444820960071" target="_blank">(Bainotti 2021)</a>. Außerdem kannst du uns helfen indem du
           Texte, die in die Stories eingebettet sind, transkribierst, das heißt abschreibst. Mit Klick auf "Speichern" werden die Kodierungen und Transkriptionen auf unseren Server übertragen. Außerdem übermittelt dein Browser Meta-Daten zur kodierten Story und eine zufällige, 
           anonyme Nutzerkennung, die beim ersten Starten dieser Extension erstellt wurde: <span class="font-mono
">{{ chromeUserId }}</span>.</p>
           <p>Wir sammeln keine Informationen von deinem Instagram-Profil. Metadaten der Stories beinhalten Informationen über die genutzten Sticker, die ID der Story und des Erstellers, sowie Erstellungszeitpunkt und Ablauf. Zu keiner Zeit werden Bilder an unseren 
             Server übertragen, auch musst du zu keiner Zeit dein Passwort an uns übermitteln. Die Software läuft auf deinem Computer in deinem Chrome-Browser. Du musst während der Nutzung immer mindestens ein Instagram-Tab offen halten, bei dem du mit einem Profil
             angemeldet bist.
           </p>
        </div>

        <div>
          <div class="text-xl font-semibold">Verantwortlichkeit</div>
          <p>Für die Studie, die Extension und Datensammlung ist Michael Achmann zuständig, Mitarbeiter am Lehrstuhl für Medieninformatik. Alle Kontaktinformationen findest du auf der Homepage: <a class="text-gray-400 hover:text-gray-700"  href="https://go.ur.de/michael-achmann">https://go.ur.de/michael-achmann</a></p>
        </div>

        <div>
          <div class="text-xl font-semibold">Datenschutz</div>
          <p>Die Erhobenen Umfrage Daten werden auf einem Server der Firma netcup in Deutschland gespeichert, automatische Backups werden auf einem Gerät an der Universität Regensburg angefertigt. Alle Daten werden unter Angabe einer zufälligen ID erhoben, ein Rückschluss auf deine Person ist damit nach Abschluss der Studie schwer zu ziehen. Zur Erfassung der VP-Stunden bzw. Gutscheinverlosung ist die Erfassung deiner persönlichen Daten (Namen, Matrikelnummer; bzw. E-Mail-Adresse) notwendig. Nach erfolgreicher VP-Stunden-Buchung bzw. Verlosung werden alle persönlichen Informationen gelöscht.</p>
          <p>Die erhobenen pseudonymisierten Daten werden im Rahmen meiner Dissertation auf meinen Dienstgeräten gespeichert und zur Auswertung genutzt. Im Rahmen von Abschluss- und Projektarbeit erhalten Studierende im Rahmen ihrere Ausbildung Zugriff auf die pseudonymisierten Daten und Auswertungen. Nach erfoglreicher Anonymisierung der Daten behalte ich mir im Falle einer Veröffentlichung der Ergebnisse auch eine Veröffentlichung des anonymisierten Datensatzes vor.</p>
          <p>Du kannst jederzeit mit einer formlosen E-Mail an michael.achmann@ur.de um Löschung deiner Daten bitten, gibt dazu bitte deine ID an: <span class="font-mono
">{{ chromeUserId }}</span></p>
          <p><a class="text-gray-400 hover:text-gray-700" href="https://md.digitalhumanities.io/s/yzYezHRKx">Weitere Informationen zum Datenschutz</a></p>
          <hr />
        </div>

        <div class="mt-2">
          <div class="form-check">
            <input type="checkbox" v-model="consent" id="consent">
              <label for="consent">
                Stimmst du der Teilnahme an der Studie unter obigen Bedingungen und Datenschutzvereinbarung zu?
              </label>
            </div>
          <div class="m-2">
            <button :disabled="!consent" class="block w-1/2 px-3 py-2 mx-1 rounded disabled:opacity-50 text-center text-md bg-blue-500 font-medium text-white leading-5 hover:bg-blue-600 md:mx-2 md:w-auto" @click="$emit('goto', 'annotator')">Zum Kodieren</button>
          </div>
        </div>
      
        </div>    
    </div>
  </div>


</template>

<script>

export default {
  name: 'Settings',
  components: {
  },
  props: {
    chromeUserId: String,
    consent: Boolean,
  },
  methods: {
  },
  watch: {
    consent(oldVar, newVar){
      if(oldVar != newVar){
          chrome.storage.local.set({'consent': this.consent}, () => {console.log('Updated Consent')});
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
