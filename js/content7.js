/* v3 — Interpretación y batería sintética (Friedman, Cann, Hewitt). Resumen con palabras propias. */
(function () {
  const { T, Q, after } = window.V3;

  /* ===================== INTERPRETACIÓN Y REPRODUCCIÓN ===================== */
  after('seq', {
    id: 'perform', lv: 2, lab: ['arp', 'seq', 'synth'],
    title: T('Interpretación: controladores, modos de voz, arpegiador y MIDI', 'Performance: controllers, voice modes, arpeggiator and MIDI', 'Spiel: Controller, Stimmmodi, Arpeggiator und MIDI', '演奏：コントローラー、ボイス・モード、アルペジエーター、MIDI'),
    sum: T('Todo lo que convierte un patch en un instrumento: ruedas, pedales, velocidad y aftertouch, portamento, unísono y disparo, arpegiador, secuenciador, trancegate y MIDI.',
      'Everything that turns a patch into an instrument: wheels, pedals, velocity and aftertouch, portamento, unison and triggering, arpeggiator, sequencer, trancegate and MIDI.',
      'Alles, was aus einem Patch ein Instrument macht: Räder, Pedale, Velocity und Aftertouch, Portamento, Unisono und Triggerung, Arpeggiator, Sequencer, Trancegate und MIDI.',
      'パッチを楽器に変えるすべて：ホイール、ペダル、ベロシティとアフタータッチ、ポルタメント、ユニゾンとトリガー、アルペジエーター、シーケンサー、トランスゲート、MIDI。'),
    key: {
      es: ['La rueda de <b>pitch bend</b> mueve la altura de <b>todo el teclado</b>; la rueda de <b>modulación</b> es otra perilla de "cantidad de LFO".', 'La <b>velocidad</b> mide rapidez, no fuerza: puede controlar volumen, ataque, brillo o envíos. El <b>aftertouch</b> es la presión después del golpe.', '<b>Portamento</b> (continuo) vs <b>glissando</b> (por semitonos). <b>Single trigger</b> = legato sin redisparar envolventes. <b>Unísono</b> = todas las voces en una tecla.', 'El <b>arpegiador</b> redispara envolventes; el <b>largo de gate</b> da staccato sin tocar las envolventes; el <b>trancegate</b> recorta el audio en pasos.', 'Tocá <b>como el instrumento que imitás</b> y diseñá el patch según quién lo toca: un músico o un secuenciador.'],
      en: ['The <b>pitch bend</b> wheel shifts the pitch of the <b>whole keyboard</b>; the <b>mod</b> wheel is just another "LFO amount" knob.', '<b>Velocity</b> measures speed, not force: it can control volume, attack, brightness or sends. <b>Aftertouch</b> is pressure after the strike.', '<b>Portamento</b> (continuous) vs <b>glissando</b> (in semitones). <b>Single trigger</b> = legato without retriggering envelopes. <b>Unison</b> = all voices on one key.', 'The <b>arpeggiator</b> retriggers envelopes; <b>gate length</b> gives staccato without touching envelopes; the <b>trancegate</b> chops the audio in steps.', 'Play <b>like the instrument you imitate</b>, and design the patch for whoever plays it: a musician or a sequencer.'],
      de: ['Das <b>Pitchbend</b>-Rad verschiebt die Tonhöhe der <b>ganzen Tastatur</b>; das <b>Modulationsrad</b> ist nur ein weiterer „LFO-Menge"-Regler.', '<b>Velocity</b> misst Geschwindigkeit, nicht Kraft: Sie kann Lautstärke, Attack, Helligkeit oder Sends steuern. <b>Aftertouch</b> ist der Druck nach dem Anschlag.', '<b>Portamento</b> (stufenlos) vs. <b>Glissando</b> (in Halbtönen). <b>Single Trigger</b> = Legato ohne erneutes Auslösen der Hüllkurven. <b>Unisono</b> = alle Stimmen auf einer Taste.', 'Der <b>Arpeggiator</b> löst Hüllkurven neu aus; die <b>Gate-Länge</b> ergibt Staccato, ohne die Hüllkurven anzufassen; das <b>Trancegate</b> zerhackt das Audio in Schritte.', 'Spiele <b>wie das Instrument, das du nachahmst</b>, und gestalte den Patch für den, der ihn spielt: Musiker oder Sequencer.'],
      ja: ['<b>ピッチベンド</b>・ホイールは<b>鍵盤全体</b>の音高を動かす。<b>モジュレーション</b>・ホイールは「LFO量」のもう1つのつまみ。', '<b>ベロシティ</b>は力ではなく速さを測る。音量、アタック、明るさ、センドを制御できる。<b>アフタータッチ</b>は打鍵後の圧力。', '<b>ポルタメント</b>（連続）と<b>グリッサンド</b>（半音ごと）。<b>シングル・トリガー</b>＝エンベロープを再トリガーしないレガート。<b>ユニゾン</b>＝全ボイスを1鍵に。', '<b>アルペジエーター</b>はエンベロープを再トリガーする。<b>ゲート長</b>でエンベロープに触れずにスタッカートにできる。<b>トランスゲート</b>は音声をステップで刻む。', '<b>模倣する楽器のように弾き</b>、誰が弾くか（演奏者かシーケンサーか）に合わせてパッチを設計する。']
    },
    sec: [
      {
        h: T('Ruedas, palancas, cintas y pedales', 'Wheels, levers, ribbons and pedals', 'Räder, Hebel, Bänder und Pedale', 'ホイール、レバー、リボン、ペダル'),
        b: T(`<p>Friedman explica los controles de la mano izquierda:</p>
<ul><li>La rueda de <b>pitch bend</b> tiene resorte y vuelve al centro. Su rango es fijo (por ejemplo una tercera) o configurable.</li>
<li>La rueda de <b>modulación</b> queda donde la dejás y es "otra perilla de cantidad de LFO": controla vibrato, trémolo o wah según adónde vaya el LFO.</li>
<li>Variantes: el <b>joystick XY</b> (todo con resorte), la palanca lateral de Roland con botón de disparo del LFO, la <b>cinta</b> (ribbon, popular en keytars) y el <b>controlador de soplido</b>, que convierte la presión del aire en voltaje para frasear como un vientista.</li></ul>
<p>Con los pies:</p>
<ul><li>El <b>pedal de expresión</b> es continuo: sirve para volumen, vibrato, corte o velocidad del LFO.</li>
<li>El <b>footswitch</b> es on/off: sustain o pasar de patch.</li>
<li>Consejo práctico de Friedman: <b>comprá el pedal</b>. Muchos principiantes se pierden la mitad de la expresividad por no tenerlo.</li></ul>
<p>Una trampa del bend: cuando doblás una nota, se <b>transpone todo el teclado</b> hasta que la rueda vuelve al centro. Hay que pensar las frases teniendo eso en cuenta.</p>`,
          `<p>Friedman explains the left-hand controls:</p>
<ul><li>The <b>pitch bend</b> wheel is sprung and returns to centre. Its range is fixed (e.g. a third) or configurable.</li>
<li>The <b>mod</b> wheel stays where you leave it and is "another LFO amount knob": it controls vibrato, tremolo or wah depending on where the LFO is routed.</li>
<li>Variants: the <b>XY joystick</b> (fully sprung), Roland's side-to-side lever with an LFO trigger button, the <b>ribbon</b> (popular on keytars) and the <b>breath controller</b>, which turns air pressure into voltage so you can phrase like a wind player.</li></ul>
<p>With your feet:</p>
<ul><li>The <b>expression pedal</b> is continuous: use it for volume, vibrato, cutoff or LFO speed.</li>
<li>The <b>footswitch</b> is on/off: sustain or next patch.</li>
<li>Friedman's practical advice: <b>buy the pedal</b>. Many beginners miss half the expressiveness by not having one.</li></ul>
<p>A bend trap: when you bend a note, the <b>whole keyboard is transposed</b> until the wheel returns to centre. You have to plan phrases with that in mind.</p>`,
          `<p>Friedman erklärt die Bedienelemente der linken Hand:</p>
<ul><li>Das <b>Pitchbend</b>-Rad ist gefedert und kehrt zur Mitte zurück. Sein Bereich ist fest (z. B. eine Terz) oder einstellbar.</li>
<li>Das <b>Modulationsrad</b> bleibt, wo man es lässt, und ist „ein weiterer LFO-Mengenregler": Es steuert Vibrato, Tremolo oder Wah, je nachdem, wohin der LFO geroutet ist.</li>
<li>Varianten: der <b>XY-Joystick</b> (vollständig gefedert), Rolands Seitwärtshebel mit LFO-Triggertaste, das <b>Ribbon</b> (beliebt bei Keytars) und der <b>Breath Controller</b>, der Luftdruck in Spannung wandelt, damit man wie ein Bläser phrasieren kann.</li></ul>
<p>Mit den Füßen:</p>
<ul><li>Das <b>Expression-Pedal</b> ist stufenlos: für Lautstärke, Vibrato, Cutoff oder LFO-Tempo.</li>
<li>Der <b>Fußschalter</b> ist ein/aus: Sustain oder nächster Patch.</li>
<li>Friedmans praktischer Rat: <b>Kauf das Pedal</b>. Viele Anfänger verpassen die halbe Ausdruckskraft, weil sie keines haben.</li></ul>
<p>Eine Bending-Falle: Beim Bending wird die <b>ganze Tastatur transponiert</b>, bis das Rad zur Mitte zurückkehrt. Phrasen muss man entsprechend planen.</p>`,
          `<p>フリードマンは左手のコントロールを説明します。</p>
<ul><li><b>ピッチベンド</b>・ホイールはバネ付きで中央に戻る。範囲は固定（例えば3度）か設定可能。</li>
<li><b>モジュレーション</b>・ホイールは置いた位置に留まり、「もう1つのLFO量つまみ」として働く。LFOの送り先に応じてビブラート、トレモロ、ワウを制御する。</li>
<li>バリエーション：<b>XYジョイスティック</b>（全方向バネ付き）、LFOトリガー・ボタン付きのローランドの左右レバー、<b>リボン</b>（キーターで人気）、そして空気圧を電圧に変えて管楽器奏者のようにフレーズできる<b>ブレス・コントローラー</b>。</li></ul>
<p>足で操作するもの：</p>
<ul><li><b>エクスプレッション・ペダル</b>は連続値：音量、ビブラート、カットオフ、LFO速度に使う。</li>
<li><b>フットスイッチ</b>はオン／オフ：サステインや次のパッチへ。</li>
<li>フリードマンの実践的助言：<b>ペダルを買え</b>。多くの初心者はペダルがないために表現力の半分を逃している。</li></ul>
<p>ベンドの落とし穴：音をベンドすると、ホイールが中央に戻るまで<b>鍵盤全体が移調</b>されます。それを踏まえてフレーズを考える必要があります。</p>`)
      },
      {
        h: T('El teclado sensible', 'The touch-sensitive keyboard', 'Die anschlagdynamische Tastatur', 'タッチ・センシティブ鍵盤'),
        b: T(`<ul><li><b>Velocidad</b>: mide <i>qué tan rápido</i> baja la tecla, no la fuerza. Puede ir al VCA (volumen), al ataque (más fuerte = ataque más corto) o al corte (más fuerte = más brillante).</li>
<li><b>Aftertouch</b> (presión): lo que apretás después del golpe. Sirve para un vibrato o un "swell" de cuerdas en medio de la nota.</li>
<li><b>Velocidad de release</b> (Prophet T8): lo rápido que soltás alarga o acorta el release.</li>
<li><b>Sensibilidad lateral</b>: vibrato moviendo el dedo de lado, como en un instrumento de cuerda.</li></ul>
<p>Cann muestra usos más finos de la velocidad:</p>
<ul><li>Cambiar el <b>tiempo de ataque</b>: suave = entra de a poco; fuerte = ataque inmediato.</li>
<li>Usar una <b>resonancia mayor a baja velocidad</b>.</li>
<li>Darle <b>menos chorus a las notas fuertes</b> para que el tono agresivo brille.</li>
<li>Subir el <b>envío a la reverb</b>.</li></ul>
<p>Su regla: el escalado no tiene que ir de 0 al máximo. Elegí el rango útil entre "opaco" y "brillante". Las <b>capas de velocidad</b> de samples (suave, medio, fuerte) se disimulan con un filtro también controlado por la velocidad.</p>`,
          `<ul><li><b>Velocity</b>: measures <i>how fast</i> the key goes down, not the force. It can go to the VCA (volume), the attack (harder = shorter attack) or the cutoff (harder = brighter).</li>
<li><b>Aftertouch</b> (pressure): what you press after the strike. Useful for vibrato or a string "swell" mid-note.</li>
<li><b>Release velocity</b> (Prophet T8): how fast you let go lengthens or shortens the release.</li>
<li><b>Side-to-side sensitivity</b>: vibrato by rocking the finger, as on a string instrument.</li></ul>
<p>Cann shows finer uses of velocity:</p>
<ul><li>Changing the <b>attack time</b>: soft = fades in; hard = immediate attack.</li>
<li>Using <b>more resonance at low velocity</b>.</li>
<li>Giving <b>loud notes less chorus</b> so the aggressive tone shines.</li>
<li>Raising the <b>reverb send</b>.</li></ul>
<p>His rule: scaling doesn't have to run from 0 to max. Choose the useful range between "dull" and "bright". Sampled <b>velocity layers</b> (soft, medium, hard) are disguised with a filter that also follows velocity.</p>`,
          `<ul><li><b>Velocity</b>: misst, <i>wie schnell</i> die Taste sinkt, nicht die Kraft. Sie kann auf den VCA (Lautstärke), den Attack (härter = kürzerer Attack) oder den Cutoff (härter = heller) wirken.</li>
<li><b>Aftertouch</b> (Druck): was man nach dem Anschlag drückt. Gut für Vibrato oder ein Streicher-„Swell" mitten in der Note.</li>
<li><b>Release-Velocity</b> (Prophet T8): Wie schnell man loslässt, verlängert oder verkürzt das Release.</li>
<li><b>Seitliche Empfindlichkeit</b>: Vibrato durch seitliches Wiegen des Fingers, wie bei einem Streichinstrument.</li></ul>
<p>Cann zeigt feinere Einsätze der Velocity:</p>
<ul><li>Die <b>Attackzeit</b> ändern: leise = blendet ein; laut = sofortiger Attack.</li>
<li><b>Mehr Resonanz bei geringer Velocity</b> einsetzen.</li>
<li><b>Lauten Noten weniger Chorus</b> geben, damit der aggressive Ton glänzt.</li>
<li>Den <b>Hall-Send</b> erhöhen.</li></ul>
<p>Seine Regel: Die Skalierung muss nicht von 0 bis Maximum reichen. Wähle den nützlichen Bereich zwischen „dumpf" und „hell". Gesampelte <b>Velocity-Layer</b> (leise, mittel, laut) kaschiert man mit einem Filter, der ebenfalls der Velocity folgt.</p>`,
          `<ul><li><b>ベロシティ</b>：力ではなく、鍵盤が<i>どれだけ速く</i>下がるかを測る。VCA（音量）、アタック（強いほど短いアタック）、カットオフ（強いほど明るい）に送れる。</li>
<li><b>アフタータッチ</b>（圧力）：打鍵後にさらに押し込む力。音の途中のビブラートや弦の「スウェル」に使う。</li>
<li><b>リリース・ベロシティ</b>（プロフェットT8）：鍵盤を離す速さでリリースが長く／短くなる。</li>
<li><b>左右感度</b>：弦楽器のように指を横に揺らしてビブラート。</li></ul>
<p>キャンはベロシティのより繊細な使い方を示します。</p>
<ul><li><b>アタック時間</b>を変える：弱く弾くとゆっくり、強く弾くと即座に立ち上がる。</li>
<li><b>弱いベロシティでレゾナンスを強く</b>する。</li>
<li><b>強い音にはコーラスを減らし</b>、攻撃的な音色を際立たせる。</li>
<li><b>リバーブへのセンド</b>を上げる。</li></ul>
<p>彼のルール：スケーリングは0から最大まで振る必要はない。「暗い」から「明るい」までの使える範囲を選ぶこと。サンプルの<b>ベロシティ・レイヤー</b>（弱・中・強）の切り替わりは、同じくベロシティに追従するフィルターでごまかせます。</p>`)
      },
      {
        h: T('Modos de voz y de disparo', 'Voice and trigger modes', 'Stimm- und Triggermodi', 'ボイス・モードとトリガー・モード'),
        b: T(`<ul><li><b>Monofónico / polifónico / parafónico</b> (Hewitt): en un parafónico varias notas comparten el mismo filtro, y la segunda nota no redispara la envolvente del filtro. Con polifonía 1 y prioridad a la última nota sale un legato natural, como en el Minimoog o la TB-303.</li>
<li><b>Unísono</b>: todas las voces apiladas en una tecla, para leads potentes.</li>
<li><b>Chorus de doble oscilador</b>: engorda, pero en un sinte de 8 voces te deja 4.</li>
<li><b>Single trigger</b>: si tocás ligado, la segunda nota hereda la envolvente en su sustain y no tiene ataque propio. Despegando los dedos, cada nota vuelve a atacar: es una herramienta de fraseo.</li>
<li><b>Portamento</b>: velocidad, curva lineal o exponencial y, en muchos sintes, solo en legato. En acordes, cada voz llega desde su nota anterior y el resultado es difícil de predecir. El <b>glissando</b> recorre los semitonos.</li>
<li><b>Hold</b> y <b>chord memory</b>: tocar acordes con un dedo. Friedman sugiere no despreciarlos: componé alrededor de lo que solo esa función permite.</li>
<li><b>Split</b>, <b>doble/capa</b> (mitad de polifonía) y <b>multitímbrico</b>. Ojo: los splits y dobles guardan solo la <i>dirección</i> de los patches, así que si editás el patch original, cambia el split.</li></ul>`,
          `<ul><li><b>Monophonic / polyphonic / paraphonic</b> (Hewitt): on a paraphonic synth several notes share the same filter, and the second note doesn't retrigger the filter envelope. Polyphony 1 with last-note priority gives a natural legato, as on the Minimoog or TB-303.</li>
<li><b>Unison</b>: all voices stacked on one key, for powerful leads.</li>
<li><b>Dual-oscillator chorus</b>: fattens, but on an 8-voice synth it leaves you 4.</li>
<li><b>Single trigger</b>: if you play legato, the second note inherits the envelope in its sustain and has no attack of its own. Lift your fingers and each note attacks again: it's a phrasing tool.</li>
<li><b>Portamento</b>: rate, linear or exponential curve and, on many synths, legato only. In chords, each voice slides from its previous note and the result is hard to predict. <b>Glissando</b> steps through the semitones.</li>
<li><b>Hold</b> and <b>chord memory</b>: play chords with one finger. Friedman suggests not dismissing them: compose around what only that feature allows.</li>
<li><b>Split</b>, <b>double/layer</b> (half the polyphony) and <b>multitimbral</b>. Note: splits and doubles store only the <i>address</i> of the patches, so if you edit the original patch, the split changes.</li></ul>`,
          `<ul><li><b>Monofon / polyfon / paraphon</b> (Hewitt): Bei einem paraphonen Synth teilen sich mehrere Noten denselben Filter, und die zweite Note löst die Filterhüllkurve nicht neu aus. Polyphonie 1 mit Letzte-Note-Priorität ergibt natürliches Legato, wie beim Minimoog oder der TB-303.</li>
<li><b>Unisono</b>: alle Stimmen auf einer Taste gestapelt, für kraftvolle Leads.</li>
<li><b>Doppel-Oszillator-Chorus</b>: macht fett, lässt aber bei einem 8-stimmigen Synth nur 4 Stimmen übrig.</li>
<li><b>Single Trigger</b>: Spielt man legato, übernimmt die zweite Note die Hüllkurve im Sustain und hat keinen eigenen Attack. Hebt man die Finger, setzt jede Note neu ein: ein Werkzeug der Phrasierung.</li>
<li><b>Portamento</b>: Geschwindigkeit, lineare oder exponentielle Kurve und bei vielen Synths nur legato. Bei Akkorden gleitet jede Stimme von ihrer vorherigen Note, das Ergebnis ist schwer vorherzusagen. <b>Glissando</b> durchläuft die Halbtöne.</li>
<li><b>Hold</b> und <b>Chord Memory</b>: Akkorde mit einem Finger spielen. Friedman rät, sie nicht abzutun: Komponiere um das herum, was nur diese Funktion erlaubt.</li>
<li><b>Split</b>, <b>Double/Layer</b> (halbe Polyphonie) und <b>multitimbral</b>. Achtung: Splits und Doubles speichern nur die <i>Adresse</i> der Patches; bearbeitet man den Original-Patch, ändert sich der Split.</li></ul>`,
          `<ul><li><b>モノフォニック／ポリフォニック／パラフォニック</b>（ヒューイット）：パラフォニックでは複数の音が同じフィルターを共有し、2つ目の音はフィルター・エンベロープを再トリガーしない。発音数1で後着優先にすると、ミニモーグやTB-303のような自然なレガートになる。</li>
<li><b>ユニゾン</b>：全ボイスを1鍵に重ね、力強いリードに。</li>
<li><b>2オシレーターのコーラス</b>：太くなるが、8ボイスのシンセでは4ボイスしか残らない。</li>
<li><b>シングル・トリガー</b>：レガートで弾くと、2つ目の音はサステインのエンベロープを引き継ぎ、自分のアタックを持たない。指を離せば各音が再びアタックする。フレージングの道具。</li>
<li><b>ポルタメント</b>：速さ、リニアか指数のカーブ、そして多くのシンセではレガート時のみ。和音では各ボイスがそれぞれ前の音から滑るので結果は予測しにくい。<b>グリッサンド</b>は半音ずつ進む。</li>
<li><b>ホールド</b>と<b>コード・メモリー</b>：1本指で和音を弾く。フリードマンは軽視するなと言います。その機能でしかできないことを中心に作曲しよう。</li>
<li><b>スプリット</b>、<b>ダブル／レイヤー</b>（発音数は半分）、<b>マルチティンバー</b>。注意：スプリットやダブルが保存するのはパッチの<i>アドレス</i>だけなので、元のパッチを編集するとスプリットも変わる。</li></ul>`)
      },
      {
        h: T('Arpegiador, secuenciador, step generator y trancegate', 'Arpeggiator, sequencer, step generator and trancegate', 'Arpeggiator, Sequencer, Step-Generator und Trancegate', 'アルペジエーター、シーケンサー、ステップ・ジェネレーター、トランスゲート'),
        b: T(`<p><b>Arpegiador</b> (Friedman): repite las notas que mantenés, una tras otra a ritmo parejo. Tiene velocidad; dirección (arriba, abajo, arriba-abajo, aleatoria o en el orden tocado); rango de octavas; y latch para no tener que sostenerlas. Cann suma dos detalles clave:</p>
<ul><li>Cada nota del arpegiador <b>redispara las envolventes</b>.</li>
<li>El parámetro de <b>largo de nota</b> (gate) da staccato sin cambiar las envolventes, y por lo tanto sin cambiar el timbre.</li></ul>
<p><b>Secuenciador</b>: un "grabador sin cinta" que guarda las teclas, no el sonido. Eso permite:</p>
<ul><li>Cambiar el patch después de grabar.</li><li>Cambiar el tempo sin cambiar la tonalidad, y viceversa.</li><li><b>Cuantizar</b>, hacer loop y encadenar secuencias.</li><li>Cargar en tiempo real o paso a paso.</li></ul>
<p><b>Step generator</b> (Surge, en Cann): un LFO de 16 pasos con nivel por paso. Su <b>deform</b> acorta cada paso, y el <b>retrigger por paso</b> redispara las envolventes: así nacen los bajos pulsantes en semicorcheas.</p>
<p><b>Trancegate</b>: el audio pasa por 16 compuertas sincronizadas que se abren o se cierran. El <i>contour</i> suaviza las transiciones, y con compuertas distintas en L y R el sonido rebota en estéreo.</p>
<p>Un patrón elegante de Cann: un gate cuya profundidad está en <b>cero</b> y asignada a la rueda. El músico "hace aparecer" el efecto cuando quiere.</p>`,
          `<p><b>Arpeggiator</b> (Friedman): repeats the notes you hold, one after another at an even rate. It has rate; direction (up, down, up-down, random or in the order played); octave range; and latch so you don't have to hold them. Cann adds two key details:</p>
<ul><li>Each arpeggiator note <b>retriggers the envelopes</b>.</li>
<li>The <b>note length</b> (gate) parameter gives staccato without changing the envelopes, and therefore without changing the timbre.</li></ul>
<p><b>Sequencer</b>: a "tape recorder without tape" that stores keystrokes, not sound. That lets you:</p>
<ul><li>Change the patch after recording.</li><li>Change tempo without changing key, and vice versa.</li><li><b>Quantise</b>, loop and chain sequences.</li><li>Enter notes in real time or step by step.</li></ul>
<p><b>Step generator</b> (Surge, in Cann): a 16-step LFO with a level per step. Its <b>deform</b> shortens each step, and <b>per-step retrigger</b> restarts the envelopes: that's how pulsing 16th-note basses are born.</p>
<p><b>Trancegate</b>: audio passes through 16 synced gates that open or close. <i>Contour</i> smooths the transitions, and different gates on L and R make the sound bounce in stereo.</p>
<p>An elegant pattern from Cann: a gate whose depth is set to <b>zero</b> and assigned to the mod wheel. The player "brings in" the effect at will.</p>`,
          `<p><b>Arpeggiator</b> (Friedman): wiederholt die gehaltenen Noten nacheinander in gleichmäßigem Tempo. Er hat Tempo; Richtung (auf, ab, auf-ab, zufällig oder in Spielreihenfolge); Oktavbereich; und Latch, damit man sie nicht halten muss. Cann ergänzt zwei Details:</p>
<ul><li>Jede Arpeggiatornote <b>löst die Hüllkurven neu aus</b>.</li>
<li>Der Parameter <b>Notenlänge</b> (Gate) ergibt Staccato, ohne die Hüllkurven und damit die Klangfarbe zu ändern.</li></ul>
<p><b>Sequencer</b>: ein „Tonbandgerät ohne Band", das Tastenanschläge speichert, nicht Klang. Dadurch kann man:</p>
<ul><li>Den Patch nach der Aufnahme wechseln.</li><li>Das Tempo ohne Tonartwechsel ändern und umgekehrt.</li><li><b>Quantisieren</b>, loopen und Sequenzen verketten.</li><li>Noten in Echtzeit oder schrittweise eingeben.</li></ul>
<p><b>Step-Generator</b> (Surge, bei Cann): ein 16-Schritt-LFO mit Pegel pro Schritt. Sein <b>Deform</b> verkürzt jeden Schritt, und <b>Retrigger pro Schritt</b> startet die Hüllkurven neu: So entstehen pulsierende Sechzehntel-Bässe.</p>
<p><b>Trancegate</b>: Das Audio läuft durch 16 synchronisierte Gates, die öffnen oder schließen. <i>Contour</i> glättet die Übergänge, und unterschiedliche Gates auf L und R lassen den Klang im Stereobild springen.</p>
<p>Ein elegantes Muster von Cann: ein Gate, dessen Tiefe auf <b>null</b> steht und dem Modrad zugewiesen ist. Der Spieler „holt" den Effekt nach Belieben herein.</p>`,
          `<p><b>アルペジエーター</b>（フリードマン）：押さえた音を一定のテンポで1音ずつ繰り返す。速さ、方向（上昇、下降、上下、ランダム、弾いた順）、オクターブ範囲、押さえ続けなくてよいラッチがある。キャンは2つの重要な点を加えます。</p>
<ul><li>アルペジエーターの各音は<b>エンベロープを再トリガー</b>する。</li>
<li><b>音の長さ</b>（ゲート）のパラメーターで、エンベロープを変えずに、つまり音色を変えずにスタッカートにできる。</li></ul>
<p><b>シーケンサー</b>：音ではなく打鍵を記録する「テープのない録音機」。そのおかげで：</p>
<ul><li>録音後にパッチを変えられる。</li><li>キーを変えずにテンポを変えられ、その逆もできる。</li><li><b>クオンタイズ</b>、ループ、シーケンスの連結ができる。</li><li>リアルタイムでもステップ入力でも入力できる。</li></ul>
<p><b>ステップ・ジェネレーター</b>（キャンの本ではSurge）：ステップごとにレベルを持つ16ステップのLFO。<b>デフォーム</b>で各ステップを短くし、<b>ステップごとのリトリガー</b>でエンベロープを再スタートさせる。こうして脈打つ16分音符のベースが生まれる。</p>
<p><b>トランスゲート</b>：音声が同期した16個のゲートを通り、開いたり閉じたりする。<i>コンター</i>で切り替わりを滑らかにし、LとRで異なるゲートにするとステレオで跳ね回る。</p>
<p>キャンのエレガントな手法：深さを<b>ゼロ</b>にしてモジュレーション・ホイールに割り当てたゲート。演奏者は好きなときに効果を「呼び出せる」。</p>`)
      },
      {
        h: T('MIDI y CV/Gate', 'MIDI and CV/Gate', 'MIDI und CV/Gate', 'MIDIとCV/ゲート'),
        b: T(`<p>Antes de MIDI, el teclado mandaba al sinte un <b>CV</b> (1 voltio por octava) y un <b>gate</b> que dispara la envolvente, y los arpegiadores se sincronizaban por <b>clock</b>. Friedman cuenta la llegada de <b>MIDI</b> (1983): un lenguaje digital común entre fabricantes, por cable DIN de 5 pines, que transmite notas, velocidad, aftertouch, bend, rueda, pedales y cambios de programa.</p>
<ul><li>Separa <b>controladores</b> (un teclado sin sonido, "el volante") de <b>módulos</b> (un sinte sin teclado, "el motor").</li>
<li>Tiene <b>16 canales</b>, como 16 canales de TV emitiendo a la vez desde la misma antena: un secuenciador puede tocar 16 partes distintas en 16 sintes.</li>
<li>Con una interfaz, la computadora se vuelve secuenciador, editor de patches (alivio para el DX7) y generador de partituras.</li>
<li>Los conversores <b>pitch-to-MIDI</b> permiten tocar un sinte cantando o con una guitarra.</li></ul>`,
          `<p>Before MIDI, the keyboard sent the synth a <b>CV</b> (1 volt per octave) and a <b>gate</b> that triggers the envelope, and arpeggiators synced via <b>clock</b>. Friedman recounts the arrival of <b>MIDI</b> (1983): a common digital language between manufacturers, over a 5-pin DIN cable, carrying notes, velocity, aftertouch, bend, wheel, pedals and program changes.</p>
<ul><li>It separates <b>controllers</b> (a keyboard with no sound, "the steering wheel") from <b>modules</b> (a synth with no keyboard, "the engine").</li>
<li>It has <b>16 channels</b>, like 16 TV channels broadcast at once from the same antenna: a sequencer can play 16 different parts on 16 synths.</li>
<li>With an interface, the computer becomes a sequencer, a patch editor (a relief for the DX7) and a score generator.</li>
<li><b>Pitch-to-MIDI</b> converters let you play a synth by singing or with a guitar.</li></ul>`,
          `<p>Vor MIDI schickte die Tastatur dem Synth eine <b>CV</b> (1 Volt pro Oktave) und ein <b>Gate</b>, das die Hüllkurve auslöst, und Arpeggiatoren synchronisierten sich per <b>Clock</b>. Friedman schildert die Ankunft von <b>MIDI</b> (1983): eine gemeinsame digitale Sprache der Hersteller über ein 5-Pol-DIN-Kabel, die Noten, Velocity, Aftertouch, Bending, Modrad, Pedale und Programmwechsel überträgt.</p>
<ul><li>Es trennt <b>Controller</b> (eine Tastatur ohne Klang, „das Lenkrad") von <b>Modulen</b> (ein Synth ohne Tastatur, „der Motor").</li>
<li>Es hat <b>16 Kanäle</b>, wie 16 Fernsehkanäle, die gleichzeitig von derselben Antenne senden: Ein Sequencer kann 16 verschiedene Stimmen auf 16 Synths spielen.</li>
<li>Mit einem Interface wird der Computer zu Sequencer, Patch-Editor (eine Erlösung für den DX7) und Notengenerator.</li>
<li><b>Pitch-to-MIDI</b>-Wandler erlauben es, einen Synth durch Singen oder mit einer Gitarre zu spielen.</li></ul>`,
          `<p>MIDI以前、鍵盤はシンセに<b>CV</b>（1オクターブ1ボルト）とエンベロープをトリガーする<b>ゲート</b>を送り、アルペジエーターは<b>クロック</b>で同期していました。フリードマンは<b>MIDI</b>（1983年）の登場を語ります。5ピンDINケーブルを使うメーカー共通のデジタル言語で、ノート、ベロシティ、アフタータッチ、ベンド、ホイール、ペダル、プログラム・チェンジを伝えます。</p>
<ul><li><b>コントローラー</b>（音の出ない鍵盤、「ハンドル」）と<b>音源モジュール</b>（鍵盤のないシンセ、「エンジン」）を分離した。</li>
<li><b>16チャンネル</b>あり、同じアンテナから同時に放送される16のテレビ・チャンネルのように、1台のシーケンサーが16台のシンセで16の異なるパートを演奏できる。</li>
<li>インターフェイスを使えば、コンピューターがシーケンサー、パッチ・エディター（DX7には救い）、楽譜作成ツールになる。</li>
<li><b>ピッチ・トゥ・MIDI</b>変換器を使えば、歌やギターでシンセを演奏できる。</li></ul>`)
      },
      {
        h: T('Tocar como el instrumento', 'Playing like the instrument', 'Wie das Instrument spielen', 'その楽器のように弾く'),
        b: T(`<p>Los ejercicios finales de Friedman son recetas para tocar, no solo para programar:</p>
<ul><li><b>Flauta</b>: cuadrada o triángulo en registro agudo. Ataque corto, pero no tanto. Un toque de <b>ruido al inicio</b> (el soplo), vibrato con <b>delay</b> y un bend mínimo al comienzo de la nota.</li>
<li><b>Guitarra eléctrica</b>:
<ul><li>Sierra con el filtro abierto y algo de resonancia.</li><li>Ataque duro, con el sustain apenas por debajo del pico, y release corto.</li><li>Movimiento con un LFO lento al filtro, PWM o detune.</li><li>Sobre todo, <b>bends y slides</b> como un guitarrista: "Ya no sos tecladista."</li></ul></li>
<li><b>Cuerdas</b>: triángulo para el cuerpo más sierra para el filo, chorus, ataque y release largos. Armónicos que entran solo al inicio (el arco y la resina) y vibrato con <b>1 s de delay</b>.</li>
<li><b>Nave espacial</b>: envolvente de pitch o portamento, LFO cuadrado al oscilador y al filtro, release largo, ruido y sync. "Nunca confíes en un klingon."</li></ul>
<p>El <b>voicing</b> también imita: los metales tocan acordes cerrados; las cuerdas, abiertos.</p>`,
          `<p>Friedman's final exercises are recipes for playing, not just programming:</p>
<ul><li><b>Flute</b>: square or triangle in a high register. Short attack, but not too short. A touch of <b>noise at the start</b> (the breath), vibrato with <b>delay</b> and a tiny bend at the start of the note.</li>
<li><b>Electric guitar</b>:
<ul><li>Saw with the filter open and some resonance.</li><li>Hard attack, with sustain just below the peak, and a short release.</li><li>Movement from a slow LFO on the filter, PWM or detune.</li><li>Above all, <b>bends and slides</b> like a guitarist: "You're no longer a keyboard player."</li></ul></li>
<li><b>Strings</b>: triangle for the body plus saw for the edge, chorus, long attack and release. Harmonics that enter only at the start (the bow and rosin) and vibrato with a <b>1 s delay</b>.</li>
<li><b>Spaceship</b>: pitch envelope or portamento, square LFO on the oscillator and filter, long release, noise and sync. "Never trust a Klingon."</li></ul>
<p><b>Voicing</b> imitates too: brass plays close chords; strings play open ones.</p>`,
          `<p>Friedmans abschließende Übungen sind Rezepte zum Spielen, nicht nur zum Programmieren:</p>
<ul><li><b>Flöte</b>: Rechteck oder Dreieck in hoher Lage. Kurzer, aber nicht zu kurzer Attack. Ein Hauch <b>Rauschen am Anfang</b> (der Atem), Vibrato mit <b>Delay</b> und ein winziges Bending am Notenbeginn.</li>
<li><b>E-Gitarre</b>:
<ul><li>Sägezahn mit offenem Filter und etwas Resonanz.</li><li>Harter Attack, Sustain knapp unter der Spitze, kurzes Release.</li><li>Bewegung durch einen langsamen LFO auf den Filter, PWM oder Verstimmung.</li><li>Vor allem <b>Bendings und Slides</b> wie ein Gitarrist: „Du bist kein Keyboarder mehr."</li></ul></li>
<li><b>Streicher</b>: Dreieck für den Körper plus Sägezahn für die Kante, Chorus, langer Attack und Release. Obertöne, die nur am Anfang einsetzen (Bogen und Kolophonium), und Vibrato mit <b>1 s Delay</b>.</li>
<li><b>Raumschiff</b>: Pitch-Hüllkurve oder Portamento, Rechteck-LFO auf Oszillator und Filter, langes Release, Rauschen und Sync. „Trau niemals einem Klingonen."</li></ul>
<p>Auch das <b>Voicing</b> imitiert: Blech spielt enge Akkorde, Streicher weite.</p>`,
          `<p>フリードマンの最後の練習は、プログラムのためだけでなく演奏のためのレシピです。</p>
<ul><li><b>フルート</b>：高音域の矩形波か三角波。アタックは短く、しかし短すぎず。<b>最初にノイズ</b>（息）を少し、<b>ディレイ</b>付きのビブラート、音の頭にわずかなベンド。</li>
<li><b>エレキギター</b>：
<ul><li>フィルターを開いたノコギリ波に少しのレゾナンス。</li><li>硬いアタック、ピークよりわずかに低いサステイン、短いリリース。</li><li>フィルターへの遅いLFO、PWM、デチューンで動きを出す。</li><li>何より、ギタリストのように<b>ベンドとスライド</b>を。「君はもうキーボーディストではない。」</li></ul></li>
<li><b>ストリングス</b>：ボディ用の三角波とエッジ用のノコギリ波、コーラス、長いアタックとリリース。最初だけ入る倍音（弓と松脂）と、<b>1秒のディレイ</b>付きビブラート。</li>
<li><b>宇宙船</b>：ピッチ・エンベロープかポルタメント、オシレーターとフィルターへの矩形波LFO、長いリリース、ノイズ、シンク。「クリンゴンを信じるな。」</li></ul>
<p><b>ボイシング</b>も模倣になります。ブラスは密集和音、ストリングスは開離和音で弾きます。</p>`)
      }
    ],
    ex: {
      es: ['Lab Arpegiador: activá Latch y tocá Do-Mi-Sol. Probá Arriba, Abajo, Arriba-abajo y Aleatorio. Después llevá el gate de 10% a 100% y escuchá cómo cambia el carácter sin tocar la envolvente.', 'Apagá el arpegiador, activá Latch y Trancegate, cargá PAD y tocá un acorde. Editá los 16 pasos para que "rebote" con el tempo y subí la suavidad del gate.', 'Arpegiador con división 1/8T (tresillos) y luego 1/32. ¿Qué tempo hace que cada uno suene musical?', 'Lab Sinte: preset LEAD (mono, con glide). Tocá frases ligadas y despegadas y escuchá cuándo hay deslizamiento y ataque.', 'Diseñá la flauta de Friedman en el Lab Sinte: triángulo, ataque corto pero no tanto, un poco de ruido y vibrato suave por LFO. ¿Qué parámetro la vuelve "sintética"?', 'Lab Secuenciador: grabá un riff que delinee Do y Si♭ (cuatro compases de cada uno) y aceleralo. Friedman propone esto como generador de texturas.'],
      en: ['Arpeggiator lab: enable Latch and play C-E-G. Try Up, Down, Up-down and Random. Then take the gate from 10% to 100% and hear the character change without touching the envelope.', 'Switch off the arpeggiator, enable Latch and Trancegate, load PAD and play a chord. Edit the 16 steps so it bounces with the tempo, then raise the gate smoothness.', 'Arpeggiator with division 1/8T (triplets), then 1/32. Which tempo makes each sound musical?', 'Synth lab: LEAD preset (mono, with glide). Play legato and detached phrases and hear when there is a slide and an attack.', 'Design Friedman\'s flute in the Synth lab: triangle, short but not too short attack, a little noise and gentle LFO vibrato. Which parameter makes it sound "synthetic"?', 'Sequencer lab: record a riff outlining C and B♭ (four bars each) and speed it up. Friedman suggests this as a texture generator.'],
      de: ['Arpeggiator-Labor: Latch aktivieren und C-E-G spielen. Auf, Ab, Auf-ab und Zufällig ausprobieren. Dann das Gate von 10 % auf 100 % bringen und hören, wie sich der Charakter ändert, ohne die Hüllkurve anzufassen.', 'Arpeggiator aus, Latch und Trancegate an, PAD laden und einen Akkord spielen. Die 16 Schritte so bearbeiten, dass es mit dem Tempo federt, dann die Gate-Glättung erhöhen.', 'Arpeggiator mit Teilung 1/8T (Triolen), dann 1/32. Bei welchem Tempo klingt jedes musikalisch?', 'Synth-Labor: Preset LEAD (mono, mit Glide). Gebundene und abgesetzte Phrasen spielen und hören, wann es gleitet und wann es neu ansetzt.', 'Friedmans Flöte im Synth-Labor bauen: Dreieck, kurzer, aber nicht zu kurzer Attack, etwas Rauschen und sanftes LFO-Vibrato. Welcher Parameter macht sie „synthetisch"?', 'Sequencer-Labor: Ein Riff aufnehmen, das C und B umreißt (je vier Takte), und beschleunigen. Friedman schlägt das als Texturgenerator vor.'],
      ja: ['アルペジエーター・ラボ：ラッチをオンにしてC-E-Gを弾く。上昇、下降、上下、ランダムを試す。次にゲートを10%から100%に変え、エンベロープに触れずに性格が変わるのを聴く。', 'アルペジエーターをオフ、ラッチとトランスゲートをオンにし、PADを読み込んで和音を弾く。16ステップを編集してテンポに合わせて弾むようにし、ゲートの滑らかさを上げる。', 'アルペジエーターを1/8T（3連）、次に1/32にする。それぞれどのテンポで音楽的に聞こえる？', 'シンセ・ラボ：プリセットLEAD（モノ、グライドあり）。レガートと切った弾き方でフレーズを弾き、いつスライドし、いつアタックするかを聴く。', 'シンセ・ラボでフリードマンのフルートを作る：三角波、短いが短すぎないアタック、少しのノイズ、穏やかなLFOビブラート。どのパラメーターが「シンセっぽさ」を生む？', 'シーケンサー・ラボ：CとB♭（各4小節）をなぞるリフを録音して速くする。フリードマンはこれをテクスチャー生成法として勧めている。']
    },
    deep: {
      es: `<h3>Qué viaja por MIDI</h3>
<p>Un <b>Note On</b> son 3 bytes: estado (con el canal), número de nota (0–127, con el La 440 en 69) y velocidad (1–127). Algunos aparatos mandan el Note Off como Note On con velocidad 0. Otros mensajes:</p>
<ul><li><b>Control Change</b>: CC1 es la rueda de modulación, CC7 el volumen, CC64 el pedal de sustain y CC74 suele ser el brillo.</li>
<li><b>Pitch bend</b>: 14 bits (16384 pasos) para que el bend no se oiga escalonado.</li>
<li><b>Aftertouch</b>: de canal (un valor para todo el teclado) o polifónico (uno por tecla).</li>
<li><b>Clock</b>: 24 pulsos por negra (ppqn).</li></ul>
<p><b>MPE</b> (MIDI Polyphonic Expression) reparte cada nota en su propio canal, de modo que bend, presión y "timbre" (CC74) sean independientes por nota. Es la versión moderna de la sensibilidad lateral que Friedman describía.</p>
<h3>CV/Gate</h3>
<p>Moog estandarizó <b>1 V/oct</b>, donde sumar 1/12 V sube un semitono. Korg y Yamaha usaron <b>Hz/V</b>, una escala lineal en frecuencia: sus aparatos no se entienden entre sí sin conversor. El gate puede ser por voltaje (V-trig) o por cortocircuito (S-trig).</p>
<h3>Arpegiadores con criterio</h3>
<p>Un arpegio redispara las envolventes en cada paso, así que el <b>decay</b> del filtro define cuánto "se oye" cada nota. Un gate corto con decay largo da notas secas pero brillantes; un gate largo con decay corto da notas largas y opacas. Son dos perillas distintas para dos cosas distintas.</p>`,
      en: `<h3>What travels over MIDI</h3>
<p>A <b>Note On</b> is 3 bytes: status (with channel), note number (0–127, with A440 at 69) and velocity (1–127). Some devices send Note Off as a Note On with velocity 0. Other messages:</p>
<ul><li><b>Control Change</b>: CC1 is the mod wheel, CC7 volume, CC64 the sustain pedal and CC74 often brightness.</li>
<li><b>Pitch bend</b>: 14 bits (16,384 steps) so bends don't sound stepped.</li>
<li><b>Aftertouch</b>: channel (one value for the whole keyboard) or polyphonic (one per key).</li>
<li><b>Clock</b>: 24 pulses per quarter note (ppqn).</li></ul>
<p><b>MPE</b> (MIDI Polyphonic Expression) puts each note on its own channel, so bend, pressure and "timbre" (CC74) are independent per note. It's the modern version of the side-to-side sensitivity Friedman described.</p>
<h3>CV/Gate</h3>
<p>Moog standardised <b>1 V/oct</b>, where adding 1/12 V raises a semitone. Korg and Yamaha used <b>Hz/V</b>, a scale linear in frequency: their devices don't understand each other without a converter. The gate can be voltage-based (V-trig) or short-circuit (S-trig).</p>
<h3>Arpeggiators with judgement</h3>
<p>An arpeggio retriggers the envelopes on every step, so the filter <b>decay</b> sets how much of each note you hear. A short gate with a long decay gives dry but bright notes; a long gate with a short decay gives long, dull notes. They are two different knobs for two different things.</p>`,
      de: `<h3>Was über MIDI läuft</h3>
<p>Ein <b>Note On</b> besteht aus 3 Bytes: Status (mit Kanal), Notennummer (0–127, A440 ist 69) und Velocity (1–127). Manche Geräte senden Note Off als Note On mit Velocity 0. Weitere Nachrichten:</p>
<ul><li><b>Control Change</b>: CC1 ist das Modrad, CC7 die Lautstärke, CC64 das Sustainpedal und CC74 oft die Helligkeit.</li>
<li><b>Pitchbend</b>: 14 Bit (16.384 Stufen), damit Bendings nicht gestuft klingen.</li>
<li><b>Aftertouch</b>: Kanal (ein Wert für die ganze Tastatur) oder polyphon (einer pro Taste).</li>
<li><b>Clock</b>: 24 Impulse pro Viertelnote (ppqn).</li></ul>
<p><b>MPE</b> (MIDI Polyphonic Expression) legt jede Note auf einen eigenen Kanal, sodass Bending, Druck und „Timbre" (CC74) pro Note unabhängig sind. Es ist die moderne Version der seitlichen Empfindlichkeit, die Friedman beschrieb.</p>
<h3>CV/Gate</h3>
<p>Moog standardisierte <b>1 V/Okt.</b>: 1/12 V mehr bedeutet einen Halbton höher. Korg und Yamaha nutzten <b>Hz/V</b>, eine frequenzlineare Skala: Ihre Geräte verstehen sich ohne Wandler nicht. Das Gate kann spannungsbasiert (V-Trig) oder per Kurzschluss (S-Trig) sein.</p>
<h3>Arpeggiatoren mit Bedacht</h3>
<p>Ein Arpeggio löst die Hüllkurven bei jedem Schritt neu aus, also bestimmt der Filter-<b>Decay</b>, wie viel man von jeder Note hört. Kurzes Gate mit langem Decay ergibt trockene, aber helle Noten; langes Gate mit kurzem Decay lange, dumpfe Noten. Das sind zwei verschiedene Regler für zwei verschiedene Dinge.</p>`,
      ja: `<h3>MIDIで送られるもの</h3>
<p><b>ノート・オン</b>は3バイトです：ステータス（チャンネル付き）、ノート番号（0〜127、A440は69）、ベロシティ（1〜127）。ノート・オフをベロシティ0のノート・オンとして送る機器もあります。その他のメッセージ：</p>
<ul><li><b>コントロール・チェンジ</b>：CC1はモジュレーション・ホイール、CC7は音量、CC64はサステイン・ペダル、CC74はしばしば明るさ。</li>
<li><b>ピッチベンド</b>：14ビット（16,384段階）で、ベンドが段々に聞こえないようにする。</li>
<li><b>アフタータッチ</b>：チャンネル（鍵盤全体で1つの値）かポリフォニック（鍵ごと）。</li>
<li><b>クロック</b>：4分音符あたり24パルス（ppqn）。</li></ul>
<p><b>MPE</b>（MIDIポリフォニック・エクスプレッション）は各音を専用チャンネルに割り当て、ベンド、圧力、「ティンバー」（CC74）を音ごとに独立させます。フリードマンが述べた左右感度の現代版です。</p>
<h3>CV/ゲート</h3>
<p>モーグは<b>1 V/oct</b>を標準にしました。1/12 V加えると半音上がります。コルグとヤマハは周波数に比例する<b>Hz/V</b>を採用したため、変換器なしでは互いに通じません。ゲートには電圧式（Vトリガー）と短絡式（Sトリガー）があります。</p>
<h3>アルペジエーターの使い方</h3>
<p>アルペジオは毎ステップでエンベロープを再トリガーするので、各音がどれだけ聞こえるかはフィルターの<b>ディケイ</b>で決まります。短いゲートと長いディケイは乾いているが明るい音に、長いゲートと短いディケイは長くて暗い音になります。2つの異なるつまみが、2つの異なることを決めるのです。</p>`
    },
    read: ['Dean Friedman — <i>Synthesizer Basics</i>, caps. 4–6 y 9', 'Simon Cann — <i>How To Make A Noise</i>, caps. 5–6 y Refill #1', 'Ashley Hewitt — <i>How To Program Any Synthesizer</i>, cap. 12', 'MIDI Association — <i>MIDI 1.0 Detailed Specification</i> y especificación MPE'],
    quiz: [
      Q(T('La velocidad de un teclado mide…', 'Keyboard velocity measures…', 'Die Velocity einer Tastatur misst…', '鍵盤のベロシティが測るのは…'),
        T(['La fuerza', 'Lo rápido que baja la tecla', 'La presión posterior', 'Cuánto tiempo se sostiene'], ['The force', 'How fast the key goes down', 'Pressure afterwards', 'How long it is held'], ['Die Kraft', 'Wie schnell die Taste sinkt', 'Den Druck danach', 'Wie lange sie gehalten wird'], ['力', '鍵盤が下がる速さ', 'その後の圧力', '押さえている時間']), 1,
        T('Mide velocidad; tocamos más rápido cuando queremos acentuar.', 'It measures speed; we play faster when we want to accent.', 'Sie misst Geschwindigkeit; wer betonen will, spielt schneller.', '速さを測る。アクセントをつけたいとき、人は速く打鍵する。')),
      Q(T('Activás el chorus de doble oscilador en un sinte de 8 voces. ¿Qué pasa?', 'You enable dual-oscillator chorus on an 8-voice synth. What happens?', 'Du aktivierst den Doppel-Oszillator-Chorus an einem 8-stimmigen Synth. Was passiert?', '8ボイスのシンセで2オシレーターのコーラスをオンにすると？'),
        T(['Quedan 4 voces', 'Pasan a ser 16', 'No cambia nada', 'Queda mono'], ['4 voices remain', 'It becomes 16', 'Nothing changes', 'It becomes mono'], ['4 Stimmen bleiben', 'Es werden 16', 'Nichts ändert sich', 'Es wird mono'], ['4ボイスになる', '16ボイスになる', '何も変わらない', 'モノになる']), 0,
        T('Cada nota usa dos voces para el doblado.', 'Each note uses two voices for the doubling.', 'Jede Note belegt für die Dopplung zwei Stimmen.', '各音が重ねるために2ボイスを使う。')),
      Q(T('¿Qué es el single trigger?', 'What is single trigger?', 'Was ist Single Trigger?', 'シングル・トリガーとは？'),
        T(['Cada nota redispara la envolvente', 'Las notas ligadas comparten una envolvente', 'Un arpegiador', 'Una cuantización'], ['Each note retriggers the envelope', 'Legato notes share one envelope', 'An arpeggiator', 'A quantisation'], ['Jede Note löst die Hüllkurve neu aus', 'Gebundene Noten teilen eine Hüllkurve', 'Ein Arpeggiator', 'Eine Quantisierung'], ['各音がエンベロープを再トリガーする', 'レガートの音が1つのエンベロープを共有する', 'アルペジエーター', 'クオンタイズ']), 1,
        T('Solo al despegar los dedos vuelve a sonar el ataque.', 'The attack only returns when you lift your fingers.', 'Der Attack kehrt erst zurück, wenn man die Finger hebt.', '指を離したときだけアタックが戻る。')),
      Q(T('¿En qué se diferencia el glissando del portamento?', 'How does glissando differ from portamento?', 'Worin unterscheidet sich Glissando von Portamento?', 'グリッサンドとポルタメントの違いは？'),
        T(['El glissando avanza por semitonos', 'Son lo mismo', 'El portamento va por semitonos', 'El glissando es un vibrato'], ['Glissando moves in semitones', 'They\'re the same', 'Portamento moves in semitones', 'Glissando is a vibrato'], ['Glissando geht in Halbtönen', 'Sie sind gleich', 'Portamento geht in Halbtönen', 'Glissando ist ein Vibrato'], ['グリッサンドは半音ずつ進む', '同じもの', 'ポルタメントが半音ずつ進む', 'グリッサンドはビブラート']), 0,
        T('El portamento es un deslizamiento continuo.', 'Portamento is a continuous slide.', 'Portamento ist ein stufenloses Gleiten.', 'ポルタメントは連続的に滑る。')),
      Q(T('¿Qué parámetro del arpegiador da staccato sin cambiar las envolventes?', 'Which arpeggiator parameter gives staccato without changing the envelopes?', 'Welcher Arpeggiator-Parameter ergibt Staccato, ohne die Hüllkurven zu ändern?', 'エンベロープを変えずにスタッカートにするアルペジエーターのパラメーターは？'),
        T(['El largo de nota (gate)', 'Las octavas', 'El patrón', 'El tempo'], ['Note length (gate)', 'Octaves', 'Pattern', 'Tempo'], ['Notenlänge (Gate)', 'Oktaven', 'Muster', 'Tempo'], ['音の長さ（ゲート）', 'オクターブ', 'パターン', 'テンポ']), 0,
        T('Cann lo destaca porque conserva el timbre.', 'Cann highlights it because it keeps the timbre.', 'Cann betont es, weil es die Klangfarbe erhält.', '音色を保てるため、キャンが強調している。')),
      Q(T('¿Cuántos canales tiene MIDI 1.0 por cable?', 'How many channels does MIDI 1.0 have per cable?', 'Wie viele Kanäle hat MIDI 1.0 pro Kabel?', 'MIDI 1.0のケーブル1本あたりのチャンネル数は？'),
        T(['8', '16', '32', '128'], ['8', '16', '32', '128'], ['8', '16', '32', '128'], ['8', '16', '32', '128']), 1,
        T('Como 16 canales de TV desde la misma antena (Friedman).', 'Like 16 TV channels from the same antenna (Friedman).', 'Wie 16 Fernsehkanäle von derselben Antenne (Friedman).', '同じアンテナから送られる16のテレビ・チャンネルのよう（フリードマン）。'))
    ]
  });

  /* ===================== BATERÍA SINTÉTICA ===================== */
  after('perform', {
    id: 'drums', lv: 2, lab: ['drumsynth', 'seq'],
    title: T('Batería y percusión sintética', 'Synthetic drums and percussion', 'Synthetische Drums und Perkussion', 'シンセ・ドラムとパーカッション'),
    sum: T('Cómo nacen bombo, caja, hats, palmas, rim, cencerro, syn drum y toms a partir de un seno con golpe de pitch y ruido filtrado, y cómo mezclar la batería.',
      'How kick, snare, hats, clap, rim, cowbell, syn drum and toms arise from a pitch-hit sine and filtered noise, and how to mix the kit.',
      'Wie Bassdrum, Snare, Hats, Clap, Rim, Kuhglocke, Syndrum und Toms aus einem Sinus mit Pitch-Schlag und gefiltertem Rauschen entstehen und wie man das Set mischt.',
      'ピッチ・ヒットのあるサイン波とフィルターしたノイズから、キック、スネア、ハット、クラップ、リム、カウベル、シンドラム、タムがどう生まれるか、そしてドラムのミックス方法。'),
    key: {
      es: ['Casi toda la percusión sintética es un <b>seno "maltratado"</b> (con golpe de pitch) más <b>ruido filtrado</b>.', 'Bombo: seno de altura fija + <b>envolvente de pitch muy rápida</b> (el golpe del mazo) + decay. El mismo truco da pegada a los bajos.', 'Hi-hats: ruido con pasa banda o pasa altos y decay corto (cerrado) o largo (abierto). Que suenen "de la misma familia".', 'Caja: cuerpo de senos + ruido en pasa banda resonante (el "crack"). Palmas: ráfagas de ruido muy juntas con un LFO de pulso, no chorus.', 'Si buscás realismo acústico: samples, o capas de samples + síntesis para ganar peso.'],
      en: ['Almost all synthetic percussion is a <b>"mangled" sine</b> (with a pitch hit) plus <b>filtered noise</b>.', 'Kick: fixed-pitch sine + a <b>very fast pitch envelope</b> (the beater hit) + decay. The same trick adds punch to basses.', 'Hi-hats: noise through a band-pass or high-pass with a short (closed) or long (open) decay. They should sound "from the same family".', 'Snare: a sine body + noise through a resonant band-pass (the "crack"). Clap: bursts of noise very close together via a pulse LFO, not chorus.', 'For acoustic realism: samples, or layers of samples + synthesis to gain weight.'],
      de: ['Fast alle synthetische Perkussion ist ein <b>„malträtierter" Sinus</b> (mit Pitch-Schlag) plus <b>gefiltertes Rauschen</b>.', 'Bassdrum: Sinus mit fester Tonhöhe + <b>sehr schnelle Pitch-Hüllkurve</b> (der Schlägel) + Decay. Derselbe Trick gibt auch Bässen Punch.', 'Hi-Hats: Rauschen durch Band- oder Hochpass mit kurzem (geschlossen) oder langem (offen) Decay. Sie sollten „aus derselben Familie" klingen.', 'Snare: Sinuskörper + Rauschen durch resonanten Bandpass (der „Crack"). Clap: dicht aufeinanderfolgende Rauschstöße per Puls-LFO, kein Chorus.', 'Für akustischen Realismus: Samples oder Schichten aus Samples + Synthese für mehr Gewicht.'],
      ja: ['シンセ・パーカッションのほとんどは、<b>「いじめた」サイン波</b>（ピッチ・ヒット付き）と<b>フィルターしたノイズ</b>。', 'キック：固定ピッチのサイン波＋<b>とても速いピッチ・エンベロープ</b>（ビーターの打撃）＋ディケイ。同じ技でベースにもパンチが出る。', 'ハイハット：バンドパスかハイパスを通したノイズに、短い（クローズ）か長い（オープン）ディケイ。「同じ家族」に聞こえるように。', 'スネア：サイン波のボディ＋レゾナント・バンドパスを通したノイズ（「クラック」）。クラップ：パルスLFOによる密なノイズのバースト。コーラスではない。', 'アコースティックなリアルさが欲しいならサンプル、または重みを増すためにサンプル＋シンセのレイヤー。']
    },
    sec: [
      {
        h: T('Anatomía de un tambor sintético', 'Anatomy of a synthetic drum', 'Anatomie einer synthetischen Trommel', 'シンセ・ドラムの解剖'),
        b: T(`<p>Cann dedica un capítulo entero a la percusión sintética y aclara el objetivo: sonar como <b>batería electrónica</b>, no imitar un kit acústico. Para realismo, un baterista o buenos samples. Igual vale la pena aprender la técnica: <b>superponer samples con síntesis</b> conserva el realismo y agrega la profundidad que a veces les falta a los samples.</p>
<p>Casi todo se arma con dos ingredientes:</p>
<ul><li><b>Un seno</b> con una envolvente de pitch y de volumen: el cuerpo, el tono, el golpe.</li>
<li><b>Ruido</b> muy filtrado: el chasquido, el aire, el metal.</li></ul>
<p>Un detalle práctico: poné una polifonía de al menos 4 para que los redobles no corten la cola de cada golpe. Y no saltees este tema aunque no hagas batería: el golpe de pitch, el ruido en el ataque y el hold sirven para todo tipo de sonidos.</p>`,
          `<p>Cann devotes a whole chapter to synthetic percussion and states the goal: sound like an <b>electronic kit</b>, not imitate an acoustic one. For realism, hire a drummer or use good samples. The technique is still worth learning: <b>layering samples with synthesis</b> keeps the realism and adds the depth samples sometimes lack.</p>
<p>Almost everything is built from two ingredients:</p>
<ul><li><b>A sine</b> with pitch and volume envelopes: the body, the tone, the hit.</li>
<li>Heavily filtered <b>noise</b>: the snap, the air, the metal.</li></ul>
<p>A practical detail: set a polyphony of at least 4 so rolls don't cut off each hit's tail. And don't skip this topic even if you don't make drums: the pitch hit, noise on the attack and hold work for all kinds of sounds.</p>`,
          `<p>Cann widmet der synthetischen Perkussion ein ganzes Kapitel und nennt das Ziel: wie ein <b>elektronisches Set</b> klingen, nicht ein akustisches imitieren. Für Realismus braucht man einen Schlagzeuger oder gute Samples. Die Technik lohnt sich trotzdem: <b>Samples mit Synthese zu schichten</b> erhält den Realismus und bringt die Tiefe, die Samples manchmal fehlt.</p>
<p>Fast alles entsteht aus zwei Zutaten:</p>
<ul><li><b>Ein Sinus</b> mit Pitch- und Lautstärkehüllkurve: Körper, Ton, Schlag.</li>
<li>Stark gefiltertes <b>Rauschen</b>: Knall, Luft, Metall.</li></ul>
<p>Ein praktisches Detail: Polyphonie mindestens 4, damit Wirbel nicht den Ausklang jedes Schlags abschneiden. Und überspringe das Thema nicht, auch wenn du keine Drums baust: Pitch-Schlag, Rauschen im Attack und Hold funktionieren für alle Arten von Klängen.</p>`,
          `<p>キャンはシンセ・パーカッションに丸ごと1章を割き、目標をはっきりさせています。アコースティック・キットを真似るのではなく、<b>電子ドラム</b>のように鳴らすこと。リアルさが必要ならドラマーを雇うか良いサンプルを使う。それでも技術は学ぶ価値があります。<b>サンプルとシンセを重ねる</b>と、リアルさを保ったまま、サンプルに欠けがちな深みを加えられます。</p>
<p>ほとんどすべてが2つの材料からできています。</p>
<ul><li>ピッチと音量のエンベロープを持つ<b>サイン波</b>：ボディ、音程、打撃。</li>
<li>強くフィルターした<b>ノイズ</b>：はじける音、空気感、金属感。</li></ul>
<p>実践的な注意点：ロールで各打撃の余韻が切れないよう、発音数を4以上にしましょう。ドラムを作らない人も飛ばさないでください。ピッチ・ヒット、アタックのノイズ、ホールドはあらゆる種類の音に使えます。</p>`)
      },
      {
        h: T('Bombo', 'Kick', 'Bassdrum', 'キック'),
        b: T(`<p>La receta de Cann:</p>
<ul><li>Un <b>seno de altura fija</b>: no sigue el teclado, y está dos octavas abajo.</li>
<li>Envolvente de volumen con ataque 0, un <b>hold</b> de ~20 ms (más "kick") y un decay exponencial de ~0,6 s hasta sustain 0.</li>
<li>La pegada viene de la <b>envolvente de pitch</b>: arranca arriba y cae en ~30 ms. Es el "mazo golpeando el parche". Cann escala su profundidad con la velocidad: el tono cambia con el toque y el volumen se mantiene parejo.</li></ul>
<p>Ajustes:</p>
<ul><li><b>Más suave</b>: ataque ~10 ms (sin llegar a un fade-in), más decay y menos golpe de pitch.</li>
<li><b>Más duro</b>: más golpe de pitch y más hold. Cuidado: si el tiempo del golpe se alarga, se vuelve un <i>syn drum</i>.</li>
<li>Peso extra: un pulso grave por un LP de 83 Hz muy resonante, casi inaudible como tono.</li></ul>
<p>El golpe de pitch es una técnica general: le da impacto al inicio de cualquier sonido, sobre todo a los <b>bajos</b>.</p>`,
          `<p>Cann's recipe:</p>
<ul><li>A <b>fixed-pitch sine</b>: it doesn't follow the keyboard, and sits two octaves down.</li>
<li>Volume envelope with attack 0, a <b>hold</b> of ~20 ms (more "kick") and an exponential decay of ~0.6 s to zero sustain.</li>
<li>The punch comes from the <b>pitch envelope</b>: it starts high and falls in ~30 ms. That's the "beater hitting the skin". Cann scales its depth with velocity: the tone changes with touch while the volume stays even.</li></ul>
<p>Adjustments:</p>
<ul><li><b>Softer</b>: attack ~10 ms (short of a fade-in), more decay and less pitch hit.</li>
<li><b>Harder</b>: more pitch hit and more hold. Careful: if the hit time gets longer, it turns into a <i>syn drum</i>.</li>
<li>Extra weight: a low pulse through a very resonant 83 Hz LP, barely audible as a tone.</li></ul>
<p>The pitch hit is a general technique: it gives impact to the start of any sound, especially <b>basses</b>.</p>`,
          `<p>Canns Rezept:</p>
<ul><li>Ein <b>Sinus mit fester Tonhöhe</b>: Er folgt der Tastatur nicht und liegt zwei Oktaven tiefer.</li>
<li>Lautstärkehüllkurve mit Attack 0, einem <b>Hold</b> von ~20 ms (mehr „Kick") und einem exponentiellen Decay von ~0,6 s bis Sustain null.</li>
<li>Der Punch kommt von der <b>Pitch-Hüllkurve</b>: Sie startet hoch und fällt in ~30 ms. Das ist der „Schlägel auf dem Fell". Cann skaliert ihre Tiefe mit der Velocity: Der Ton ändert sich mit dem Anschlag, die Lautstärke bleibt gleichmäßig.</li></ul>
<p>Anpassungen:</p>
<ul><li><b>Weicher</b>: Attack ~10 ms (noch kein Fade-in), mehr Decay und weniger Pitch-Schlag.</li>
<li><b>Härter</b>: mehr Pitch-Schlag und mehr Hold. Vorsicht: Wird die Schlagzeit länger, wird daraus ein <i>Syndrum</i>.</li>
<li>Zusätzliches Gewicht: ein tiefer Puls durch einen sehr resonanten Tiefpass bei 83 Hz, als Ton kaum hörbar.</li></ul>
<p>Der Pitch-Schlag ist eine allgemeine Technik: Er gibt dem Beginn jedes Klangs Wucht, vor allem bei <b>Bässen</b>.</p>`,
          `<p>キャンのレシピ：</p>
<ul><li><b>固定ピッチのサイン波</b>：鍵盤に追従せず、2オクターブ下に置く。</li>
<li>音量エンベロープはアタック0、約20 msの<b>ホールド</b>（「キック」感が増す）、サステイン0まで約0.6秒の指数ディケイ。</li>
<li>パンチは<b>ピッチ・エンベロープ</b>から来る。高いところから約30 msで下がる。これが「ビーターがヘッドを叩く」音。キャンはその深さをベロシティでスケーリングし、音量を一定に保ったままタッチで音色が変わるようにしている。</li></ul>
<p>調整：</p>
<ul><li><b>柔らかく</b>：アタック約10 ms（フェードインにはしない）、ディケイを長く、ピッチ・ヒットを弱く。</li>
<li><b>硬く</b>：ピッチ・ヒットを強く、ホールドを長く。注意：ヒットの時間が長くなると<i>シンドラム</i>になる。</li>
<li>さらに重みを：強くレゾナンスをかけた83 HzのLPに低いパルスを通す。音程としてはほとんど聞こえない。</li></ul>
<p>ピッチ・ヒットは汎用の技です。どんな音の頭にもインパクトを与え、特に<b>ベース</b>に効きます。</p>`)
      },
      {
        h: T('Hi-hats, rim y cencerro', 'Hi-hats, rim and cowbell', 'Hi-Hats, Rim und Kuhglocke', 'ハイハット、リム、カウベル'),
        b: T(`<ul><li><b>Hat cerrado</b> (Cann): ruido subido varias octavas, que lo acerca al ruido blanco, por un pasa banda de 12 dB. Envolvente de volumen con decay exponencial de ~0,11 s. La velocidad mueve el nivel entre ~46% y 100%. Para variar el timbre en cada golpe, un LFO muy suave o la altura de la nota al corte.</li>
<li><b>Hat abierto</b>: el mismo sonido con un pasa banda de 24 dB, más fino, y decay de ~1,3 s. No cambies demasiado: <b>abierto y cerrado deben sonar emparentados</b>.</li>
<li><b>Rim shot</b>: ruido por un pasa bajos de 2 kHz muy resonante, con decay de ~0,18 s. El filtro "canta" y da el clic tonal.</li>
<li><b>Cencerro</b>: dos <b>cuadradas</b> a una relación de ~1,5, por un pasa bajos de ~600 Hz muy resonante, con decay exponencial de ~0,34 s y limitador. Es la misma idea que el cencerro de la TR-808, que usa 540 y 800 Hz.</li></ul>`,
          `<ul><li><b>Closed hat</b> (Cann): noise raised several octaves, which makes it close to white noise, through a 12 dB band-pass. Volume envelope with an exponential decay of ~0.11 s. Velocity moves the level between ~46% and 100%. To vary the timbre on each hit, a very gentle LFO or the note pitch on the cutoff.</li>
<li><b>Open hat</b>: the same sound through a thinner 24 dB band-pass, with a ~1.3 s decay. Don't change too much: <b>open and closed must sound related</b>.</li>
<li><b>Rim shot</b>: noise through a very resonant 2 kHz low-pass, with a ~0.18 s decay. The filter "sings" and gives the tonal click.</li>
<li><b>Cowbell</b>: two <b>squares</b> at a ratio of ~1.5, through a very resonant ~600 Hz low-pass, with an exponential decay of ~0.34 s and a limiter. It's the same idea as the TR-808 cowbell, which uses 540 and 800 Hz.</li></ul>`,
          `<ul><li><b>Geschlossene Hi-Hat</b> (Cann): Rauschen, um mehrere Oktaven angehoben und damit nahe an weißem Rauschen, durch einen 12-dB-Bandpass. Lautstärkehüllkurve mit exponentiellem Decay von ~0,11 s. Die Velocity bewegt den Pegel zwischen ~46 % und 100 %. Für Klangvariation bei jedem Schlag ein sehr sanfter LFO oder die Tonhöhe auf den Cutoff.</li>
<li><b>Offene Hi-Hat</b>: derselbe Klang durch einen dünneren 24-dB-Bandpass, mit ~1,3 s Decay. Nicht zu viel ändern: <b>Offen und geschlossen müssen verwandt klingen</b>.</li>
<li><b>Rimshot</b>: Rauschen durch einen sehr resonanten Tiefpass bei 2 kHz, mit ~0,18 s Decay. Der Filter „singt" und erzeugt den tonalen Klick.</li>
<li><b>Kuhglocke</b>: zwei <b>Rechtecke</b> im Verhältnis ~1,5, durch einen sehr resonanten Tiefpass bei ~600 Hz, mit exponentiellem Decay von ~0,34 s und Limiter. Dieselbe Idee wie die Kuhglocke der TR-808, die 540 und 800 Hz nutzt.</li></ul>`,
          `<ul><li><b>クローズド・ハット</b>（キャン）：数オクターブ上げてホワイトノイズに近づけたノイズを、12 dBのバンドパスに通す。音量エンベロープは約0.11秒の指数ディケイ。ベロシティでレベルを約46%〜100%の間で動かす。打つたびに音色を変えるには、ごく穏やかなLFOか、ノートの音程をカットオフへ。</li>
<li><b>オープン・ハット</b>：同じ音を、より細い24 dBのバンドパスに通し、ディケイを約1.3秒に。変えすぎないこと：<b>オープンとクローズドは同系統に聞こえるべき</b>。</li>
<li><b>リムショット</b>：強くレゾナンスをかけた2 kHzのローパスにノイズを通し、ディケイ約0.18秒。フィルターが「鳴いて」音程感のあるクリックになる。</li>
<li><b>カウベル</b>：約1.5の比の<b>矩形波</b>2つを、強くレゾナンスをかけた約600 Hzのローパスに通し、約0.34秒の指数ディケイとリミッター。540 Hzと800 Hzを使うTR-808のカウベルと同じ発想。</li></ul>`)
      },
      {
        h: T('Caja y palmas', 'Snare and clap', 'Snare und Clap', 'スネアとクラップ'),
        b: T(`<p><b>Caja</b> (la "Dodgy Snare" de Cann, grave y gorda):</p>
<ul><li>Un seno fijo con decay de ~0,15 s y un golpe de pitch muy corto (~10 ms).</li>
<li>Un <b>segundo seno más grave</b> con decay más largo (~0,29 s), mezclado bajo (~22%): aporta un "ring" que interfiere con el primero sin oírse aparte.</li>
<li>El <b>crack</b>: ruido por un pasa banda de 2 kHz con mucha resonancia y decay de ~0,15 s.</li></ul>
<p>Friedman propone una versión más vieja: ruido más un oscilador (o un filtro auto-oscilante) con envolvente, para que el tono <b>caiga</b>.</p>
<p><b>Palmas</b>: dos ruidos en pasa banda cercanos (~2,0 y ~1,8 kHz). La clave es que muchas personas aplaudiendo no producen chorus: producen <b>muchos impactos muy juntos</b>, algo entre trémolo y eco. Cann lo hace con un <b>LFO de pulso a ≥ 20 Hz</b> sobre el nivel de uno de los ruidos.</p>
<p>A 20 Hz suena como un eco metálico. Subiendo la velocidad del LFO (Cann la escala con la altura) aparece la "multitud" de palmas. Un delay corto daría comb filtering, que es justo lo que hay que evitar.</p>`,
          `<p><b>Snare</b> (Cann's low, fat "Dodgy Snare"):</p>
<ul><li>A fixed sine with a ~0.15 s decay and a very short pitch hit (~10 ms).</li>
<li>A <b>second, lower sine</b> with a longer decay (~0.29 s), mixed low (~22%): it adds a "ring" that interferes with the first without being heard separately.</li>
<li>The <b>crack</b>: noise through a highly resonant 2 kHz band-pass with a ~0.15 s decay.</li></ul>
<p>Friedman suggests an older version: noise plus an oscillator (or a self-oscillating filter) with an envelope, so the pitch <b>falls</b>.</p>
<p><b>Clap</b>: two band-passed noises close together (~2.0 and ~1.8 kHz). The key is that many people clapping don't produce chorus: they produce <b>many impacts very close together</b>, something between tremolo and echo. Cann does it with a <b>pulse LFO at ≥ 20 Hz</b> on the level of one of the noises.</p>
<p>At 20 Hz it sounds like a metallic echo. Raising the LFO rate (Cann scales it with pitch) brings out the clapping "crowd". A short delay would cause comb filtering, which is exactly what to avoid.</p>`,
          `<p><b>Snare</b> (Canns tiefe, fette „Dodgy Snare"):</p>
<ul><li>Ein fester Sinus mit ~0,15 s Decay und sehr kurzem Pitch-Schlag (~10 ms).</li>
<li>Ein <b>zweiter, tieferer Sinus</b> mit längerem Decay (~0,29 s), leise beigemischt (~22 %): Er bringt einen „Ring", der mit dem ersten interferiert, ohne separat hörbar zu sein.</li>
<li>Der <b>Crack</b>: Rauschen durch einen stark resonanten Bandpass bei 2 kHz mit ~0,15 s Decay.</li></ul>
<p>Friedman schlägt eine ältere Variante vor: Rauschen plus ein Oszillator (oder ein selbstoszillierender Filter) mit Hüllkurve, sodass der Ton <b>fällt</b>.</p>
<p><b>Clap</b>: zwei nah beieinander liegende Bandpass-Rauschen (~2,0 und ~1,8 kHz). Der Schlüssel: Viele klatschende Menschen erzeugen keinen Chorus, sondern <b>viele dicht aufeinanderfolgende Impulse</b>, etwas zwischen Tremolo und Echo. Cann macht das mit einem <b>Puls-LFO bei ≥ 20 Hz</b> auf dem Pegel eines der Rauschen.</p>
<p>Bei 20 Hz klingt es wie ein metallisches Echo. Erhöht man das LFO-Tempo (Cann skaliert es mit der Tonhöhe), entsteht die klatschende „Menge". Ein kurzes Delay würde Kammfilter-Effekte erzeugen, also genau das, was man vermeiden will.</p>`,
          `<p><b>スネア</b>（キャンの低く太い「Dodgy Snare」）：</p>
<ul><li>約0.15秒のディケイと、ごく短いピッチ・ヒット（約10 ms）の固定サイン波。</li>
<li>ディケイの長い（約0.29秒）<b>2つ目の低いサイン波</b>を小さめ（約22%）に混ぜる。単独では聞こえないまま1つ目と干渉する「リング」を加える。</li>
<li><b>クラック</b>：強くレゾナンスをかけた2 kHzのバンドパスにノイズを通し、ディケイ約0.15秒。</li></ul>
<p>フリードマンはより古いやり方を示します。ノイズに、エンベロープ付きのオシレーター（または自己発振フィルター）を加え、音程が<b>下がる</b>ようにする方法です。</p>
<p><b>クラップ</b>：近い帯域（約2.0 kHzと約1.8 kHz）のバンドパスを通した2つのノイズ。鍵となるのは、大勢の拍手はコーラスにはならないということ。<b>ごく近接した多数の打撃</b>、トレモロとエコーの中間のようなものになります。キャンはノイズの片方のレベルに<b>20 Hz以上のパルスLFO</b>をかけて作ります。</p>
<p>20 Hzでは金属的なエコーのように聞こえます。LFOの速度を上げると（キャンは音程でスケーリング）、拍手する「群衆」が現れます。短いディレイではコム・フィルタリングが起き、それこそ避けたいものです。</p>`)
      },
      {
        h: T('Syn drum, toms y efectos con ruido', 'Syn drum, toms and noise effects', 'Syndrum, Toms und Rauscheffekte', 'シンドラム、タム、ノイズ・エフェクト'),
        b: T(`<ul><li><b>Syn drum</b> (el de la música disco de los 70): un seno con una envolvente de pitch <b>lenta</b> (~0,8 s), para que se oiga la caída. Si la acortás, se vuelve un bombo. Tiene un decay largo (~1,5 s) y se toca por todo el teclado.</li>
<li><b>Tom</b>: un seno con decay de ~0,85 s, más una cuadrada por un pasa bajos resonante que suena <b>solo en el ataque</b> (decay de ~10 ms). Balanceando ambos niveles se cambia el tono. Friedman sugiere además una pequeña caída de pitch.</li>
<li><b>Ruido como fuente</b> (Friedman):
<ul><li><b>Mar</b>: ruido con LFO lento y ataque y release largos.</li><li><b>Trueno</b>: ruido con resonancia.</li><li><b>Viento</b>: ruido con el filtro en movimiento.</li></ul></li>
<li>Hewitt muestra el "noise shaping" al estilo Kraftwerk: ruido por un pasa altos invertido con ataque, volumen con sustain 0 y decay corto, un LFO lento al corte y un delay rítmico.</li></ul>`,
          `<ul><li><b>Syn drum</b> (the one from 1970s disco): a sine with a <b>slow</b> pitch envelope (~0.8 s), so you hear the drop. Shorten it and it becomes a kick. It has a long decay (~1.5 s) and is played across the keyboard.</li>
<li><b>Tom</b>: a sine with a ~0.85 s decay, plus a square through a resonant low-pass that sounds <b>only on the attack</b> (~10 ms decay). Balancing the two levels changes the tone. Friedman also suggests a small pitch drop.</li>
<li><b>Noise as a source</b> (Friedman):
<ul><li><b>Ocean</b>: noise with a slow LFO and long attack and release.</li><li><b>Thunder</b>: noise with resonance.</li><li><b>Wind</b>: noise with a moving filter.</li></ul></li>
<li>Hewitt shows Kraftwerk-style "noise shaping": noise through an inverted high-pass with attack, volume with zero sustain and short decay, a slow LFO on the cutoff and a rhythmic delay.</li></ul>`,
          `<ul><li><b>Syndrum</b> (der aus der Disco der 70er): ein Sinus mit <b>langsamer</b> Pitch-Hüllkurve (~0,8 s), damit man das Abfallen hört. Kürzt man sie, wird eine Bassdrum daraus. Er hat ein langes Decay (~1,5 s) und wird über die ganze Tastatur gespielt.</li>
<li><b>Tom</b>: ein Sinus mit ~0,85 s Decay, dazu ein Rechteck durch einen resonanten Tiefpass, das <b>nur im Attack</b> klingt (~10 ms Decay). Das Pegelverhältnis beider bestimmt den Ton. Friedman schlägt zusätzlich einen kleinen Tonhöhenabfall vor.</li>
<li><b>Rauschen als Quelle</b> (Friedman):
<ul><li><b>Meer</b>: Rauschen mit langsamem LFO und langem Attack und Release.</li><li><b>Donner</b>: Rauschen mit Resonanz.</li><li><b>Wind</b>: Rauschen mit bewegtem Filter.</li></ul></li>
<li>Hewitt zeigt „Noise Shaping" im Stil von Kraftwerk: Rauschen durch einen invertierten Hochpass mit Attack, Lautstärke mit Sustain null und kurzem Decay, ein langsamer LFO auf den Cutoff und ein rhythmisches Delay.</li></ul>`,
          `<ul><li><b>シンドラム</b>（70年代ディスコのあれ）：下降が聞こえるよう<b>遅い</b>ピッチ・エンベロープ（約0.8秒）を持つサイン波。短くするとキックになる。ディケイは長く（約1.5秒）、鍵盤全体で演奏する。</li>
<li><b>タム</b>：ディケイ約0.85秒のサイン波に、レゾナント・ローパスを通して<b>アタックだけ</b>鳴る矩形波（ディケイ約10 ms）を加える。2つのレベルのバランスで音色が変わる。フリードマンは小さなピッチの下降も勧めている。</li>
<li><b>音源としてのノイズ</b>（フリードマン）：
<ul><li><b>海</b>：遅いLFOと長いアタック・リリースのノイズ。</li><li><b>雷</b>：レゾナンスをかけたノイズ。</li><li><b>風</b>：フィルターを動かしたノイズ。</li></ul></li>
<li>ヒューイットはクラフトワーク風の「ノイズ・シェイピング」を紹介しています。アタック付きの反転ハイパスに通したノイズ、サステイン0で短いディケイの音量、カットオフへの遅いLFO、リズミカルなディレイ。</li></ul>`)
      },
      {
        h: T('Mezclar la batería', 'Mixing the kit', 'Das Set mischen', 'ドラムのミックス'),
        b: T(`<p>Hewitt explica una caja de ritmos de samples (tipo 909). Sus controles:</p>
<ul><li><b>Tune</b>: cambia la altura <i>y</i> la duración.</li><li><b>Punch</b>: parecido al ataque.</li><li><b>Decay</b>, <b>pan</b> y <b>volumen</b>.</li></ul>
<p>Su mezcla de partida:</p>
<ul><li>El <b>bombo al máximo</b>, porque sostiene todo.</li>
<li>Las palmas más fuertes y un poco hacia un lado.</li>
<li>El hat abierto con menos decay y hacia el lado contrario, para equilibrar.</li>
<li>Los toms graves más bajos de volumen.</li></ul>
<p>Cann agrega:</p>
<ul><li>La batería sintética es más jugable en un sinte que en una caja de ritmos, porque cada sonido se puede tocar por todo el teclado con variaciones tonales.</li>
<li>Abiertos y cerrados deben compartir familia.</li>
<li>Recortá con un HP los graves de todo lo que no sea bombo o bajo (ver el módulo de mezcla).</li></ul>`,
          `<p>Hewitt explains a sample-based drum machine (909-style). Its controls:</p>
<ul><li><b>Tune</b>: changes pitch <i>and</i> length.</li><li><b>Punch</b>: similar to attack.</li><li><b>Decay</b>, <b>pan</b> and <b>volume</b>.</li></ul>
<p>His starting mix:</p>
<ul><li>The <b>kick at full</b>, because it holds everything up.</li>
<li>Claps louder and a little to one side.</li>
<li>The open hat with less decay and to the opposite side, for balance.</li>
<li>Low toms lower in volume.</li></ul>
<p>Cann adds:</p>
<ul><li>Synthetic drums are more playable on a synth than on a drum machine, because each sound can be played across the keyboard with tonal variations.</li>
<li>Open and closed hats should share a family.</li>
<li>High-pass the lows of everything that isn't kick or bass (see the mix module).</li></ul>`,
          `<p>Hewitt erklärt einen Sample-Drumcomputer (im Stil der 909). Seine Regler:</p>
<ul><li><b>Tune</b>: ändert Tonhöhe <i>und</i> Länge.</li><li><b>Punch</b>: ähnlich wie Attack.</li><li><b>Decay</b>, <b>Pan</b> und <b>Lautstärke</b>.</li></ul>
<p>Sein Ausgangsmix:</p>
<ul><li>Die <b>Bassdrum ganz auf</b>, denn sie trägt alles.</li>
<li>Claps lauter und etwas zur Seite.</li>
<li>Die offene Hi-Hat mit weniger Decay und zur Gegenseite, zum Ausgleich.</li>
<li>Tiefe Toms leiser.</li></ul>
<p>Cann ergänzt:</p>
<ul><li>Synthetische Drums sind auf einem Synth spielbarer als auf einem Drumcomputer, weil jeder Klang mit tonalen Variationen über die ganze Tastatur gespielt werden kann.</li>
<li>Offene und geschlossene Hi-Hat sollten zur selben Familie gehören.</li>
<li>Die Tiefen von allem, was nicht Bassdrum oder Bass ist, per Hochpass kappen (siehe Mix-Modul).</li></ul>`,
          `<p>ヒューイットはサンプル方式のドラムマシン（909型）を説明します。そのコントロール：</p>
<ul><li><b>チューン</b>：音程<i>と</i>長さを変える。</li><li><b>パンチ</b>：アタックに近い。</li><li><b>ディケイ</b>、<b>パン</b>、<b>音量</b>。</li></ul>
<p>出発点となる彼のミックス：</p>
<ul><li><b>キックは最大</b>に。すべてを支えるから。</li>
<li>クラップは大きめで、少し片側へ。</li>
<li>オープン・ハットはディケイを短めにして反対側へ置き、バランスを取る。</li>
<li>低いタムは音量を下げる。</li></ul>
<p>キャンの補足：</p>
<ul><li>シンセ・ドラムは、各音を鍵盤全体で音色を変えながら演奏できるので、ドラムマシンよりシンセのほうが演奏しやすい。</li>
<li>オープンとクローズドのハットは同じ系統にすべき。</li>
<li>キックとベース以外の低域はHPでカットする（ミックスのモジュール参照）。</li></ul>`)
      }
    ],
    ex: {
      es: ['Lab Batería, Bombo: llevá el golpe de pitch de 0 a 3 octavas y el tiempo del golpe de 5 ms a 200 ms. ¿En qué punto deja de ser bombo y se vuelve syn drum?', 'Suavizá el bombo como propone Cann: ataque ~10 ms y más decay. Después endurecelo con más hold. ¿Cuál encaja mejor en el groove?', 'Caja: bajá el ruido a 0 y escuchá solo el cuerpo. Después subí la resonancia del ruido y movelo entre 1 y 4 kHz.', 'Palmas: compará la velocidad de impactos a 10, 40 y 100 Hz. ¿Cuándo suena a eco y cuándo a "muchas manos"?', 'Hats: igualá la frecuencia del abierto y del cerrado. Después desafiná solo el abierto: ¿siguen sonando de la misma familia?', 'Activá el Groove y editá un instrumento por vez mientras suena: escuchá cómo cambia el todo y no solo la pieza.'],
      en: ['Drum lab, Kick: take the pitch hit from 0 to 3 octaves and the hit time from 5 ms to 200 ms. At what point does it stop being a kick and become a syn drum?', 'Soften the kick as Cann suggests: attack ~10 ms and more decay. Then harden it with more hold. Which fits the groove better?', 'Snare: bring the noise to 0 and hear only the body. Then raise the noise resonance and move it between 1 and 4 kHz.', 'Clap: compare burst rates of 10, 40 and 100 Hz. When does it sound like an echo, and when like "many hands"?', 'Hats: match the frequency of the open and closed hats. Then detune only the open one: do they still sound like the same family?', 'Start the Groove and edit one instrument at a time while it plays: hear how the whole changes, not just the piece.'],
      de: ['Drum-Labor, Bassdrum: Pitch-Schlag von 0 bis 3 Oktaven und Schlagzeit von 5 ms bis 200 ms verändern. Ab wann ist es keine Bassdrum mehr, sondern ein Syndrum?', 'Die Bassdrum wie bei Cann weicher machen: Attack ~10 ms und mehr Decay. Dann mit mehr Hold härter machen. Was passt besser in den Groove?', 'Snare: Rauschen auf 0 und nur den Körper hören. Dann die Rauschresonanz erhöhen und zwischen 1 und 4 kHz verschieben.', 'Clap: Impulsraten von 10, 40 und 100 Hz vergleichen. Wann klingt es wie ein Echo, wann wie „viele Hände"?', 'Hats: Frequenz von offener und geschlossener Hi-Hat angleichen. Dann nur die offene verstimmen: Klingen sie noch nach derselben Familie?', 'Den Groove starten und während er läuft ein Instrument nach dem anderen bearbeiten: Hören, wie sich das Ganze ändert, nicht nur das Einzelteil.'],
      ja: ['ドラム・ラボ、キック：ピッチ・ヒットを0〜3オクターブ、ヒット時間を5〜200 msで動かす。どこでキックでなくなり、シンドラムになる？', 'キャンの提案どおりキックを柔らかくする：アタック約10 ms、ディケイを長く。次にホールドを増やして硬くする。グルーヴに合うのはどちら？', 'スネア：ノイズを0にしてボディだけを聴く。次にノイズのレゾナンスを上げ、1〜4 kHzの間で動かす。', 'クラップ：バースト速度を10、40、100 Hzで比べる。いつエコーに聞こえ、いつ「大勢の手」に聞こえる？', 'ハット：オープンとクローズドの周波数を揃える。次にオープンだけをずらす。まだ同じ系統に聞こえる？', 'グルーヴを再生し、鳴らしながら楽器を1つずつ編集する。部分だけでなく全体がどう変わるかを聴く。']
    },
    deep: {
      es: `<h3>Por qué un parche suena inarmónico</h3>
<p>Una cuerda vibra en múltiplos enteros de su fundamental. Una <b>membrana circular</b>, en cambio, vibra en modos con relaciones de aproximadamente 1 : 1,59 : 2,14 : 2,30 : 2,65… Esos modos inarmónicos hacen que un tambor no tenga una "nota" clara. Por eso un seno solo (o un seno con un segundo seno a una relación no entera, como en la caja de Cann) ya suena a parche.</p>
<h3>La TR-808 por dentro</h3>
<ul><li><b>Bombo</b>: un filtro resonante (bridged-T) que "suena" al recibir un pulso; el decay se ajusta con la realimentación.</li>
<li><b>Hi-hats y platillos</b>: seis osciladores cuadrados a frecuencias inarmónicas, mezclados y pasados por pasa banda y pasa altos. Ese es el origen del timbre "metálico".</li>
<li><b>Cencerro</b>: dos cuadradas (~540 y ~800 Hz) por un pasa banda.</li></ul>
<p>La <b>909</b> mezcló síntesis analógica (bombo, caja, toms) con samples digitales para hats y platillos.</p>
<h3>Por qué la envolvente de pitch es exponencial</h3>
<p>Percibimos la altura en escala logarítmica. Una caída exponencial de frecuencia se oye como un descenso parejo en semitonos por unidad de tiempo, y suena natural. Una caída lineal se oye "frenada" al final. El parche real también afloja su tensión de manera aproximadamente exponencial después del golpe.</p>`,
      en: `<h3>Why a drumhead sounds inharmonic</h3>
<p>A string vibrates at integer multiples of its fundamental. A <b>circular membrane</b>, however, vibrates in modes at ratios of roughly 1 : 1.59 : 2.14 : 2.30 : 2.65… Those inharmonic modes are why a drum has no clear "note". That's why a single sine (or a sine with a second sine at a non-integer ratio, as in Cann's snare) already sounds like a drumhead.</p>
<h3>Inside the TR-808</h3>
<ul><li><b>Kick</b>: a resonant (bridged-T) filter that "rings" when it receives a pulse; decay is set by its feedback.</li>
<li><b>Hi-hats and cymbals</b>: six square oscillators at inharmonic frequencies, mixed and passed through band-pass and high-pass filters. That's the origin of the "metallic" timbre.</li>
<li><b>Cowbell</b>: two squares (~540 and ~800 Hz) through a band-pass.</li></ul>
<p>The <b>909</b> mixed analogue synthesis (kick, snare, toms) with digital samples for hats and cymbals.</p>
<h3>Why the pitch envelope is exponential</h3>
<p>We perceive pitch on a logarithmic scale. An exponential frequency drop is heard as an even descent in semitones per unit of time, and sounds natural. A linear drop sounds as if it "brakes" at the end. A real drumhead also loses tension roughly exponentially after the hit.</p>`,
      de: `<h3>Warum ein Fell unharmonisch klingt</h3>
<p>Eine Saite schwingt in ganzzahligen Vielfachen ihres Grundtons. Eine <b>kreisförmige Membran</b> schwingt dagegen in Moden mit Verhältnissen von etwa 1 : 1,59 : 2,14 : 2,30 : 2,65… Diese unharmonischen Moden sind der Grund, warum eine Trommel keinen klaren „Ton" hat. Deshalb klingt schon ein einzelner Sinus (oder ein Sinus mit einem zweiten in nicht ganzzahligem Verhältnis, wie in Canns Snare) nach Fell.</p>
<h3>Die TR-808 von innen</h3>
<ul><li><b>Bassdrum</b>: ein resonanter Filter (Bridged-T), der bei einem Impuls „klingt"; der Decay wird über die Rückkopplung eingestellt.</li>
<li><b>Hi-Hats und Becken</b>: sechs Rechteckoszillatoren auf unharmonischen Frequenzen, gemischt und durch Band- und Hochpass geschickt. Das ist der Ursprung des „metallischen" Klangs.</li>
<li><b>Kuhglocke</b>: zwei Rechtecke (~540 und ~800 Hz) durch einen Bandpass.</li></ul>
<p>Die <b>909</b> kombinierte analoge Synthese (Bassdrum, Snare, Toms) mit digitalen Samples für Hi-Hats und Becken.</p>
<h3>Warum die Pitch-Hüllkurve exponentiell ist</h3>
<p>Wir nehmen Tonhöhe logarithmisch wahr. Ein exponentieller Frequenzabfall klingt wie ein gleichmäßiger Abstieg in Halbtönen pro Zeiteinheit und wirkt natürlich. Ein linearer Abfall klingt, als würde er am Ende „bremsen". Auch ein echtes Fell verliert nach dem Schlag etwa exponentiell an Spannung.</p>`,
      ja: `<h3>ドラムヘッドが非調和に聞こえる理由</h3>
<p>弦は基音の整数倍で振動します。しかし<b>円形の膜</b>は、およそ1 : 1.59 : 2.14 : 2.30 : 2.65…の比のモードで振動します。この非調和なモードのせいで、太鼓にははっきりした「音程」がありません。だからサイン波1つ（またはキャンのスネアのように、非整数比の2つ目のサイン波を加えたもの）だけでも太鼓らしく聞こえるのです。</p>
<h3>TR-808の内部</h3>
<ul><li><b>キック</b>：パルスを受けると「鳴る」レゾナント・フィルター（ブリッジドT型）。ディケイはフィードバック量で調整する。</li>
<li><b>ハイハットとシンバル</b>：非調和な周波数の矩形波オシレーター6つを混ぜ、バンドパスとハイパスに通す。これが「金属的」な音色の源。</li>
<li><b>カウベル</b>：矩形波2つ（約540 Hzと約800 Hz）をバンドパスに通す。</li></ul>
<p><b>909</b>はアナログ合成（キック、スネア、タム）と、ハイハットとシンバル用のデジタル・サンプルを組み合わせました。</p>
<h3>ピッチ・エンベロープが指数カーブである理由</h3>
<p>私たちは音程を対数スケールで知覚します。周波数の指数的な下降は、単位時間あたり一定の半音数で下がるように聞こえ、自然に響きます。直線的な下降は最後に「ブレーキがかかる」ように聞こえます。本物のドラムヘッドも、打撃後はほぼ指数的に張力を失います。</p>`
    },
    read: ['Simon Cann — <i>How To Make A Noise</i>, Refill #3 "Synthetic Drums and Percussion"', 'Ashley Hewitt — <i>How To Program Any Synthesizer</i>, cap. 23', 'Dean Friedman — <i>Synthesizer Basics</i>, ejercicio 32', 'Gordon Reid — serie "Synth Secrets" sobre percusión analógica (Sound On Sound)'],
    quiz: [
      Q(T('¿Qué produce el "golpe del mazo" en un bombo sintético?', 'What produces the "beater hit" in a synthetic kick?', 'Was erzeugt den „Schlägel" bei einer synthetischen Bassdrum?', 'シンセ・キックの「ビーターの打撃」を生むのは？'),
        T(['Una envolvente de pitch muy rápida', 'La reverb', 'El chorus', 'Un LFO lento'], ['A very fast pitch envelope', 'Reverb', 'Chorus', 'A slow LFO'], ['Eine sehr schnelle Pitch-Hüllkurve', 'Hall', 'Chorus', 'Ein langsamer LFO'], ['とても速いピッチ・エンベロープ', 'リバーブ', 'コーラス', '遅いLFO']), 0,
        T('El seno arranca agudo y cae en unos 30 ms.', 'The sine starts high and falls in about 30 ms.', 'Der Sinus startet hoch und fällt in etwa 30 ms.', 'サイン波は高い音で始まり、約30 msで下がる。')),
      Q(T('Si la envolvente de pitch dura ~0,8 s…', 'If the pitch envelope lasts ~0.8 s…', 'Dauert die Pitch-Hüllkurve ~0,8 s…', 'ピッチ・エンベロープが約0.8秒だと…'),
        T(['Se oye la caída: es un syn drum', 'Desaparece el sonido', 'Suena a hi-hat', 'No cambia nada'], ['You hear the drop: it\'s a syn drum', 'The sound disappears', 'It sounds like a hi-hat', 'Nothing changes'], ['Man hört das Abfallen: ein Syndrum', 'Der Klang verschwindet', 'Es klingt wie eine Hi-Hat', 'Nichts ändert sich'], ['下降が聞こえる：シンドラムになる', '音が消える', 'ハイハットのように聞こえる', '何も変わらない']), 0,
        T('Corta da impacto (bombo); lenta deja oír la caída (syn drum).', 'Short gives impact (kick); slow lets you hear the drop (syn drum).', 'Kurz gibt Wucht (Bassdrum); langsam lässt das Abfallen hören (Syndrum).', '短いとインパクト（キック）、遅いと下降が聞こえる（シンドラム）。')),
      Q(T('¿Cuál es la base de un hi-hat sintético?', 'What is the basis of a synthetic hi-hat?', 'Was ist die Basis einer synthetischen Hi-Hat?', 'シンセ・ハイハットの基本は？'),
        T(['Un seno grave', 'Ruido filtrado con decay corto', 'Una cuadrada sin filtro', 'FM 1:1'], ['A low sine', 'Filtered noise with a short decay', 'An unfiltered square', '1:1 FM'], ['Ein tiefer Sinus', 'Gefiltertes Rauschen mit kurzem Decay', 'Ein ungefiltertes Rechteck', 'FM 1:1'], ['低いサイン波', '短いディケイのフィルターしたノイズ', 'フィルターなしの矩形波', '1:1のFM']), 1,
        T('El abierto es igual pero con decay largo.', 'The open hat is the same with a long decay.', 'Die offene Hi-Hat ist gleich, nur mit langem Decay.', 'オープン・ハットは同じものにディケイを長くしただけ。')),
      Q(T('Para palmas de "muchas personas", Cann usa…', 'For "many people" claps, Cann uses…', 'Für Claps von „vielen Leuten" nutzt Cann…', '「大勢」のクラップのためにキャンが使うのは？'),
        T(['Chorus', 'Un LFO de pulso rápido sobre el nivel del ruido', 'Una reverb larga', 'Pitch bend'], ['Chorus', 'A fast pulse LFO on the noise level', 'A long reverb', 'Pitch bend'], ['Chorus', 'Einen schnellen Puls-LFO auf dem Rauschpegel', 'Langen Hall', 'Pitchbend'], ['コーラス', 'ノイズのレベルへの速いパルスLFO', '長いリバーブ', 'ピッチベンド']), 1,
        T('Aplaudir juntos son impactos muy cercanos, no un coro desafinado.', 'Clapping together means very close impacts, not a detuned chorus.', 'Gemeinsames Klatschen sind dicht folgende Impulse, kein verstimmter Chorus.', '一斉の拍手はごく近接した打撃であって、デチューンしたコーラスではない。')),
      Q(T('El cencerro sintético clásico usa…', 'The classic synthetic cowbell uses…', 'Die klassische synthetische Kuhglocke nutzt…', '古典的なシンセ・カウベルが使うのは？'),
        T(['Dos ondas cuadradas filtradas', 'Ruido blanco', 'Un solo seno', 'FM 1:7'], ['Two filtered square waves', 'White noise', 'A single sine', '1:7 FM'], ['Zwei gefilterte Rechteckwellen', 'Weißes Rauschen', 'Einen einzelnen Sinus', 'FM 1:7'], ['フィルターした矩形波2つ', 'ホワイトノイズ', 'サイン波1つ', '1:7のFM']), 0,
        T('Relación ≈ 1,5 entre ambas, como en la 808 (540 y 800 Hz).', 'A ratio ≈ 1.5 between them, as in the 808 (540 and 800 Hz).', 'Verhältnis ≈ 1,5, wie bei der 808 (540 und 800 Hz).', '比は約1.5で、808（540 Hzと800 Hz）と同じ。')),
      Q(T('Según Hewitt, en la mezcla de batería, ¿qué elemento sostiene todo?', 'According to Hewitt, which element holds up the drum mix?', 'Welches Element trägt laut Hewitt den Drum-Mix?', 'ヒューイットによれば、ドラム・ミックスを支える要素は？'),
        T(['El bombo al máximo', 'El hi-hat', 'Las palmas', 'Los toms'], ['The kick at full', 'The hi-hat', 'The claps', 'The toms'], ['Die Bassdrum ganz auf', 'Die Hi-Hat', 'Die Claps', 'Die Toms'], ['最大音量のキック', 'ハイハット', 'クラップ', 'タム']), 0,
        T('El resto se balancea alrededor del bombo.', 'Everything else is balanced around the kick.', 'Alles andere wird um die Bassdrum herum ausbalanciert.', '他はすべてキックを中心にバランスを取る。'))
    ]
  });
})();
