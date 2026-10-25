/* Contenido del curso — Nivel 1: fundamentos (módulos 1–4) */
window.COURSE = window.COURSE || [];
(function () {
  const M = m => window.COURSE.push(m);

  /* ===================== 1. FÍSICA DEL SONIDO ===================== */
  M({
    id: 'sound', lv: 1, lab: ['tone', 'waves'],
    title: { es: 'El sonido: física y percepción', en: 'Sound: physics and perception', de: 'Schall: Physik und Wahrnehmung', ja: '音：物理と知覚' },
    sum: { es: 'Qué es una onda, frecuencia, amplitud, fase, decibeles y cómo el oído convierte todo eso en altura, volumen y timbre.', en: 'What a wave is, frequency, amplitude, phase, decibels, and how the ear turns all that into pitch, loudness and timbre.', de: 'Was eine Welle ist, Frequenz, Amplitude, Phase, Dezibel – und wie das Ohr daraus Tonhöhe, Lautheit und Klangfarbe macht.', ja: '波とは何か、周波数・振幅・位相・デシベル、そして耳がそれを音高・音量・音色に変える仕組み。' },
    key: {
      es: ['El sonido es una <b>variación de presión</b> que se propaga (≈343 m/s en el aire).', '<b>Frecuencia</b> (Hz) → percibimos <b>altura</b>; duplicarla sube una <b>octava</b>.', '<b>Amplitud</b> → percibimos <b>sonoridad</b>, que medimos en <b>decibeles</b> (escala logarítmica).', 'El <b>timbre</b> depende del <b>espectro</b> (qué armónicos hay) y de cómo cambia en el tiempo.', 'La <b>fase</b> no se oye en una onda sola, pero es decisiva cuando se suman dos señales.'],
      en: ['Sound is a <b>pressure variation</b> that propagates (≈343 m/s in air).', '<b>Frequency</b> (Hz) → we perceive <b>pitch</b>; doubling it raises one <b>octave</b>.', '<b>Amplitude</b> → we perceive <b>loudness</b>, measured in <b>decibels</b> (a logarithmic scale).', '<b>Timbre</b> depends on the <b>spectrum</b> (which harmonics are present) and how it changes over time.', '<b>Phase</b> is inaudible in a single wave but crucial when two signals are summed.'],
      de: ['Schall ist eine sich ausbreitende <b>Druckschwankung</b> (≈343 m/s in Luft).', '<b>Frequenz</b> (Hz) → wir hören <b>Tonhöhe</b>; Verdopplung = eine <b>Oktave</b> höher.', '<b>Amplitude</b> → wir hören <b>Lautheit</b>, gemessen in <b>Dezibel</b> (logarithmisch).', 'Die <b>Klangfarbe</b> hängt vom <b>Spektrum</b> ab (welche Obertöne) und von dessen zeitlicher Entwicklung.', 'Die <b>Phase</b> hört man bei einer einzelnen Welle nicht – beim Summieren zweier Signale ist sie entscheidend.'],
      ja: ['音とは伝わっていく<b>圧力の変化</b>（空気中で約343 m/s）。', '<b>周波数</b>（Hz）→<b>音高</b>として知覚。2倍で<b>1オクターブ</b>上がる。', '<b>振幅</b>→<b>音の大きさ</b>として知覚し、<b>デシベル</b>（対数尺度）で測る。', '<b>音色</b>は<b>スペクトル</b>（どの倍音があるか）とその時間変化で決まる。', '<b>位相</b>は単独の波では聞こえないが、2つの信号を足すときに決定的になる。']
    },
    sec: [
      {
        h: { es: 'Una onda de presión', en: 'A pressure wave', de: 'Eine Druckwelle', ja: '圧力の波' },
        b: {
          es: `<p>Cuando una cuerda, un parlante o tus cuerdas vocales vibran, empujan y tiran de las moléculas de aire. Se forman zonas de <b>compresión</b> (más presión) y <b>rarefacción</b> (menos presión) que viajan a unos <b>343 m/s</b> a 20 °C. El aire no viaja: viaja la <i>perturbación</i>. Un micrófono convierte esa presión en voltaje, y un sintetizador hace el camino inverso: genera un voltaje (o una secuencia de números) que el parlante convierte en presión.</p>
<p>Si graficamos la presión en un punto a lo largo del tiempo obtenemos la <b>forma de onda</b>. La más simple es la <b>senoidal</b>: el movimiento de un péndulo ideal o de un punto que gira en un círculo visto de costado.</p>
<span class="formula">x(t) = A · sin(2π · f · t + φ)</span>
<p>Tres parámetros la describen por completo: <b>A</b> (amplitud), <b>f</b> (frecuencia) y <b>φ</b> (fase inicial).</p>`,
          en: `<p>When a string, a speaker cone or your vocal folds vibrate, they push and pull air molecules. Regions of <b>compression</b> (higher pressure) and <b>rarefaction</b> (lower pressure) travel at about <b>343 m/s</b> at 20 °C. The air itself doesn't travel: the <i>disturbance</i> does. A microphone turns that pressure into voltage; a synthesizer does the reverse: it generates a voltage (or a stream of numbers) that a speaker turns into pressure.</p>
<p>Plotting the pressure at one point over time gives the <b>waveform</b>. The simplest is the <b>sine wave</b>: the motion of an ideal pendulum, or a point rotating on a circle seen from the side.</p>
<span class="formula">x(t) = A · sin(2π · f · t + φ)</span>
<p>Three parameters describe it completely: <b>A</b> (amplitude), <b>f</b> (frequency) and <b>φ</b> (initial phase).</p>`,
          de: `<p>Wenn eine Saite, eine Lautsprechermembran oder deine Stimmlippen schwingen, schieben und ziehen sie Luftmoleküle. Es entstehen Zonen der <b>Verdichtung</b> und <b>Verdünnung</b>, die sich bei 20 °C mit etwa <b>343 m/s</b> ausbreiten. Nicht die Luft wandert, sondern die <i>Störung</i>. Ein Mikrofon wandelt Druck in Spannung; ein Synthesizer macht das Umgekehrte: Er erzeugt eine Spannung (oder Zahlenfolge), die der Lautsprecher in Druck verwandelt.</p>
<p>Trägt man den Druck an einem Punkt über die Zeit auf, erhält man die <b>Wellenform</b>. Die einfachste ist die <b>Sinuswelle</b>: die Bewegung eines idealen Pendels oder eines Punktes auf einem Kreis, von der Seite betrachtet.</p>
<span class="formula">x(t) = A · sin(2π · f · t + φ)</span>
<p>Drei Parameter beschreiben sie vollständig: <b>A</b> (Amplitude), <b>f</b> (Frequenz) und <b>φ</b> (Anfangsphase).</p>`,
          ja: `<p>弦やスピーカーのコーン、声帯が振動すると空気の分子を押したり引いたりします。<b>圧縮</b>（高圧）と<b>希薄</b>（低圧）の領域ができ、20℃で約<b>343 m/s</b>で伝わります。空気そのものが移動するのではなく、<i>乱れ</i>が伝わるのです。マイクは圧力を電圧に変え、シンセサイザーはその逆に、電圧（または数値の列）を作ってスピーカーが圧力に変えます。</p>
<p>ある一点の圧力を時間に沿ってグラフにすると<b>波形</b>になります。最も単純なのは<b>サイン波</b>：理想的な振り子の運動、または円周上を回る点を横から見た動きです。</p>
<span class="formula">x(t) = A · sin(2π · f · t + φ)</span>
<p>3つのパラメーターで完全に記述できます：<b>A</b>（振幅）、<b>f</b>（周波数）、<b>φ</b>（初期位相）。</p>`
        }
      },
      {
        h: { es: 'Frecuencia, período y altura', en: 'Frequency, period and pitch', de: 'Frequenz, Periode und Tonhöhe', ja: '周波数・周期・音高' },
        b: {
          es: `<p>La <b>frecuencia</b> es la cantidad de ciclos por segundo (hercios, Hz). El <b>período</b> es su inverso: <code>T = 1/f</code>. Un La de 440 Hz repite su forma cada 2,27 ms. La <b>longitud de onda</b> es <code>λ = c/f</code>: ese mismo La mide 78 cm en el aire; un bajo de 40 Hz, ¡más de 8 metros! Por eso los graves atraviesan paredes y son difíciles de controlar en una sala.</p>
<p>El oído humano percibe aproximadamente de <b>20 Hz a 20 kHz</b> (el límite superior baja con la edad). Nuestra percepción de altura es <b>logarítmica</b>: cada vez que la frecuencia se duplica escuchamos "la misma nota" una <b>octava</b> más arriba. En el temperamento igual de 12 notas, cada semitono multiplica la frecuencia por <code>2^(1/12) ≈ 1,0595</code>.</p>
<span class="formula">f = 440 · 2^((n − 69) / 12)    (n = número de nota MIDI)</span>
<p>Un <b>cent</b> es 1/100 de semitono. Diferencias de 5–10 cents ya se notan entre dos tonos simultáneos; los sintetizadores usan cents para <b>desafinar</b> osciladores y engordar el sonido.</p>
<div class="tip">En el laboratorio, mové la frecuencia y observá cómo el osciloscopio comprime los ciclos y cómo el pico del espectro se desplaza a la derecha.</div>`,
          en: `<p><b>Frequency</b> is the number of cycles per second (hertz, Hz). The <b>period</b> is its inverse: <code>T = 1/f</code>. An A at 440 Hz repeats every 2.27 ms. The <b>wavelength</b> is <code>λ = c/f</code>: that A is 78 cm long in air; a 40 Hz bass note is over 8 metres! That is why bass passes through walls and is hard to control in a room.</p>
<p>Human hearing spans roughly <b>20 Hz to 20 kHz</b> (the upper limit drops with age). Pitch perception is <b>logarithmic</b>: each doubling of frequency sounds like "the same note" one <b>octave</b> higher. In 12-tone equal temperament each semitone multiplies the frequency by <code>2^(1/12) ≈ 1.0595</code>.</p>
<span class="formula">f = 440 · 2^((n − 69) / 12)    (n = MIDI note number)</span>
<p>A <b>cent</b> is 1/100 of a semitone. Differences of 5–10 cents are audible between two simultaneous tones; synths use cents to <b>detune</b> oscillators and thicken the sound.</p>
<div class="tip">In the lab, move the frequency and watch the oscilloscope compress the cycles while the spectrum peak moves right.</div>`,
          de: `<p>Die <b>Frequenz</b> ist die Anzahl der Schwingungen pro Sekunde (Hertz, Hz). Die <b>Periode</b> ist ihr Kehrwert: <code>T = 1/f</code>. Ein A mit 440 Hz wiederholt sich alle 2,27 ms. Die <b>Wellenlänge</b> ist <code>λ = c/f</code>: Dieses A ist in Luft 78 cm lang, ein 40-Hz-Bass über 8 Meter! Deshalb dringen Bässe durch Wände und sind im Raum schwer zu kontrollieren.</p>
<p>Das menschliche Gehör reicht etwa von <b>20 Hz bis 20 kHz</b> (die Obergrenze sinkt mit dem Alter). Tonhöhenwahrnehmung ist <b>logarithmisch</b>: Jede Verdopplung klingt wie „derselbe Ton" eine <b>Oktave</b> höher. In der gleichstufigen Stimmung multipliziert jeder Halbton die Frequenz mit <code>2^(1/12) ≈ 1,0595</code>.</p>
<span class="formula">f = 440 · 2^((n − 69) / 12)    (n = MIDI-Notennummer)</span>
<p>Ein <b>Cent</b> ist 1/100 Halbton. 5–10 Cent Unterschied hört man zwischen zwei gleichzeitigen Tönen; Synthesizer nutzen Cents zum <b>Verstimmen</b> von Oszillatoren, um den Klang anzudicken.</p>
<div class="tip">Verändere im Labor die Frequenz und beobachte, wie das Oszilloskop die Zyklen staucht und die Spektralspitze nach rechts wandert.</div>`,
          ja: `<p><b>周波数</b>は1秒あたりの振動回数（ヘルツ、Hz）。<b>周期</b>はその逆数：<code>T = 1/f</code>。440 HzのAは2.27 msごとに繰り返します。<b>波長</b>は<code>λ = c/f</code>：このAは空気中で78 cm、40 Hzのベースは8 m以上！だから低音は壁を通り抜け、部屋で制御しにくいのです。</p>
<p>人の聴覚はおよそ<b>20 Hz〜20 kHz</b>（上限は加齢で下がる）。音高の知覚は<b>対数的</b>で、周波数が2倍になるたびに「同じ音」が<b>1オクターブ</b>上に聞こえます。12平均律では半音ごとに周波数が<code>2^(1/12) ≈ 1.0595</code>倍になります。</p>
<span class="formula">f = 440 · 2^((n − 69) / 12)    （n = MIDIノート番号）</span>
<p><b>セント</b>は半音の1/100。同時に鳴る2音では5〜10セントの差でも聞き取れます。シンセはセント単位でオシレーターを<b>デチューン</b>し、音を太くします。</p>
<div class="tip">ラボで周波数を動かし、オシロスコープの波が詰まり、スペクトルのピークが右へ動くのを観察しよう。</div>`
        }
      },
      {
        h: { es: 'Amplitud y decibeles', en: 'Amplitude and decibels', de: 'Amplitude und Dezibel', ja: '振幅とデシベル' },
        b: {
          es: `<p>La <b>amplitud</b> es la magnitud de la variación de presión. El oído cubre un rango enorme (de un susurro al umbral de dolor hay un factor de un millón en presión), por eso usamos <b>decibeles</b>, una escala logarítmica relativa:</p>
<span class="formula">dB = 20 · log10(A / A_ref)</span>
<ul><li>×2 de amplitud ≈ <b>+6 dB</b>; ×0,5 ≈ <b>−6 dB</b>.</li><li>×10 de amplitud = +20 dB.</li><li>Sumar dos señales idénticas en fase da +6 dB; dos señales no correlacionadas (por ej. dos ruidos) suman ≈ +3 dB.</li></ul>
<p>En audio digital se usa <b>dBFS</b> (decibeles relativos a "full scale"): 0 dBFS es el máximo antes del recorte; todo lo demás es negativo. Ojo: la <b>sonoridad percibida</b> no es igual a la amplitud: depende de la frecuencia (curvas de Fletcher-Munson / ISO 226). Somos más sensibles entre 2 y 5 kHz y mucho menos en graves a bajo volumen.</p>`,
          en: `<p><b>Amplitude</b> is the size of the pressure variation. The ear covers a huge range (from a whisper to the threshold of pain the pressure grows a million times), so we use <b>decibels</b>, a relative logarithmic scale:</p>
<span class="formula">dB = 20 · log10(A / A_ref)</span>
<ul><li>×2 amplitude ≈ <b>+6 dB</b>; ×0.5 ≈ <b>−6 dB</b>.</li><li>×10 amplitude = +20 dB.</li><li>Summing two identical in-phase signals gives +6 dB; two uncorrelated signals (e.g. two noises) sum to ≈ +3 dB.</li></ul>
<p>Digital audio uses <b>dBFS</b> (decibels relative to full scale): 0 dBFS is the maximum before clipping; everything else is negative. Note that <b>perceived loudness</b> is not the same as amplitude: it depends on frequency (Fletcher-Munson / ISO 226 curves). We are most sensitive between 2 and 5 kHz and far less to bass at low levels.</p>`,
          de: `<p>Die <b>Amplitude</b> ist die Größe der Druckschwankung. Das Ohr deckt einen riesigen Bereich ab (vom Flüstern bis zur Schmerzgrenze steigt der Druck um das Millionenfache), daher nutzen wir <b>Dezibel</b>, eine relative logarithmische Skala:</p>
<span class="formula">dB = 20 · log10(A / A_ref)</span>
<ul><li>×2 Amplitude ≈ <b>+6 dB</b>; ×0,5 ≈ <b>−6 dB</b>.</li><li>×10 Amplitude = +20 dB.</li><li>Zwei identische phasengleiche Signale ergeben +6 dB; zwei unkorrelierte (z. B. zwei Rauschsignale) ≈ +3 dB.</li></ul>
<p>Digitales Audio nutzt <b>dBFS</b> (relativ zu „Full Scale"): 0 dBFS ist das Maximum vor dem Clipping, alles andere ist negativ. Achtung: <b>wahrgenommene Lautheit</b> ist nicht gleich Amplitude, sie hängt von der Frequenz ab (Fletcher-Munson-/ISO-226-Kurven). Am empfindlichsten sind wir zwischen 2 und 5 kHz, bei Bässen in leiser Lautstärke viel weniger.</p>`,
          ja: `<p><b>振幅</b>は圧力変化の大きさです。耳はとても広い範囲をカバーする（ささやき声から痛覚閾値まで圧力は100万倍）ので、相対的な対数尺度である<b>デシベル</b>を使います：</p>
<span class="formula">dB = 20 · log10(A / A_ref)</span>
<ul><li>振幅×2 ≈ <b>+6 dB</b>、×0.5 ≈ <b>−6 dB</b>。</li><li>振幅×10 = +20 dB。</li><li>同相の同一信号を足すと+6 dB、無相関の2信号（例：2つのノイズ）は約+3 dB。</li></ul>
<p>デジタル音声では<b>dBFS</b>（フルスケール基準）を使い、0 dBFSがクリップ直前の最大値で、それ以外は負の値です。注意：<b>知覚される音量</b>は振幅と同じではなく、周波数に依存します（フレッチャー・マンソン／ISO 226の等ラウドネス曲線）。2〜5 kHzに最も敏感で、小音量の低音にはずっと鈍感です。</p>`
        }
      },
      {
        h: { es: 'Fase, interferencia y batidos', en: 'Phase, interference and beating', de: 'Phase, Interferenz und Schwebung', ja: '位相・干渉・うなり' },
        b: {
          es: `<p>La <b>fase</b> indica en qué punto del ciclo está la onda (0–360°). Una sola onda suena igual con cualquier fase, pero al <b>sumar</b> ondas:</p>
<ul><li><b>En fase</b> (0°): se refuerzan (+6 dB).</li><li><b>En contrafase</b> (180°): se cancelan. Esto ocurre con micrófonos mal ubicados, cables con polaridad invertida o graves en estéreo ancho.</li><li><b>Frecuencias levemente distintas</b>: la fase relativa gira continuamente y la amplitud sube y baja: son los <b>batidos</b>, a una frecuencia igual a la diferencia <code>|f1 − f2|</code>. Los afinadores de guitarra de oído usan este fenómeno; los sintes lo usan para el "chorus" natural de dos osciladores desafinados.</li></ul>
<div class="tip">Laboratorio: activá el segundo tono con batido 0 Hz e invertí su fase → silencio. Luego subí el batido a 1–3 Hz y escuchá la pulsación.</div>`,
          en: `<p><b>Phase</b> tells where in its cycle the wave is (0–360°). A single wave sounds the same at any phase, but when waves are <b>summed</b>:</p>
<ul><li><b>In phase</b> (0°): they reinforce (+6 dB).</li><li><b>Out of phase</b> (180°): they cancel. This happens with badly placed mics, reversed-polarity cables or bass in wide stereo.</li><li><b>Slightly different frequencies</b>: the relative phase rotates continuously and amplitude rises and falls: these are <b>beats</b>, at a rate equal to the difference <code>|f1 − f2|</code>. Tuning a guitar by ear uses this; synths use it for the natural "chorus" of two detuned oscillators.</li></ul>
<div class="tip">Lab: enable the second tone at 0 Hz beating and invert its phase → silence. Then raise beating to 1–3 Hz and hear the pulsation.</div>`,
          de: `<p>Die <b>Phase</b> gibt an, wo im Zyklus sich die Welle befindet (0–360°). Eine einzelne Welle klingt bei jeder Phase gleich, doch beim <b>Summieren</b>:</p>
<ul><li><b>Gleichphasig</b> (0°): Verstärkung (+6 dB).</li><li><b>Gegenphasig</b> (180°): Auslöschung – passiert bei schlecht platzierten Mikros, verpolten Kabeln oder Bässen in breitem Stereo.</li><li><b>Leicht unterschiedliche Frequenzen</b>: Die relative Phase dreht sich ständig, die Amplitude steigt und fällt: <b>Schwebungen</b> mit der Differenzfrequenz <code>|f1 − f2|</code>. Gitarrenstimmen nach Gehör nutzt das; Synths nutzen es für den natürlichen „Chorus" zweier verstimmter Oszillatoren.</li></ul>
<div class="tip">Labor: Zweiten Ton mit 0 Hz Schwebung aktivieren und Phase umkehren → Stille. Dann Schwebung auf 1–3 Hz erhöhen und das Pulsieren hören.</div>`,
          ja: `<p><b>位相</b>は波が周期のどこにあるかを示します（0〜360°）。単独の波はどの位相でも同じに聞こえますが、波を<b>足す</b>と：</p>
<ul><li><b>同相</b>（0°）：強め合う（+6 dB）。</li><li><b>逆相</b>（180°）：打ち消し合う。マイク配置の失敗、極性が逆のケーブル、広すぎるステレオの低音で起こります。</li><li><b>わずかに違う周波数</b>：相対位相が回り続け、振幅が上下します。これが<b>うなり</b>で、その速さは差<code>|f1 − f2|</code>に等しい。耳でのギター調律はこれを利用し、シンセは2つのデチューンしたオシレーターの自然な「コーラス」に使います。</li></ul>
<div class="tip">ラボ：第2音をうなり0 Hzで有効にし位相を反転→無音。次にうなりを1〜3 Hzに上げて脈動を聴こう。</div>`
        }
      },
      {
        h: { es: 'Timbre y espectro: la idea de Fourier', en: 'Timbre and spectrum: Fourier\'s idea', de: 'Klangfarbe und Spektrum: Fouriers Idee', ja: '音色とスペクトル：フーリエの発想' },
        b: {
          es: `<p>¿Por qué un La de piano y un La de violín suenan distinto si tienen la misma frecuencia? Por el <b>timbre</b>. Joseph Fourier demostró (1807) que <b>cualquier señal periódica es una suma de senoidales</b> con frecuencias múltiplos enteros de la fundamental: los <b>armónicos</b> o parciales. La receta de amplitudes (y fases) de esos armónicos es el <b>espectro</b>.</p>
<p>El osciloscopio muestra el <b>dominio del tiempo</b>; el analizador de espectro muestra el <b>dominio de la frecuencia</b>. Son dos vistas del mismo sonido. Un diseñador de sonido piensa constantemente en ambas.</p>
<p>Pero el timbre no es estático: el ataque de un piano tiene ruido de martillo y armónicos agudos que mueren rápido; una trompeta "abre" su brillo a medida que crece la intensidad. Por eso en síntesis tan importante como el espectro es <b>la evolución del espectro en el tiempo</b> — y para eso existen las envolventes y la modulación.</p>
<p>Sonidos como campanas o platillos tienen parciales <b>inarmónicos</b> (no múltiplos enteros); el ruido tiene un espectro <b>continuo</b>.</p>`,
          en: `<p>Why does an A on a piano sound different from an A on a violin if the frequency is the same? <b>Timbre</b>. Joseph Fourier showed (1807) that <b>any periodic signal is a sum of sine waves</b> whose frequencies are integer multiples of the fundamental: the <b>harmonics</b> or partials. The recipe of their amplitudes (and phases) is the <b>spectrum</b>.</p>
<p>The oscilloscope shows the <b>time domain</b>; the spectrum analyser shows the <b>frequency domain</b>. They are two views of the same sound. A sound designer constantly thinks in both.</p>
<p>But timbre is not static: a piano attack contains hammer noise and high harmonics that die quickly; a trumpet "opens up" its brightness as it gets louder. That is why in synthesis <b>how the spectrum evolves over time</b> matters as much as the spectrum itself — which is what envelopes and modulation are for.</p>
<p>Sounds like bells or cymbals have <b>inharmonic</b> partials (not integer multiples); noise has a <b>continuous</b> spectrum.</p>`,
          de: `<p>Warum klingt ein A auf dem Klavier anders als auf der Geige, obwohl die Frequenz gleich ist? Wegen der <b>Klangfarbe</b>. Joseph Fourier zeigte (1807), dass <b>jedes periodische Signal eine Summe von Sinuswellen</b> ist, deren Frequenzen ganzzahlige Vielfache des Grundtons sind: die <b>Obertöne</b> oder Teiltöne. Das Rezept ihrer Amplituden (und Phasen) ist das <b>Spektrum</b>.</p>
<p>Das Oszilloskop zeigt den <b>Zeitbereich</b>, der Spektrumanalysator den <b>Frequenzbereich</b> – zwei Ansichten desselben Klangs. Sounddesigner denken ständig in beiden.</p>
<p>Klangfarbe ist aber nicht statisch: Der Klavieranschlag enthält Hammergeräusch und hohe Obertöne, die schnell verklingen; eine Trompete „öffnet" ihre Helligkeit, je lauter sie wird. Darum ist in der Synthese <b>die zeitliche Entwicklung des Spektrums</b> ebenso wichtig wie das Spektrum selbst – dafür gibt es Hüllkurven und Modulation.</p>
<p>Glocken oder Becken haben <b>unharmonische</b> Teiltöne (keine ganzzahligen Vielfachen); Rauschen hat ein <b>kontinuierliches</b> Spektrum.</p>`,
          ja: `<p>同じ周波数なのに、ピアノのAとバイオリンのAはなぜ違って聞こえるのか？それが<b>音色</b>です。ジョゼフ・フーリエは（1807年）<b>あらゆる周期信号はサイン波の和である</b>ことを示しました。その周波数は基音の整数倍で、<b>倍音</b>（部分音）と呼ばれます。その振幅（と位相）のレシピが<b>スペクトル</b>です。</p>
<p>オシロスコープは<b>時間領域</b>を、スペクトラム・アナライザーは<b>周波数領域</b>を示します。同じ音の2つの見方であり、サウンドデザイナーは常に両方で考えます。</p>
<p>しかし音色は静的ではありません。ピアノのアタックにはハンマーのノイズとすぐ消える高次倍音があり、トランペットは強く吹くほど明るさが「開く」。だからシンセシスでは<b>スペクトルの時間的変化</b>がスペクトルそのものと同じくらい重要で、そのためにエンベロープとモジュレーションがあります。</p>
<p>ベルやシンバルは<b>非調和</b>な部分音（整数倍でない）を持ち、ノイズは<b>連続</b>スペクトルを持ちます。</p>`
        }
      }
    ],
    ex: {
      es: ['Con el lab <b>Tono puro</b>, buscá tu límite de audición agudo subiendo la frecuencia a volumen bajo. Anotalo (y repetilo dentro de un año).', 'Calculá la frecuencia de la nota MIDI 57 (A3) y de 60 (C4) con la fórmula. Verificá en el lab tocando esas teclas.', 'Activá el segundo tono, poné el batido en 0 y alterná la inversión de fase. ¿Qué ves en el osciloscopio cuando se cancela?', 'Poné el tono a 50 Hz y luego a 3 kHz con el mismo nivel en dBFS. ¿Cuál parece más fuerte? Relacionalo con las curvas de igual sonoridad.', 'En el lab de <b>Formas de onda</b>, compará el espectro de la senoidal y del diente de sierra a la misma nota.'],
      en: ['With the <b>Pure tone</b> lab, find your upper hearing limit by raising the frequency at low volume. Write it down (and repeat in a year).', 'Compute the frequency of MIDI note 57 (A3) and 60 (C4) with the formula. Verify in the lab by playing those keys.', 'Enable the second tone, set beating to 0 and toggle phase inversion. What does the oscilloscope show when it cancels?', 'Set the tone to 50 Hz and then 3 kHz at the same dBFS. Which seems louder? Relate it to equal-loudness curves.', 'In the <b>Waveforms</b> lab, compare the spectrum of the sine and sawtooth at the same note.'],
      de: ['Finde im Labor <b>Reiner Ton</b> deine obere Hörgrenze, indem du die Frequenz bei geringer Lautstärke erhöhst. Notiere sie (und wiederhole es in einem Jahr).', 'Berechne die Frequenz der MIDI-Noten 57 (A3) und 60 (C4) mit der Formel und prüfe sie im Labor.', 'Aktiviere den zweiten Ton, Schwebung 0, und schalte die Phasenumkehr um. Was zeigt das Oszilloskop bei Auslöschung?', 'Stelle den Ton auf 50 Hz und dann auf 3 kHz bei gleichem dBFS. Was wirkt lauter? Bezug zu den Kurven gleicher Lautstärke?', 'Vergleiche im Labor <b>Wellenformen</b> das Spektrum von Sinus und Sägezahn auf derselben Note.'],
      ja: ['<b>純音</b>ラボで、小音量のまま周波数を上げて自分の高域の可聴限界を探し、記録しよう（1年後にもう一度）。', '公式でMIDIノート57（A3）と60（C4）の周波数を計算し、ラボでその鍵盤を弾いて確認しよう。', '第2音を有効にし、うなりを0にして位相反転を切り替える。打ち消し合うときオシロスコープには何が見える？', '同じdBFSで50 Hzと3 kHzを鳴らす。どちらが大きく感じる？等ラウドネス曲線と関連づけよう。', '<b>波形</b>ラボで、同じ音程のサイン波とノコギリ波のスペクトルを比べよう。']
    },
    deep: {
      es: `<h3>Psicoacústica esencial para sintesistas</h3>
<p><b>Bandas críticas.</b> La cóclea funciona como un banco de unos 24 filtros superpuestos (escala Bark). Dos tonos dentro de la misma banda crítica producen <i>aspereza</i> (roughness), máxima cuando están separados ~1/4 de banda crítica. Esto explica por qué los intervalos pequeños en el registro grave suenan "barrosos": las bandas críticas son anchas en Hz en esa zona relativa a la separación de las notas.</p>
<p><b>Enmascaramiento.</b> Un sonido fuerte oculta sonidos más débiles de frecuencia cercana (más hacia arriba que hacia abajo). En mezcla y diseño sonoro, esto decide si un detalle se escucha o no. Los códecs MP3/AAC se basan en eso.</p>
<p><b>Fundamental ausente.</b> Si un sonido tiene armónicos 2, 3, 4, 5… de 100 Hz pero no tiene 100 Hz, igual percibimos altura de 100 Hz. Los parlantes de celular reproducen bajos así. Truco de diseño: agregar saturación a un bajo para que genere armónicos y "se escuche" en parlantes pequeños.</p>
<p><b>Efecto de precedencia (Haas).</b> Si el mismo sonido llega a ambos oídos con 1–30 ms de diferencia, lo localizamos en el lado del que llega primero y no oímos eco. Base de muchos ensanchadores estéreo.</p>
<p><b>Resolución temporal.</b> Eventos separados por menos de ~20–50 ms se funden; por eso un tren de clics a más de ~20 Hz empieza a sonar como un tono (relevante en síntesis granular y en LFOs que pasan a frecuencias de audio).</p>
<h3>La serie armónica y la música</h3>
<p>Los armónicos 1, 2, 3, 4, 5, 6 de C2 son C2, C3, G3, C4, E4, G4: la serie armónica contiene la octava, la quinta y la tercera mayor. La afinación justa usa estas razones exactas (3/2, 5/4); el temperamento igual las aproxima (la tercera mayor temperada está 14 cents por encima de 5/4). Al sintetizar acordes con ondas ricas en armónicos, esas pequeñas diferencias producen batidos característicos.</p>`,
      en: `<h3>Essential psychoacoustics for synthesists</h3>
<p><b>Critical bands.</b> The cochlea works like a bank of about 24 overlapping filters (Bark scale). Two tones within the same critical band produce <i>roughness</i>, maximal at ~1/4 critical band apart. That explains why small intervals in the low register sound "muddy".</p>
<p><b>Masking.</b> A loud sound hides weaker sounds nearby in frequency (more upward than downward). In mixing and sound design this decides whether a detail is heard. MP3/AAC codecs are built on this.</p>
<p><b>Missing fundamental.</b> If a sound has harmonics 2, 3, 4, 5… of 100 Hz but no 100 Hz component, we still hear a 100 Hz pitch. Phone speakers reproduce bass this way. Design trick: saturate a bass so it generates harmonics and "reads" on small speakers.</p>
<p><b>Precedence (Haas) effect.</b> If the same sound reaches both ears 1–30 ms apart, we localise it on the earlier side and hear no echo. Basis of many stereo wideners.</p>
<p><b>Temporal resolution.</b> Events closer than ~20–50 ms fuse; a click train above ~20 Hz starts to sound like a tone (relevant for granular synthesis and LFOs pushed into audio rate).</p>
<h3>The harmonic series and music</h3>
<p>Harmonics 1–6 of C2 are C2, C3, G3, C4, E4, G4: the series contains the octave, fifth and major third. Just intonation uses these exact ratios (3/2, 5/4); equal temperament approximates them (the tempered major third is 14 cents above 5/4). When you synthesise chords with harmonically rich waves, these small differences produce characteristic beating.</p>`,
      de: `<h3>Psychoakustik für Synthesisten</h3>
<p><b>Frequenzgruppen.</b> Die Cochlea arbeitet wie eine Bank aus etwa 24 überlappenden Filtern (Bark-Skala). Zwei Töne in derselben Frequenzgruppe erzeugen <i>Rauigkeit</i>, maximal bei ~1/4 Gruppenbreite Abstand. Darum klingen enge Intervalle im Bass „matschig".</p>
<p><b>Verdeckung.</b> Ein lauter Klang verdeckt leisere in Frequenznähe (stärker nach oben als nach unten). Das entscheidet in Mix und Sounddesign, ob ein Detail hörbar ist; MP3/AAC beruhen darauf.</p>
<p><b>Fehlender Grundton.</b> Hat ein Klang die Obertöne 2, 3, 4, 5… von 100 Hz, aber keinen 100-Hz-Anteil, hören wir trotzdem 100 Hz. Handylautsprecher geben Bässe so wieder. Trick: einen Bass sättigen, damit er Obertöne erzeugt und auf kleinen Lautsprechern „durchkommt".</p>
<p><b>Präzedenzeffekt (Haas).</b> Erreicht derselbe Klang beide Ohren mit 1–30 ms Abstand, orten wir ihn auf der früheren Seite, ohne Echo. Grundlage vieler Stereoverbreiterer.</p>
<p><b>Zeitliche Auflösung.</b> Ereignisse unter ~20–50 ms Abstand verschmelzen; eine Klickfolge über ~20 Hz klingt wie ein Ton (wichtig für Granularsynthese und LFOs im Audiobereich).</p>
<h3>Die Obertonreihe und Musik</h3>
<p>Die Obertöne 1–6 von C2 sind C2, C3, G3, C4, E4, G4: Oktave, Quinte und große Terz. Die reine Stimmung nutzt diese exakten Verhältnisse (3/2, 5/4); die gleichstufige nähert sie an (die temperierte große Terz liegt 14 Cent über 5/4). Bei Akkorden mit obertonreichen Wellen erzeugen diese Abweichungen charakteristische Schwebungen.</p>`,
      ja: `<h3>シンセ奏者のための心理音響学の基本</h3>
<p><b>臨界帯域。</b>蝸牛は約24個の重なり合うフィルター群（バークスケール）のように働きます。同じ臨界帯域内の2音は<i>粗さ</i>を生み、帯域幅の約1/4離れたとき最大になります。低音域の狭い音程が「濁って」聞こえる理由です。</p>
<p><b>マスキング。</b>大きな音は周波数の近い小さな音を隠します（下より上方向に強く働く）。ミックスやサウンドデザインで細部が聞こえるかどうかを決め、MP3/AACもこの原理に基づいています。</p>
<p><b>ミッシング・ファンダメンタル。</b>100 Hzの2・3・4・5…倍音があり100 Hz成分がなくても、100 Hzの音高が聞こえます。スマホのスピーカーはこうして低音を再生します。デザインの技：ベースを歪ませて倍音を作り、小さなスピーカーでも「聞こえる」ようにする。</p>
<p><b>先行音効果（ハース効果）。</b>同じ音が1〜30 msずれて両耳に届くと、先に届いた側に定位し、エコーとしては聞こえません。多くのステレオ・ワイドナーの原理です。</p>
<p><b>時間分解能。</b>約20〜50 ms以内の出来事は融合して聞こえ、約20 Hzを超えるクリック列は音高を持ち始めます（グラニュラー合成や可聴域まで速くしたLFOに関係）。</p>
<h3>倍音列と音楽</h3>
<p>C2の第1〜6倍音はC2, C3, G3, C4, E4, G4。倍音列にはオクターブ、5度、長3度が含まれます。純正律はこの正確な比（3/2, 5/4）を使い、平均律はそれを近似します（平均律の長3度は5/4より14セント高い）。倍音豊かな波で和音を作ると、この小さな差が特有のうなりを生みます。</p>`
    },
    read: ['Juan G. Roederer — <i>The Physics and Psychophysics of Music</i>', 'Martin Russ — <i>Sound Synthesis and Sampling</i>, cap. 1', 'Curtis Roads — <i>The Computer Music Tutorial</i>, parte 1', 'Hermann von Helmholtz — <i>On the Sensations of Tone</i> (1863)'],
    quiz: [
      { q: { es: 'Si duplicás la frecuencia de un tono, ¿qué escuchás?', en: 'If you double a tone\'s frequency, what do you hear?', de: 'Was hörst du, wenn du die Frequenz verdoppelst?', ja: '周波数を2倍にすると何が聞こえる？' }, o: { es: ['El mismo tono, más fuerte', 'Una octava más arriba', 'Una quinta más arriba', 'Un semitono más arriba'], en: ['The same tone, louder', 'One octave higher', 'A fifth higher', 'A semitone higher'], de: ['Denselben Ton, lauter', 'Eine Oktave höher', 'Eine Quinte höher', 'Einen Halbton höher'], ja: ['同じ音で大きく', '1オクターブ上', '5度上', '半音上'] }, c: 1, x: { es: 'La relación 2:1 es la octava; la percepción de altura es logarítmica.', en: 'The 2:1 ratio is the octave; pitch perception is logarithmic.', de: 'Das Verhältnis 2:1 ist die Oktave; Tonhöhenwahrnehmung ist logarithmisch.', ja: '2:1の比がオクターブ。音高の知覚は対数的です。' } },
      { q: { es: '¿Cuántos dB aumenta el nivel al duplicar la amplitud?', en: 'How many dB does doubling the amplitude add?', de: 'Wie viele dB bringt eine Verdopplung der Amplitude?', ja: '振幅を2倍にすると何dB上がる？' }, o: { es: ['+3 dB', '+6 dB', '+10 dB', '+20 dB'], en: ['+3 dB', '+6 dB', '+10 dB', '+20 dB'], de: ['+3 dB', '+6 dB', '+10 dB', '+20 dB'], ja: ['+3 dB', '+6 dB', '+10 dB', '+20 dB'] }, c: 1, x: { es: '20·log10(2) ≈ 6,02 dB.', en: '20·log10(2) ≈ 6.02 dB.', de: '20·log10(2) ≈ 6,02 dB.', ja: '20·log10(2) ≈ 6.02 dB。' } },
      { q: { es: 'Dos tonos de 440 Hz y 443 Hz suenan juntos. ¿Qué se percibe?', en: 'Tones at 440 Hz and 443 Hz play together. What do you perceive?', de: 'Töne mit 440 Hz und 443 Hz klingen zusammen. Was hört man?', ja: '440 Hzと443 Hzが同時に鳴る。何が聞こえる？' }, o: { es: ['Silencio', 'Batidos a 3 Hz', 'Un tono de 883 Hz', 'Un tono de 3 Hz audible como nota'], en: ['Silence', 'Beating at 3 Hz', 'An 883 Hz tone', 'A 3 Hz tone heard as a note'], de: ['Stille', 'Schwebung mit 3 Hz', 'Einen 883-Hz-Ton', 'Einen hörbaren 3-Hz-Ton'], ja: ['無音', '3 Hzのうなり', '883 Hzの音', '3 Hzの音程として聞こえる'] }, c: 1, x: { es: 'La amplitud fluctúa a la frecuencia diferencia |f1−f2| = 3 Hz.', en: 'Amplitude fluctuates at the difference frequency |f1−f2| = 3 Hz.', de: 'Die Amplitude schwankt mit der Differenzfrequenz |f1−f2| = 3 Hz.', ja: '振幅が差の周波数|f1−f2| = 3 Hzで揺れます。' } },
      { q: { es: '¿Qué determina principalmente el timbre?', en: 'What mainly determines timbre?', de: 'Was bestimmt hauptsächlich die Klangfarbe?', ja: '音色を主に決めるのは？' }, o: { es: ['Solo la frecuencia fundamental', 'El espectro y su evolución temporal', 'Solo la amplitud', 'La fase absoluta'], en: ['Only the fundamental frequency', 'The spectrum and its evolution over time', 'Only the amplitude', 'Absolute phase'], de: ['Nur die Grundfrequenz', 'Das Spektrum und seine zeitliche Entwicklung', 'Nur die Amplitude', 'Die absolute Phase'], ja: ['基本周波数だけ', 'スペクトルとその時間変化', '振幅だけ', '絶対位相'] }, c: 1, x: { es: 'El contenido armónico y cómo cambia (ataque, brillo) definen el timbre.', en: 'Harmonic content and how it changes (attack, brightness) define timbre.', de: 'Obertongehalt und dessen Veränderung (Anschlag, Helligkeit) bestimmen die Klangfarbe.', ja: '倍音構成とその変化（アタック、明るさ）が音色を決めます。' } },
      { q: { es: '¿Cuál es la longitud de onda aproximada de 343 Hz en el aire?', en: 'What is the approximate wavelength of 343 Hz in air?', de: 'Wie groß ist die Wellenlänge von 343 Hz in Luft etwa?', ja: '空気中で343 Hzの波長はおよそ？' }, o: { es: ['1 cm', '10 cm', '1 m', '10 m'], en: ['1 cm', '10 cm', '1 m', '10 m'], de: ['1 cm', '10 cm', '1 m', '10 m'], ja: ['1 cm', '10 cm', '1 m', '10 m'] }, c: 2, x: { es: 'λ = c/f = 343/343 = 1 m.', en: 'λ = c/f = 343/343 = 1 m.', de: 'λ = c/f = 343/343 = 1 m.', ja: 'λ = c/f = 343/343 = 1 m。' } },
      { q: { es: 'Un parlante de celular no reproduce 60 Hz, pero oímos la nota del bajo. ¿Por qué?', en: 'A phone speaker can\'t reproduce 60 Hz, yet we hear the bass note. Why?', de: 'Ein Handylautsprecher gibt 60 Hz nicht wieder, trotzdem hören wir die Bassnote. Warum?', ja: 'スマホのスピーカーは60 Hzを再生できないのにベース音が聞こえる。なぜ？' }, o: { es: ['Por el efecto Haas', 'Por la fundamental ausente: el cerebro la infiere de los armónicos', 'Por el enmascaramiento', 'Porque el parlante vibra a 60 Hz igual'], en: ['Haas effect', 'Missing fundamental: the brain infers it from the harmonics', 'Masking', 'Because the speaker vibrates at 60 Hz anyway'], de: ['Haas-Effekt', 'Fehlender Grundton: das Gehirn erschließt ihn aus den Obertönen', 'Verdeckung', 'Weil der Lautsprecher trotzdem mit 60 Hz schwingt'], ja: ['ハース効果', 'ミッシング・ファンダメンタル：脳が倍音から推測する', 'マスキング', 'スピーカーがそれでも60 Hzで振動するから'] }, c: 1, x: { es: 'El sistema auditivo reconstruye la altura a partir del patrón de armónicos.', en: 'The auditory system reconstructs pitch from the harmonic pattern.', de: 'Das Gehör rekonstruiert die Tonhöhe aus dem Obertonmuster.', ja: '聴覚系は倍音のパターンから音高を再構成します。' } }
    ]
  });

  /* ===================== 2. FORMAS DE ONDA ===================== */
  M({
    id: 'waves', lv: 1, lab: ['waves', 'additive'],
    title: { es: 'Formas de onda y serie armónica', en: 'Waveforms and the harmonic series', de: 'Wellenformen und Obertonreihe', ja: '波形と倍音列' },
    sum: { es: 'Senoidal, triangular, diente de sierra, cuadrada, pulso y ruido: qué armónicos contiene cada una y para qué sirve.', en: 'Sine, triangle, sawtooth, square, pulse and noise: which harmonics each contains and what it is good for.', de: 'Sinus, Dreieck, Sägezahn, Rechteck, Puls und Rauschen: welche Obertöne sie enthalten und wofür man sie nutzt.', ja: 'サイン・三角・ノコギリ・矩形・パルス・ノイズ：それぞれの倍音構成と使い道。' },
    key: {
      es: ['Las formas de onda clásicas son "materia prima" con espectros conocidos.', 'Diente de sierra: <b>todos</b> los armónicos a 1/n. Cuadrada: solo <b>impares</b> a 1/n. Triangular: impares a <b>1/n²</b>.', 'El <b>ancho de pulso</b> elimina armónicos múltiplos de 1/ancho.', 'El ruido tiene espectro continuo: blanco (plano por Hz), rosa (−3 dB/oct), marrón (−6 dB/oct).', 'Con <b>síntesis aditiva</b> podés construir cualquier onda periódica sumando senoidales.'],
      en: ['Classic waveforms are "raw material" with known spectra.', 'Sawtooth: <b>all</b> harmonics at 1/n. Square: <b>odd</b> only at 1/n. Triangle: odd at <b>1/n²</b>.', 'The <b>pulse width</b> removes harmonics that are multiples of 1/width.', 'Noise has a continuous spectrum: white (flat per Hz), pink (−3 dB/oct), brown (−6 dB/oct).', 'With <b>additive synthesis</b> you can build any periodic wave by summing sines.'],
      de: ['Klassische Wellenformen sind „Rohmaterial" mit bekannten Spektren.', 'Sägezahn: <b>alle</b> Obertöne mit 1/n. Rechteck: nur <b>ungerade</b> mit 1/n. Dreieck: ungerade mit <b>1/n²</b>.', 'Die <b>Pulsbreite</b> entfernt Obertöne, die Vielfache von 1/Breite sind.', 'Rauschen hat ein kontinuierliches Spektrum: weiß (flach pro Hz), rosa (−3 dB/Okt), braun (−6 dB/Okt).', 'Mit <b>additiver Synthese</b> baut man jede periodische Welle aus Sinuswellen.'],
      ja: ['古典的な波形は、スペクトルが既知の「素材」。', 'ノコギリ波：<b>全</b>倍音が1/n。矩形波：<b>奇数</b>倍音のみ1/n。三角波：奇数倍音が<b>1/n²</b>。', '<b>パルス幅</b>は1/幅の倍数次の倍音を消す。', 'ノイズは連続スペクトル：ホワイト（Hzあたり平坦）、ピンク（−3 dB/oct）、ブラウン（−6 dB/oct）。', '<b>加算合成</b>ならサイン波を足してどんな周期波形も作れる。']
    },
    sec: [
      {
        h: { es: 'El catálogo clásico', en: 'The classic catalogue', de: 'Der klassische Katalog', ja: '古典的な波形カタログ' },
        b: {
          es: `<table><tr><th>Onda</th><th>Armónicos</th><th>Amplitud</th><th>Carácter / uso</th></tr>
<tr><td>Senoidal</td><td>solo 1</td><td>—</td><td>Pura, sub-bajos, FM, silbidos</td></tr>
<tr><td>Triangular</td><td>impares</td><td>1/n²</td><td>Suave, flauta, leads tenues</td></tr>
<tr><td>Diente de sierra</td><td>todos</td><td>1/n</td><td>Brillante: cuerdas, metales, bajos, supersaw</td></tr>
<tr><td>Cuadrada (50%)</td><td>impares</td><td>1/n</td><td>Hueca: clarinete, chiptune, bajos</td></tr>
<tr><td>Pulso (estrecho)</td><td>todos menos múltiplos de 1/ancho</td><td>variable</td><td>Nasal, oboe, clavinet</td></tr></table>
<p>El diente de sierra es la onda "más completa" y por eso la favorita de la <b>síntesis sustractiva</b>: es fácil quitar lo que sobra con un filtro. La cuadrada suena hueca porque le faltan los armónicos pares (2, 4, 6…), igual que un tubo cerrado en un extremo como el clarinete.</p>
<p>Un detalle: en la triangular los armónicos caen tan rápido (el 3º está a −19 dB, el 5º a −28 dB) que casi suena como una senoidal con un poco de "aire".</p>`,
          en: `<table><tr><th>Wave</th><th>Harmonics</th><th>Amplitude</th><th>Character / use</th></tr>
<tr><td>Sine</td><td>1 only</td><td>—</td><td>Pure, sub-bass, FM, whistles</td></tr>
<tr><td>Triangle</td><td>odd</td><td>1/n²</td><td>Soft, flute, gentle leads</td></tr>
<tr><td>Sawtooth</td><td>all</td><td>1/n</td><td>Bright: strings, brass, basses, supersaw</td></tr>
<tr><td>Square (50%)</td><td>odd</td><td>1/n</td><td>Hollow: clarinet, chiptune, basses</td></tr>
<tr><td>Pulse (narrow)</td><td>all except multiples of 1/width</td><td>varies</td><td>Nasal, oboe, clavinet</td></tr></table>
<p>The sawtooth is the "most complete" wave, so it is the favourite of <b>subtractive synthesis</b>: it is easy to remove what you don't want with a filter. The square sounds hollow because it lacks even harmonics (2, 4, 6…), like a tube closed at one end such as a clarinet.</p>
<p>A detail: in the triangle the harmonics fall so fast (3rd at −19 dB, 5th at −28 dB) that it sounds almost like a sine with a little "air".</p>`,
          de: `<table><tr><th>Welle</th><th>Obertöne</th><th>Amplitude</th><th>Charakter / Einsatz</th></tr>
<tr><td>Sinus</td><td>nur 1</td><td>—</td><td>Rein, Subbass, FM, Pfeifen</td></tr>
<tr><td>Dreieck</td><td>ungerade</td><td>1/n²</td><td>Weich, Flöte, sanfte Leads</td></tr>
<tr><td>Sägezahn</td><td>alle</td><td>1/n</td><td>Hell: Streicher, Bläser, Bässe, Supersaw</td></tr>
<tr><td>Rechteck (50 %)</td><td>ungerade</td><td>1/n</td><td>Hohl: Klarinette, Chiptune, Bässe</td></tr>
<tr><td>Puls (schmal)</td><td>alle außer Vielfachen von 1/Breite</td><td>variabel</td><td>Nasal, Oboe, Clavinet</td></tr></table>
<p>Der Sägezahn ist die „vollständigste" Welle und daher Liebling der <b>subtraktiven Synthese</b>: Mit einem Filter entfernt man leicht, was stört. Das Rechteck klingt hohl, weil die geraden Obertöne (2, 4, 6…) fehlen – wie bei einer einseitig geschlossenen Röhre, etwa der Klarinette.</p>
<p>Detail: Beim Dreieck fallen die Obertöne so schnell (3. bei −19 dB, 5. bei −28 dB), dass es fast wie ein Sinus mit etwas „Luft" klingt.</p>`,
          ja: `<table><tr><th>波形</th><th>倍音</th><th>振幅</th><th>キャラクター／用途</th></tr>
<tr><td>サイン</td><td>1のみ</td><td>—</td><td>純粋、サブベース、FM、口笛</td></tr>
<tr><td>三角</td><td>奇数</td><td>1/n²</td><td>柔らかい、フルート、穏やかなリード</td></tr>
<tr><td>ノコギリ</td><td>全部</td><td>1/n</td><td>明るい：ストリングス、ブラス、ベース、スーパーソウ</td></tr>
<tr><td>矩形（50%）</td><td>奇数</td><td>1/n</td><td>中空：クラリネット、チップチューン、ベース</td></tr>
<tr><td>パルス（細い）</td><td>1/幅の倍数以外すべて</td><td>可変</td><td>鼻にかかった音、オーボエ、クラビネット</td></tr></table>
<p>ノコギリ波は「最も完全な」波形で、<b>減算合成</b>のお気に入りです。不要な部分をフィルターで削りやすいからです。矩形波が中空に聞こえるのは偶数倍音（2, 4, 6…）がないためで、クラリネットのような片側が閉じた管と同じです。</p>
<p>補足：三角波は倍音の減衰が非常に速い（第3倍音−19 dB、第5倍音−28 dB）ので、少し「空気感」のあるサイン波のように聞こえます。</p>`
        }
      },
      {
        h: { es: 'Pulso y ancho de pulso', en: 'Pulse and pulse width', de: 'Puls und Pulsbreite', ja: 'パルスとパルス幅' },
        b: {
          es: `<p>Una onda de pulso pasa una fracción <b>w</b> del ciclo arriba y el resto abajo. La amplitud del armónico n es proporcional a <code>sin(π·n·w)/n</code>. Consecuencia práctica: con w = 1/k desaparecen los armónicos múltiplos de k. Con 50% (k=2) faltan los pares; con 25% faltan el 4, 8, 12…; con 10% faltan 10, 20…</p>
<p>Un pulso de 25% y uno de 75% tienen <b>el mismo espectro</b> (uno es el otro invertido). A medida que el pulso se estrecha, el sonido se vuelve más fino y "zumbón" y pierde volumen en la fundamental.</p>
<p>Cuando se <b>modula</b> el ancho de pulso con un LFO (<b>PWM</b>) los armónicos se mueven todo el tiempo y aparece un efecto de coro muy característico: es el sonido de cuerdas del Juno-60 o del Prophet. Lo verás en el módulo de osciladores.</p>`,
          en: `<p>A pulse wave spends a fraction <b>w</b> of its cycle high and the rest low. The amplitude of harmonic n is proportional to <code>sin(π·n·w)/n</code>. In practice: with w = 1/k the harmonics that are multiples of k vanish. At 50% (k=2) the even ones are missing; at 25% the 4th, 8th, 12th…; at 10% the 10th, 20th…</p>
<p>A 25% and a 75% pulse have <b>the same spectrum</b> (one is the other inverted). As the pulse narrows the sound becomes thinner and buzzier and loses fundamental level.</p>
<p>When you <b>modulate</b> the pulse width with an LFO (<b>PWM</b>) the harmonics move constantly and a very characteristic chorus effect appears: the string sound of the Juno-60 or the Prophet. You'll see it in the oscillators module.</p>`,
          de: `<p>Eine Pulswelle verbringt den Anteil <b>w</b> des Zyklus oben und den Rest unten. Die Amplitude des n-ten Obertons ist proportional zu <code>sin(π·n·w)/n</code>. Praktisch: Bei w = 1/k verschwinden die Vielfachen von k. Bei 50 % (k=2) fehlen die geraden; bei 25 % der 4., 8., 12.…; bei 10 % der 10., 20.…</p>
<p>Ein 25-%- und ein 75-%-Puls haben <b>dasselbe Spektrum</b> (einer ist der invertierte andere). Je schmaler der Puls, desto dünner und schnarrender der Klang, und der Grundton wird leiser.</p>
<p><b>Moduliert</b> man die Pulsbreite mit einem LFO (<b>PWM</b>), bewegen sich die Obertöne ständig und es entsteht ein typischer Chorus-Effekt: der Streicherklang von Juno-60 oder Prophet. Mehr im Oszillator-Modul.</p>`,
          ja: `<p>パルス波は周期のうち割合<b>w</b>を上側、残りを下側で過ごします。第n倍音の振幅は<code>sin(π·n·w)/n</code>に比例します。実用上：w = 1/kのときkの倍数次の倍音が消えます。50%（k=2）なら偶数次、25%なら4, 8, 12…、10%なら10, 20…が欠けます。</p>
<p>25%と75%のパルスは<b>同じスペクトル</b>です（一方は他方の反転）。パルスが細くなるほど音は細くブザー的になり、基音のレベルが下がります。</p>
<p>LFOでパルス幅を<b>変調</b>する（<b>PWM</b>）と倍音が絶えず動き、独特のコーラス効果が生まれます。Juno-60やProphetのストリングスの音です。オシレーターのモジュールで詳しく扱います。</p>`
        }
      },
      {
        h: { es: 'Ruido: espectros continuos', en: 'Noise: continuous spectra', de: 'Rauschen: kontinuierliche Spektren', ja: 'ノイズ：連続スペクトル' },
        b: {
          es: `<p>El ruido es una señal aleatoria: no tiene período ni altura definida. Su "color" describe cómo se reparte la energía:</p>
<ul><li><b>Blanco</b>: igual energía por Hz. Como cada octava superior tiene el doble de Hz, suena muy agudo. Ideal para hi-hats, platillos, viento filtrado, transitorios.</li><li><b>Rosa</b>: igual energía por octava (cae 3 dB/oct). Suena "equilibrado"; se usa para medir salas y como base de lluvia u olas.</li><li><b>Marrón/rojo</b>: cae 6 dB/oct (integración del blanco). Retumbo, viento grave, mar.</li></ul>
<p>En síntesis el ruido sirve para <b>soplo</b> en flautas y pads, para el "chiff" del ataque, para percusión (redoblante = tono + ruido), y como fuente de modulación aleatoria (sample &amp; hold).</p>`,
          en: `<p>Noise is a random signal with no period or defined pitch. Its "colour" describes how energy is distributed:</p>
<ul><li><b>White</b>: equal energy per Hz. Since each higher octave contains twice as many Hz, it sounds very bright. Ideal for hi-hats, cymbals, filtered wind, transients.</li><li><b>Pink</b>: equal energy per octave (falls 3 dB/oct). Sounds "balanced"; used to measure rooms and as a basis for rain or waves.</li><li><b>Brown/red</b>: falls 6 dB/oct (integrated white). Rumble, low wind, sea.</li></ul>
<p>In synthesis noise adds <b>breath</b> to flutes and pads, the "chiff" of an attack, percussion (snare = tone + noise), and acts as a random modulation source (sample &amp; hold).</p>`,
          de: `<p>Rauschen ist ein Zufallssignal ohne Periode oder Tonhöhe. Seine „Farbe" beschreibt die Energieverteilung:</p>
<ul><li><b>Weiß</b>: gleiche Energie pro Hz. Da jede höhere Oktave doppelt so viele Hz enthält, klingt es sehr hell. Ideal für Hi-Hats, Becken, gefilterten Wind, Transienten.</li><li><b>Rosa</b>: gleiche Energie pro Oktave (−3 dB/Okt). Klingt „ausgewogen"; für Raummessung und als Basis für Regen oder Wellen.</li><li><b>Braun/rot</b>: −6 dB/Okt (integriertes Weiß). Grollen, tiefer Wind, Meer.</li></ul>
<p>In der Synthese liefert Rauschen <b>Hauch</b> für Flöten und Pads, das „Chiff" im Anschlag, Percussion (Snare = Ton + Rauschen) und ist Zufallsquelle für Modulation (Sample &amp; Hold).</p>`,
          ja: `<p>ノイズは周期も明確な音高もないランダム信号です。その「色」はエネルギーの分布を表します：</p>
<ul><li><b>ホワイト</b>：Hzあたり等エネルギー。上のオクターブほどHz数が倍になるので、とても明るく聞こえる。ハイハット、シンバル、フィルターをかけた風、トランジェントに最適。</li><li><b>ピンク</b>：オクターブあたり等エネルギー（−3 dB/oct）。「バランスよく」聞こえ、部屋の測定や雨・波の素材に使う。</li><li><b>ブラウン／レッド</b>：−6 dB/oct（ホワイトの積分）。地鳴り、低い風、海。</li></ul>
<p>シンセではノイズはフルートやパッドの<b>息</b>、アタックの「チフ」、パーカッション（スネア＝トーン＋ノイズ）、そしてランダムな変調源（サンプル＆ホールド）として使われます。</p>`
        }
      },
      {
        h: { es: 'Síntesis aditiva: construir con senoidales', en: 'Additive synthesis: building with sines', de: 'Additive Synthese: Bauen mit Sinuswellen', ja: '加算合成：サイン波で組み立てる' },
        b: {
          es: `<p>Si todo sonido periódico es una suma de senoidales, podemos <b>construirlo sumando senoidales</b>. Ese es el principio del órgano Hammond (9 "drawbars" = 9 armónicos), del Synclavier, del Kawai K5000 o de plugins como Harmor o Razor.</p>
<span class="formula">x(t) = Σ  A_n · sin(2π · n · f · t + φ_n)</span>
<p>Ventaja: control absoluto de cada armónico. Desventaja: para un sonido realista necesitás decenas de armónicos, <b>cada uno con su propia envolvente</b>. Por eso los sintes aditivos modernos usan "macros" (filtros virtuales, formantes, dispersión) para controlar muchos parciales a la vez.</p>
<div class="tip">En el lab aditivo: elegí el preset "Sierra", luego bajá a cero todos los armónicos pares → obtenés una cuadrada. Después subí solo el 1, 2, 3, 4, 6 y 8: un órgano tipo Hammond.</div>`,
          en: `<p>If every periodic sound is a sum of sines, we can <b>build it by summing sines</b>. That's the principle of the Hammond organ (9 drawbars = 9 harmonics), the Synclavier, the Kawai K5000, or plugins like Harmor or Razor.</p>
<span class="formula">x(t) = Σ  A_n · sin(2π · n · f · t + φ_n)</span>
<p>Advantage: total control over every harmonic. Drawback: realistic sounds need dozens of harmonics, <b>each with its own envelope</b>. So modern additive synths use "macros" (virtual filters, formants, spread) to control many partials at once.</p>
<div class="tip">In the additive lab: choose the "Saw" preset, then pull all even harmonics to zero → you get a square. Then raise only 1, 2, 3, 4, 6 and 8: a Hammond-style organ.</div>`,
          de: `<p>Wenn jeder periodische Klang eine Summe von Sinuswellen ist, können wir ihn <b>durch Addieren von Sinuswellen bauen</b>. So funktionieren die Hammond-Orgel (9 Zugriegel = 9 Obertöne), das Synclavier, der Kawai K5000 oder Plugins wie Harmor oder Razor.</p>
<span class="formula">x(t) = Σ  A_n · sin(2π · n · f · t + φ_n)</span>
<p>Vorteil: volle Kontrolle über jeden Oberton. Nachteil: Realistische Klänge brauchen Dutzende Obertöne, <b>jeder mit eigener Hüllkurve</b>. Moderne Additiv-Synths nutzen daher „Makros" (virtuelle Filter, Formanten, Spreizung), um viele Teiltöne gemeinsam zu steuern.</p>
<div class="tip">Im Additiv-Labor: Preset „Säge" wählen, dann alle geraden Obertöne auf null → ein Rechteck. Dann nur 1, 2, 3, 4, 6 und 8 hochziehen: eine Hammond-artige Orgel.</div>`,
          ja: `<p>あらゆる周期音がサイン波の和なら、<b>サイン波を足して作る</b>ことができます。これがハモンドオルガン（9本のドローバー＝9つの倍音）、シンクラヴィア、カワイK5000、HarmorやRazorなどのプラグインの原理です。</p>
<span class="formula">x(t) = Σ  A_n · sin(2π · n · f · t + φ_n)</span>
<p>利点：各倍音を完全にコントロールできる。欠点：リアルな音には数十の倍音が必要で、<b>それぞれに専用のエンベロープ</b>がいる。そのため現代の加算シンセは「マクロ」（仮想フィルター、フォルマント、スプレッド）で多数の部分音をまとめて操作します。</p>
<div class="tip">加算ラボで：「ノコギリ」プリセットを選び、偶数倍音をすべてゼロに→矩形波になる。次に1, 2, 3, 4, 6, 8だけを上げると、ハモンド風オルガンに。</div>`
        }
      }
    ],
    ex: {
      es: ['En el lab de formas de onda, tocá la misma nota con sierra y cuadrada y contá los picos del espectro en el primer kHz. ¿Dónde faltan picos en la cuadrada?', 'Compará pulso 25% y pulso 10%: ¿qué armónico desaparece en cada caso?', 'Escuchá los tres ruidos y describí con palabras propias cada uno (por ej. "lluvia", "radio", "mar").', 'En el lab aditivo, construí una cuadrada a mano y compará su forma en el osciloscopio con la del preset. ¿Ves el "Gibbs" (rizado) cerca de los saltos?', 'Diseñá un timbre "hueco y nasal" usando solo los armónicos 1, 3, 5 y 7 con amplitudes elegidas por vos.'],
      en: ['In the waveforms lab, play the same note with saw and square and count the spectrum peaks in the first kHz. Where are peaks missing on the square?', 'Compare 25% and 10% pulse: which harmonic disappears in each case?', 'Listen to the three noises and describe each in your own words (e.g. "rain", "radio", "sea").', 'In the additive lab, build a square by hand and compare its oscilloscope shape with the preset. Do you see the "Gibbs" ripple near the jumps?', 'Design a "hollow and nasal" timbre using only harmonics 1, 3, 5 and 7 with amplitudes of your choice.'],
      de: ['Spiele im Wellenform-Labor dieselbe Note mit Säge und Rechteck und zähle die Spektralspitzen im ersten kHz. Wo fehlen sie beim Rechteck?', 'Vergleiche 25-%- und 10-%-Puls: Welcher Oberton verschwindet jeweils?', 'Höre die drei Rauscharten an und beschreibe sie mit eigenen Worten („Regen", „Radio", „Meer").', 'Baue im Additiv-Labor ein Rechteck von Hand und vergleiche die Form im Oszilloskop mit dem Preset. Siehst du das „Gibbs"-Überschwingen an den Sprüngen?', 'Gestalte eine „hohle, nasale" Klangfarbe nur aus den Obertönen 1, 3, 5 und 7.'],
      ja: ['波形ラボで同じ音をノコギリ波と矩形波で弾き、最初の1 kHzにあるスペクトルのピークを数えよう。矩形波ではどこが欠けている？', '25%と10%のパルスを比べよう。それぞれどの倍音が消える？', '3種類のノイズを聴いて、自分の言葉で表現しよう（例：「雨」「ラジオ」「海」）。', '加算ラボで矩形波を手で作り、オシロスコープでプリセットと形を比べよう。段差付近の「ギブズ」現象（リンギング）が見える？', '倍音1, 3, 5, 7だけを使い、振幅を自分で決めて「中空で鼻にかかった」音色を作ろう。']
    },
    deep: {
      es: `<h3>Series de Fourier de las formas clásicas</h3>
<span class="formula">Sierra:      x(t) = (2/π) Σ (−1)^(n+1) · sin(nωt) / n</span>
<span class="formula">Cuadrada:   x(t) = (4/π) Σ_(n impar) sin(nωt) / n</span>
<span class="formula">Triangular: x(t) = (8/π²) Σ_(n impar) (−1)^((n−1)/2) · sin(nωt) / n²</span>
<p><b>Fenómeno de Gibbs.</b> Si truncás la serie (como hace cualquier oscilador digital limitado en banda), cerca de las discontinuidades aparece un sobreimpulso de ~9% que no desaparece al agregar armónicos, solo se estrecha. Por eso las ondas "perfectas" del osciloscopio de un sinte digital limpio muestran pequeñas oscilaciones en los bordes.</p>
<p><b>La fase sí importa… a veces.</b> El oído es poco sensible a la fase relativa de armónicos en sonidos estacionarios, pero dos ondas con el mismo espectro de magnitud y distinta fase pueden tener picos muy diferentes (factor de cresta). Eso cambia cómo responden a la <b>saturación</b>: una sierra y una sierra con fases aleatorias suenan iguales limpias, pero distintas al distorsionar.</p>
<p><b>Pendientes espectrales.</b> 1/n equivale a −6 dB/octava; 1/n² a −12 dB/oct. Observá la coincidencia: integrar una señal (sierra → parábola, cuadrada → triangular) suma −6 dB/oct; derivarla los resta. En circuitos analógicos, la triangular se obtiene integrando la cuadrada.</p>
<p><b>Espectros en el tiempo: el espectrograma.</b> Una FFT de ventana corta repetida a lo largo del tiempo da el espectrograma (tiempo × frecuencia × intensidad). Es la herramienta más útil para analizar sonidos de referencia y reproducirlos. Probá analizar grabaciones con Sonic Visualiser o Spek.</p>`,
      en: `<h3>Fourier series of the classic waves</h3>
<span class="formula">Saw:      x(t) = (2/π) Σ (−1)^(n+1) · sin(nωt) / n</span>
<span class="formula">Square:   x(t) = (4/π) Σ_(n odd) sin(nωt) / n</span>
<span class="formula">Triangle: x(t) = (8/π²) Σ_(n odd) (−1)^((n−1)/2) · sin(nωt) / n²</span>
<p><b>Gibbs phenomenon.</b> If you truncate the series (as any band-limited digital oscillator does), a ~9% overshoot appears near discontinuities that never disappears as you add harmonics; it only narrows. That's why the "perfect" waves on a clean digital synth's scope show small ripples at the edges.</p>
<p><b>Phase does matter… sometimes.</b> The ear is fairly insensitive to the relative phase of harmonics in steady sounds, but two waves with the same magnitude spectrum and different phases can have very different peaks (crest factor). That changes how they respond to <b>saturation</b>: a saw and a random-phase saw sound identical clean but different when distorted.</p>
<p><b>Spectral slopes.</b> 1/n equals −6 dB/octave; 1/n² equals −12 dB/oct. Notice: integrating a signal (saw → parabola, square → triangle) adds −6 dB/oct; differentiating removes it. In analogue circuits, the triangle is obtained by integrating the square.</p>
<p><b>Spectra over time: the spectrogram.</b> A short-window FFT repeated over time gives the spectrogram (time × frequency × intensity). It's the most useful tool to analyse reference sounds and recreate them. Try Sonic Visualiser or Spek on recordings.</p>`,
      de: `<h3>Fourier-Reihen der klassischen Wellen</h3>
<span class="formula">Säge:     x(t) = (2/π) Σ (−1)^(n+1) · sin(nωt) / n</span>
<span class="formula">Rechteck: x(t) = (4/π) Σ_(n ungerade) sin(nωt) / n</span>
<span class="formula">Dreieck:  x(t) = (8/π²) Σ_(n ungerade) (−1)^((n−1)/2) · sin(nωt) / n²</span>
<p><b>Gibbs-Phänomen.</b> Bricht man die Reihe ab (wie jeder bandbegrenzte digitale Oszillator), entsteht an Sprungstellen ein Überschwingen von ~9 %, das mit mehr Obertönen nicht verschwindet, sondern nur schmaler wird. Daher zeigen „perfekte" Wellen sauberer Digitalsynths kleine Wellen an den Kanten.</p>
<p><b>Phase zählt… manchmal.</b> Das Ohr ist für die relative Phase von Obertönen in stationären Klängen wenig empfindlich, aber zwei Wellen mit gleichem Betragsspektrum und anderer Phase können sehr unterschiedliche Spitzen haben (Crest-Faktor). Das ändert ihr Verhalten bei <b>Sättigung</b>.</p>
<p><b>Spektrale Steigungen.</b> 1/n entspricht −6 dB/Oktave, 1/n² −12 dB/Okt. Integrieren (Säge → Parabel, Rechteck → Dreieck) fügt −6 dB/Okt hinzu; Differenzieren nimmt sie weg. In Analogschaltungen entsteht das Dreieck durch Integration des Rechtecks.</p>
<p><b>Spektren über die Zeit: das Spektrogramm.</b> Eine kurze FFT, über die Zeit wiederholt, ergibt das Spektrogramm. Das nützlichste Werkzeug, um Referenzklänge zu analysieren und nachzubauen – probiere Sonic Visualiser oder Spek.</p>`,
      ja: `<h3>古典波形のフーリエ級数</h3>
<span class="formula">ノコギリ: x(t) = (2/π) Σ (−1)^(n+1) · sin(nωt) / n</span>
<span class="formula">矩形:     x(t) = (4/π) Σ_(n奇数) sin(nωt) / n</span>
<span class="formula">三角:     x(t) = (8/π²) Σ_(n奇数) (−1)^((n−1)/2) · sin(nωt) / n²</span>
<p><b>ギブズ現象。</b>級数を途中で打ち切ると（帯域制限されたデジタル・オシレーターは必ずそうなる）、不連続点の近くに約9%のオーバーシュートが現れ、倍音を増やしても消えず幅が狭くなるだけです。クリーンなデジタルシンセのオシロで「完璧な」波形の縁に小さな波が見えるのはこのためです。</p>
<p><b>位相は…時に重要。</b>定常音では倍音の相対位相に耳はあまり敏感ではありませんが、振幅スペクトルが同じで位相が違う2つの波はピーク（クレストファクター）が大きく異なることがあります。それは<b>サチュレーション</b>への反応を変えます。</p>
<p><b>スペクトルの傾き。</b>1/nは−6 dB/オクターブ、1/n²は−12 dB/oct。信号を積分する（ノコギリ→放物線、矩形→三角）と−6 dB/octが加わり、微分すると取り除かれます。アナログ回路では三角波は矩形波を積分して作ります。</p>
<p><b>時間とともに変わるスペクトル：スペクトログラム。</b>短い窓のFFTを時間方向に繰り返すとスペクトログラムになります。参照音を分析して再現するための最強の道具です。Sonic VisualiserやSpekで録音を分析してみよう。</p>`
    },
    read: ['Fred Welsh — <i>Welsh\'s Synthesizer Cookbook</i> (tablas de armónicos por onda)', 'Martin Russ — <i>Sound Synthesis and Sampling</i>, cap. 2', 'Miller Puckette — <i>The Theory and Technique of Electronic Music</i>, cap. 1–2'],
    quiz: [
      { q: { es: '¿Qué onda contiene todos los armónicos con amplitud 1/n?', en: 'Which wave contains all harmonics at amplitude 1/n?', de: 'Welche Welle enthält alle Obertöne mit Amplitude 1/n?', ja: '全倍音を振幅1/nで含む波形は？' }, o: { es: ['Cuadrada', 'Triangular', 'Diente de sierra', 'Senoidal'], en: ['Square', 'Triangle', 'Sawtooth', 'Sine'], de: ['Rechteck', 'Dreieck', 'Sägezahn', 'Sinus'], ja: ['矩形', '三角', 'ノコギリ', 'サイン'] }, c: 2, x: { es: 'La sierra es la onda más rica: todos los armónicos, cayendo 6 dB/oct.', en: 'The saw is the richest: all harmonics, falling 6 dB/oct.', de: 'Der Sägezahn ist am reichsten: alle Obertöne, −6 dB/Okt.', ja: 'ノコギリ波が最も豊か：全倍音が6 dB/octで減衰。' } },
      { q: { es: '¿Por qué la cuadrada suena "hueca"?', en: 'Why does the square sound "hollow"?', de: 'Warum klingt das Rechteck „hohl"?', ja: '矩形波が「中空」に聞こえる理由は？' }, o: { es: ['Porque no tiene fundamental', 'Porque le faltan los armónicos pares', 'Porque sus armónicos caen 1/n²', 'Porque es inarmónica'], en: ['It lacks the fundamental', 'It lacks even harmonics', 'Its harmonics fall 1/n²', 'It is inharmonic'], de: ['Ihm fehlt der Grundton', 'Ihm fehlen die geraden Obertöne', 'Seine Obertöne fallen mit 1/n²', 'Es ist unharmonisch'], ja: ['基音がない', '偶数倍音がない', '倍音が1/n²で減衰する', '非調和だから'] }, c: 1, x: { es: 'Solo armónicos impares, como un tubo cerrado (clarinete).', en: 'Odd harmonics only, like a closed tube (clarinet).', de: 'Nur ungerade Obertöne, wie eine geschlossene Röhre (Klarinette).', ja: '奇数倍音のみ。閉管（クラリネット）と同じ。' } },
      { q: { es: 'En un pulso de 20%, ¿qué armónicos desaparecen?', en: 'In a 20% pulse, which harmonics disappear?', de: 'Welche Obertöne fehlen bei einem 20-%-Puls?', ja: '20%パルスで消える倍音は？' }, o: { es: ['Los pares', 'Los múltiplos de 5', 'Los múltiplos de 3', 'Ninguno'], en: ['The even ones', 'Multiples of 5', 'Multiples of 3', 'None'], de: ['Die geraden', 'Vielfache von 5', 'Vielfache von 3', 'Keine'], ja: ['偶数次', '5の倍数次', '3の倍数次', 'なし'] }, c: 1, x: { es: 'w = 1/5 → sin(π·n/5) = 0 para n = 5, 10, 15…', en: 'w = 1/5 → sin(π·n/5) = 0 for n = 5, 10, 15…', de: 'w = 1/5 → sin(π·n/5) = 0 für n = 5, 10, 15…', ja: 'w = 1/5 → n = 5, 10, 15…でsin(π·n/5) = 0。' } },
      { q: { es: '¿Qué ruido tiene igual energía por octava?', en: 'Which noise has equal energy per octave?', de: 'Welches Rauschen hat gleiche Energie pro Oktave?', ja: 'オクターブあたり等エネルギーのノイズは？' }, o: { es: ['Blanco', 'Rosa', 'Marrón', 'Azul'], en: ['White', 'Pink', 'Brown', 'Blue'], de: ['Weiß', 'Rosa', 'Braun', 'Blau'], ja: ['ホワイト', 'ピンク', 'ブラウン', 'ブルー'] }, c: 1, x: { es: 'El rosa cae 3 dB/oct, compensando que cada octava tiene el doble de Hz.', en: 'Pink falls 3 dB/oct, compensating for each octave having twice the Hz.', de: 'Rosa fällt mit 3 dB/Okt und gleicht aus, dass jede Oktave doppelt so viele Hz hat.', ja: 'ピンクは3 dB/octで減衰し、各オクターブのHz数が倍になる分を補います。' } },
      { q: { es: 'La pendiente 1/n² equivale a…', en: 'A 1/n² slope equals…', de: 'Eine 1/n²-Steigung entspricht…', ja: '1/n²の傾きは…' }, o: { es: ['−3 dB/oct', '−6 dB/oct', '−12 dB/oct', '−24 dB/oct'], en: ['−3 dB/oct', '−6 dB/oct', '−12 dB/oct', '−24 dB/oct'], de: ['−3 dB/Okt', '−6 dB/Okt', '−12 dB/Okt', '−24 dB/Okt'], ja: ['−3 dB/oct', '−6 dB/oct', '−12 dB/oct', '−24 dB/oct'] }, c: 2, x: { es: 'Cada octava duplica n; 1/n² cae a 1/4 → −12 dB.', en: 'Each octave doubles n; 1/n² drops to 1/4 → −12 dB.', de: 'Jede Oktave verdoppelt n; 1/n² fällt auf 1/4 → −12 dB.', ja: '1オクターブでnが2倍、1/n²は1/4→−12 dB。' } }
    ]
  });

  /* ===================== 3. ARQUITECTURA ===================== */
  M({
    id: 'arch', lv: 1, lab: ['synth'],
    title: { es: 'Arquitectura del sintetizador e historia', en: 'Synthesizer architecture and history', de: 'Synthesizer-Architektur und Geschichte', ja: 'シンセサイザーの構造と歴史' },
    sum: { es: 'VCO, VCF, VCA, envolventes y LFO; control por voltaje, modular vs. semimodular, y los instrumentos que definieron el sonido.', en: 'VCO, VCF, VCA, envelopes and LFO; voltage control, modular vs semi-modular, and the instruments that defined the sound.', de: 'VCO, VCF, VCA, Hüllkurven und LFO; Spannungssteuerung, modular vs. halbmodular und die prägenden Instrumente.', ja: 'VCO・VCF・VCA・エンベロープ・LFO、電圧制御、モジュラーとセミモジュラー、音を決定づけた名機たち。' },
    key: {
      es: ['Una voz típica: <b>oscilador → filtro → amplificador</b>, con <b>envolventes</b> y <b>LFO</b> modulando.', 'Separamos <b>señal de audio</b> de <b>señales de control</b> (CV, gate, trigger).', 'Estándar <b>1 V/octava</b>: sumar 1 V sube una octava (Moog, mayoría del Eurorack).', 'Los semimodulares tienen un cableado interno "normalizado" que se puede romper con cables.', 'Moog, Buchla, ARP, Prophet-5, DX7, Juno, TB-303, M1 y los virtuales analógicos marcaron estilos.'],
      en: ['A typical voice: <b>oscillator → filter → amplifier</b>, with <b>envelopes</b> and <b>LFO</b> modulating.', 'We separate <b>audio signals</b> from <b>control signals</b> (CV, gate, trigger).', 'The <b>1 V/octave</b> standard: adding 1 V raises one octave (Moog, most Eurorack).', 'Semi-modulars have internal "normalled" wiring that patch cables can override.', 'Moog, Buchla, ARP, Prophet-5, DX7, Juno, TB-303, M1 and virtual analogues defined styles.'],
      de: ['Eine typische Stimme: <b>Oszillator → Filter → Verstärker</b>, moduliert von <b>Hüllkurven</b> und <b>LFO</b>.', 'Wir trennen <b>Audiosignale</b> von <b>Steuersignalen</b> (CV, Gate, Trigger).', 'Standard <b>1 V/Oktave</b>: +1 V = eine Oktave höher (Moog, meist Eurorack).', 'Halbmodulare haben eine interne „normalisierte" Verkabelung, die Patchkabel überschreiben.', 'Moog, Buchla, ARP, Prophet-5, DX7, Juno, TB-303, M1 und virtuell-analoge Synths prägten Stile.'],
      ja: ['典型的なボイス：<b>オシレーター→フィルター→アンプ</b>、そこに<b>エンベロープ</b>と<b>LFO</b>が変調をかける。', '<b>オーディオ信号</b>と<b>制御信号</b>（CV・ゲート・トリガー）を区別する。', '<b>1 V/オクターブ</b>規格：1 V加えると1オクターブ上がる（Moog、多くのユーロラック）。', 'セミモジュラーは内部で「ノーマライズ」配線されており、パッチケーブルで上書きできる。', 'Moog、Buchla、ARP、Prophet-5、DX7、Juno、TB-303、M1、バーチャルアナログがスタイルを作った。']
    },
    sec: [
      {
        h: { es: 'Los bloques básicos', en: 'The building blocks', de: 'Die Grundbausteine', ja: '基本ブロック' },
        b: {
          es: `<ul><li><b>VCO</b> (oscilador controlado por voltaje): genera la onda y define la <b>altura</b>.</li><li><b>Mezclador</b>: combina osciladores, sub-oscilador, ruido.</li><li><b>VCF</b> (filtro): esculpe el <b>timbre</b> quitando o resaltando frecuencias.</li><li><b>VCA</b> (amplificador): controla el <b>volumen</b> en el tiempo.</li><li><b>EG</b> (generador de envolvente, ADSR): dibuja la forma temporal de una nota cada vez que se presiona una tecla.</li><li><b>LFO</b> (oscilador de baja frecuencia): movimiento periódico (vibrato, trémolo, wah).</li></ul>
<p>Este esquema, consolidado por el <b>Minimoog</b> (1970), es la base de la <b>síntesis sustractiva</b>: partimos de una onda rica y le restamos con el filtro. El 90% de los sintes que vas a encontrar —analógicos o plugins— siguen esta arquitectura con variaciones.</p>
<p>El primer reflejo de un sintesista frente a un instrumento nuevo debería ser identificar estos bloques y <b>cómo están conectados</b>: de qué fuente a qué destino puede ir cada modulación.</p>`,
          en: `<ul><li><b>VCO</b> (voltage-controlled oscillator): generates the wave and sets the <b>pitch</b>.</li><li><b>Mixer</b>: combines oscillators, sub-oscillator, noise.</li><li><b>VCF</b> (filter): sculpts <b>timbre</b> by removing or emphasising frequencies.</li><li><b>VCA</b> (amplifier): controls <b>volume</b> over time.</li><li><b>EG</b> (envelope generator, ADSR): draws the time shape of a note each time a key is pressed.</li><li><b>LFO</b> (low-frequency oscillator): periodic movement (vibrato, tremolo, wah).</li></ul>
<p>This layout, consolidated by the <b>Minimoog</b> (1970), is the basis of <b>subtractive synthesis</b>: start from a rich wave and subtract with the filter. 90% of the synths you'll meet — hardware or plugins — follow this architecture with variations.</p>
<p>A synthesist's first reflex with a new instrument should be to identify these blocks and <b>how they are connected</b>: which source can modulate which destination.</p>`,
          de: `<ul><li><b>VCO</b> (spannungsgesteuerter Oszillator): erzeugt die Welle und bestimmt die <b>Tonhöhe</b>.</li><li><b>Mixer</b>: mischt Oszillatoren, Suboszillator, Rauschen.</li><li><b>VCF</b> (Filter): formt die <b>Klangfarbe</b>, indem es Frequenzen entfernt oder betont.</li><li><b>VCA</b> (Verstärker): steuert die <b>Lautstärke</b> über die Zeit.</li><li><b>EG</b> (Hüllkurvengenerator, ADSR): zeichnet bei jedem Tastendruck den zeitlichen Verlauf.</li><li><b>LFO</b> (Niederfrequenzoszillator): periodische Bewegung (Vibrato, Tremolo, Wah).</li></ul>
<p>Dieses Schema, durch den <b>Minimoog</b> (1970) etabliert, ist die Basis der <b>subtraktiven Synthese</b>: Man startet mit einer reichen Welle und zieht mit dem Filter ab. 90 % aller Synths – Hardware oder Plugin – folgen dieser Architektur.</p>
<p>Erster Reflex bei einem neuen Instrument: diese Blöcke finden und herausfinden, <b>wie sie verbunden sind</b> – welche Quelle welches Ziel modulieren kann.</p>`,
          ja: `<ul><li><b>VCO</b>（電圧制御オシレーター）：波形を作り<b>音高</b>を決める。</li><li><b>ミキサー</b>：オシレーター、サブオシレーター、ノイズを混ぜる。</li><li><b>VCF</b>（フィルター）：周波数を削ったり強調したりして<b>音色</b>を彫刻する。</li><li><b>VCA</b>（アンプ）：<b>音量</b>の時間変化を制御する。</li><li><b>EG</b>（エンベロープ・ジェネレーター、ADSR）：鍵盤を押すたびに音の時間的な形を描く。</li><li><b>LFO</b>（低周波オシレーター）：周期的な動き（ビブラート、トレモロ、ワウ）。</li></ul>
<p><b>ミニモーグ</b>（1970年）が確立したこの構成が<b>減算合成</b>の基本です。豊かな波形から始めてフィルターで削る。ハードでもプラグインでも、出会うシンセの9割はこの構造のバリエーションです。</p>
<p>新しい楽器に触れたら、まずこれらのブロックと<b>その接続</b>（どのソースがどの送り先を変調できるか）を見極めるのがシンセ奏者の反射であるべきです。</p>`
        }
      },
      {
        h: { es: 'Control por voltaje: CV, gate y trigger', en: 'Voltage control: CV, gate and trigger', de: 'Spannungssteuerung: CV, Gate und Trigger', ja: '電圧制御：CV・ゲート・トリガー' },
        b: {
          es: `<p>La gran idea de Robert Moog y Don Buchla en los 60 fue que <b>cualquier parámetro se controle con un voltaje</b>. Así, la salida de un módulo puede controlar a otro: una envolvente puede abrir un filtro, un LFO puede mover la altura, el teclado puede mover el corte del filtro.</p>
<ul><li><b>CV de altura</b>: en el estándar <b>1 V/oct</b>, cada voltio es una octava (1/12 V = un semitono). Korg y Yamaha usaban <b>Hz/V</b> (lineal), incompatible sin convertidor.</li><li><b>Gate</b>: señal alta mientras la tecla está presionada; dispara y sostiene envolventes.</li><li><b>Trigger</b>: pulso corto que marca el inicio de un evento (percusión, reinicio de LFO).</li></ul>
<p>En un sinte digital o plugin la idea es la misma, pero los "voltajes" son números y las conexiones se hacen en una <b>matriz de modulación</b>. Pensar en términos de <b>fuente → cantidad → destino</b> es la llave para entender cualquier instrumento.</p>`,
          en: `<p>Robert Moog's and Don Buchla's big idea in the 1960s was that <b>any parameter can be controlled by a voltage</b>. So one module's output can control another: an envelope opens a filter, an LFO moves pitch, the keyboard moves the filter cutoff.</p>
<ul><li><b>Pitch CV</b>: in the <b>1 V/oct</b> standard, each volt is an octave (1/12 V = a semitone). Korg and Yamaha used <b>Hz/V</b> (linear), incompatible without a converter.</li><li><b>Gate</b>: high while the key is held; starts and sustains envelopes.</li><li><b>Trigger</b>: a short pulse marking the start of an event (percussion, LFO reset).</li></ul>
<p>In a digital synth or plugin the idea is identical, but the "voltages" are numbers and connections are made in a <b>modulation matrix</b>. Thinking in terms of <b>source → amount → destination</b> is the key to understanding any instrument.</p>`,
          de: `<p>Die große Idee von Robert Moog und Don Buchla in den 60ern: <b>Jeder Parameter wird über eine Spannung gesteuert</b>. So steuert der Ausgang eines Moduls ein anderes: Eine Hüllkurve öffnet ein Filter, ein LFO bewegt die Tonhöhe, die Tastatur verschiebt die Grenzfrequenz.</p>
<ul><li><b>Tonhöhen-CV</b>: Beim Standard <b>1 V/Okt</b> ist jedes Volt eine Oktave (1/12 V = Halbton). Korg und Yamaha nutzten <b>Hz/V</b> (linear), ohne Wandler inkompatibel.</li><li><b>Gate</b>: hoch, solange die Taste gedrückt ist; startet und hält Hüllkurven.</li><li><b>Trigger</b>: kurzer Impuls für den Beginn eines Ereignisses (Percussion, LFO-Reset).</li></ul>
<p>In Digitalsynths oder Plugins ist die Idee gleich, nur sind die „Spannungen" Zahlen und Verbindungen entstehen in einer <b>Modulationsmatrix</b>. Denken in <b>Quelle → Menge → Ziel</b> ist der Schlüssel zu jedem Instrument.</p>`,
          ja: `<p>1960年代のロバート・モーグとドン・ブックラの偉大な発想は、<b>あらゆるパラメーターを電圧で制御する</b>ことでした。こうしてあるモジュールの出力が別のモジュールを制御できます。エンベロープがフィルターを開き、LFOが音高を動かし、鍵盤がカットオフを動かす。</p>
<ul><li><b>ピッチCV</b>：<b>1 V/oct</b>規格では1 Vが1オクターブ（1/12 V＝半音）。コルグやヤマハは<b>Hz/V</b>（線形）を使い、変換器なしでは互換性がない。</li><li><b>ゲート</b>：鍵盤を押している間ハイになる信号。エンベロープを開始・持続させる。</li><li><b>トリガー</b>：イベントの開始を示す短いパルス（パーカッション、LFOリセット）。</li></ul>
<p>デジタルシンセやプラグインでも考え方は同じで、「電圧」が数値になり、接続は<b>モジュレーション・マトリクス</b>で行います。<b>ソース→量→送り先</b>で考えることが、どんな楽器も理解する鍵です。</p>`
        }
      },
      {
        h: { es: 'Modular, semimodular, normalizado', en: 'Modular, semi-modular, normalled', de: 'Modular, halbmodular, normalisiert', ja: 'モジュラー・セミモジュラー・ノーマライズ' },
        b: {
          es: `<p>Un <b>modular</b> (Moog 55, Buchla 100, Eurorack) no tiene conexiones fijas: cada módulo es independiente y el sonido existe solo cuando lo "parcheás". Máxima libertad, curva de aprendizaje alta.</p>
<p>Un sinte <b>normalizado</b> (Minimoog, Juno, la mayoría de plugins) tiene el camino de señal fijo, con perillas para elegir cuánto de cada cosa.</p>
<p>Un <b>semimodular</b> (ARP 2600, MS-20, Moog Mother-32, Make Noise 0-Coast) suena sin cables gracias al cableado "normalizado", pero cada punto tiene un jack: insertar un cable <b>rompe la normalización</b> y redirige la señal.</p>
<div class="tip">En el laboratorio "Sintetizador completo", seguí el diagrama de flujo de señal y probá desactivar mentalmente cada bloque: ¿qué pasa si el filtro está completamente abierto? ¿y si el sustain del VCA es 0?</div>`,
          en: `<p>A <b>modular</b> (Moog 55, Buchla 100, Eurorack) has no fixed connections: each module is independent and sound exists only when you patch it. Maximum freedom, steep learning curve.</p>
<p>A <b>normalled</b> synth (Minimoog, Juno, most plugins) has a fixed signal path, with knobs to choose how much of each thing.</p>
<p>A <b>semi-modular</b> (ARP 2600, MS-20, Moog Mother-32, Make Noise 0-Coast) makes sound without cables thanks to "normalled" wiring, but every point has a jack: inserting a cable <b>breaks the normalisation</b> and reroutes the signal.</p>
<div class="tip">In the "Full synthesizer" lab, follow the signal-flow diagram and try mentally disabling each block: what happens if the filter is fully open? And if the VCA sustain is 0?</div>`,
          de: `<p>Ein <b>Modularsystem</b> (Moog 55, Buchla 100, Eurorack) hat keine festen Verbindungen: Jedes Modul ist unabhängig, Klang entsteht erst durch Patchen. Maximale Freiheit, steile Lernkurve.</p>
<p>Ein <b>normalisierter</b> Synth (Minimoog, Juno, die meisten Plugins) hat einen festen Signalweg mit Reglern für die Anteile.</p>
<p>Ein <b>Halbmodular</b> (ARP 2600, MS-20, Moog Mother-32, Make Noise 0-Coast) klingt ohne Kabel dank interner Normalisierung, doch jeder Punkt hat eine Buchse: Ein Kabel <b>bricht die Normalisierung</b> und leitet das Signal um.</p>
<div class="tip">Folge im Labor „Vollständiger Synth" dem Signalflussdiagramm und deaktiviere gedanklich jeden Block: Was passiert bei ganz offenem Filter? Und bei VCA-Sustain 0?</div>`,
          ja: `<p><b>モジュラー</b>（Moog 55、Buchla 100、ユーロラック）には固定配線がありません。各モジュールは独立し、パッチして初めて音が出ます。自由度は最大、学習曲線は急。</p>
<p><b>ノーマライズド</b>なシンセ（ミニモーグ、Juno、多くのプラグイン）は信号経路が固定で、つまみで各要素の量を選びます。</p>
<p><b>セミモジュラー</b>（ARP 2600、MS-20、Moog Mother-32、Make Noise 0-Coast）は内部の「ノーマライズ」配線でケーブルなしでも鳴りますが、各ポイントにジャックがあり、ケーブルを挿すと<b>ノーマライズが切れて</b>信号が経路変更されます。</p>
<div class="tip">「フル減算シンセ」ラボで信号フロー図をたどり、各ブロックを頭の中で無効にしてみよう。フィルターが全開なら？VCAのサステインが0なら？</div>`
        }
      },
      {
        h: { es: 'Breve historia en 12 instrumentos', en: 'A brief history in 12 instruments', de: 'Kurze Geschichte in 12 Instrumenten', ja: '12台でたどる簡単な歴史' },
        b: {
          es: `<table><tr><th>Año</th><th>Instrumento</th><th>Aporte</th></tr>
<tr><td>1920</td><td>Theremín</td><td>Primer instrumento electrónico popular; control sin contacto.</td></tr>
<tr><td>1935</td><td>Órgano Hammond</td><td>Síntesis aditiva electromecánica (ruedas fónicas).</td></tr>
<tr><td>1964–65</td><td>Moog modular / Buchla 100</td><td>Control por voltaje. "East coast" (sustractiva) vs "West coast" (wavefolding, compuertas de bajo paso).</td></tr>
<tr><td>1970</td><td>Minimoog</td><td>El sinte portátil normalizado; filtro ladder de 24 dB.</td></tr>
<tr><td>1971</td><td>ARP 2600 / EMS VCS3</td><td>Semimodulares educativos y experimentales.</td></tr>
<tr><td>1978</td><td>Sequential Prophet-5</td><td>Polifónico con memoria de patches (microprocesador).</td></tr>
<tr><td>1981</td><td>Roland TB-303 / TR-808</td><td>Fracaso comercial que creó el acid house y el hip-hop electrónico.</td></tr>
<tr><td>1982–84</td><td>Roland Juno-60/106</td><td>DCO estables, chorus legendario, accesible.</td></tr>
<tr><td>1983</td><td>Yamaha DX7 + MIDI</td><td>FM digital masiva; nace el estándar MIDI.</td></tr>
<tr><td>1988</td><td>Korg M1</td><td>Workstation de samples (PCM) + efectos.</td></tr>
<tr><td>1995</td><td>Clavia Nord Lead</td><td>Analógico virtual (VA): modelado digital del analógico.</td></tr>
<tr><td>2000s→</td><td>Plugins y Eurorack</td><td>Síntesis en software (Massive, Serum, Vital) y renacimiento modular.</td></tr></table>`,
          en: `<table><tr><th>Year</th><th>Instrument</th><th>Contribution</th></tr>
<tr><td>1920</td><td>Theremin</td><td>First popular electronic instrument; contactless control.</td></tr>
<tr><td>1935</td><td>Hammond organ</td><td>Electromechanical additive synthesis (tonewheels).</td></tr>
<tr><td>1964–65</td><td>Moog modular / Buchla 100</td><td>Voltage control. "East coast" (subtractive) vs "West coast" (wavefolding, low-pass gates).</td></tr>
<tr><td>1970</td><td>Minimoog</td><td>The portable normalled synth; 24 dB ladder filter.</td></tr>
<tr><td>1971</td><td>ARP 2600 / EMS VCS3</td><td>Educational and experimental semi-modulars.</td></tr>
<tr><td>1978</td><td>Sequential Prophet-5</td><td>Polyphonic with patch memory (microprocessor).</td></tr>
<tr><td>1981</td><td>Roland TB-303 / TR-808</td><td>Commercial flops that created acid house and electronic hip-hop.</td></tr>
<tr><td>1982–84</td><td>Roland Juno-60/106</td><td>Stable DCOs, legendary chorus, affordable.</td></tr>
<tr><td>1983</td><td>Yamaha DX7 + MIDI</td><td>Mass-market digital FM; the MIDI standard is born.</td></tr>
<tr><td>1988</td><td>Korg M1</td><td>Sample-based (PCM) workstation + effects.</td></tr>
<tr><td>1995</td><td>Clavia Nord Lead</td><td>Virtual analogue (VA): digital modelling of analogue.</td></tr>
<tr><td>2000s→</td><td>Plugins and Eurorack</td><td>Software synthesis (Massive, Serum, Vital) and the modular revival.</td></tr></table>`,
          de: `<table><tr><th>Jahr</th><th>Instrument</th><th>Beitrag</th></tr>
<tr><td>1920</td><td>Theremin</td><td>Erstes populäres elektronisches Instrument; berührungslos.</td></tr>
<tr><td>1935</td><td>Hammond-Orgel</td><td>Elektromechanische additive Synthese (Tonräder).</td></tr>
<tr><td>1964–65</td><td>Moog Modular / Buchla 100</td><td>Spannungssteuerung. „East Coast" (subtraktiv) vs. „West Coast" (Wavefolding, Low-Pass-Gates).</td></tr>
<tr><td>1970</td><td>Minimoog</td><td>Der tragbare normalisierte Synth; 24-dB-Kaskadenfilter.</td></tr>
<tr><td>1971</td><td>ARP 2600 / EMS VCS3</td><td>Halbmodulare für Lehre und Experiment.</td></tr>
<tr><td>1978</td><td>Sequential Prophet-5</td><td>Polyphon mit Patchspeicher (Mikroprozessor).</td></tr>
<tr><td>1981</td><td>Roland TB-303 / TR-808</td><td>Kommerzielle Flops, die Acid House und elektronischen Hip-Hop schufen.</td></tr>
<tr><td>1982–84</td><td>Roland Juno-60/106</td><td>Stabile DCOs, legendärer Chorus, erschwinglich.</td></tr>
<tr><td>1983</td><td>Yamaha DX7 + MIDI</td><td>Digitale FM für die Masse; der MIDI-Standard entsteht.</td></tr>
<tr><td>1988</td><td>Korg M1</td><td>Sample-basierte (PCM) Workstation + Effekte.</td></tr>
<tr><td>1995</td><td>Clavia Nord Lead</td><td>Virtuell-analog (VA): digitale Nachbildung von Analog.</td></tr>
<tr><td>2000er→</td><td>Plugins und Eurorack</td><td>Software-Synthese (Massive, Serum, Vital) und Modular-Renaissance.</td></tr></table>`,
          ja: `<table><tr><th>年</th><th>楽器</th><th>功績</th></tr>
<tr><td>1920</td><td>テルミン</td><td>最初の普及した電子楽器。非接触で演奏。</td></tr>
<tr><td>1935</td><td>ハモンドオルガン</td><td>電気機械式の加算合成（トーンホイール）。</td></tr>
<tr><td>1964–65</td><td>Moogモジュラー／Buchla 100</td><td>電圧制御。「イーストコースト」（減算）対「ウエストコースト」（ウェーブフォールディング、ローパスゲート）。</td></tr>
<tr><td>1970</td><td>ミニモーグ</td><td>持ち運べるノーマライズド・シンセ。24 dBラダーフィルター。</td></tr>
<tr><td>1971</td><td>ARP 2600／EMS VCS3</td><td>教育・実験向けのセミモジュラー。</td></tr>
<tr><td>1978</td><td>Sequential Prophet-5</td><td>パッチメモリー付きポリフォニック（マイクロプロセッサー）。</td></tr>
<tr><td>1981</td><td>Roland TB-303／TR-808</td><td>商業的失敗が、アシッドハウスとエレクトロ・ヒップホップを生んだ。</td></tr>
<tr><td>1982–84</td><td>Roland Juno-60/106</td><td>安定したDCO、伝説のコーラス、手頃な価格。</td></tr>
<tr><td>1983</td><td>Yamaha DX7＋MIDI</td><td>大衆向けデジタルFM。MIDI規格誕生。</td></tr>
<tr><td>1988</td><td>Korg M1</td><td>サンプル（PCM）ベースのワークステーション＋エフェクト。</td></tr>
<tr><td>1995</td><td>Clavia Nord Lead</td><td>バーチャルアナログ（VA）：アナログのデジタル・モデリング。</td></tr>
<tr><td>2000年代→</td><td>プラグインとユーロラック</td><td>ソフトウェア合成（Massive、Serum、Vital）とモジュラーの復興。</td></tr></table>`
        }
      }
    ],
    ex: {
      es: ['En el sinte completo, cargá INIT y hacé sonar una nota. Luego llevá el corte a 200 Hz y la resonancia a 15. Describí el cambio.', 'Poné el sustain de la envolvente de amplitud en 0 y el decay en 300 ms: ¿qué tipo de instrumento evoca?', 'Recorré los presets y para cada uno escribí qué bloques son los responsables principales del carácter (osc, filtro, envolvente, LFO).', 'Dibujá en papel el diagrama de bloques de un sinte que tengas (o de un plugin): fuentes, destinos y la matriz de modulación.', 'Investigá: ¿qué diferencia hay entre un VCO y un DCO? ¿Por qué el Juno usó DCOs?'],
      en: ['In the full synth, load INIT and play a note. Then set cutoff to 200 Hz and resonance to 15. Describe the change.', 'Set the amp envelope sustain to 0 and decay to 300 ms: what kind of instrument does it evoke?', 'Go through the presets and for each one write which blocks mainly create its character (osc, filter, envelope, LFO).', 'Draw on paper the block diagram of a synth you own (or a plugin): sources, destinations and the mod matrix.', 'Research: what is the difference between a VCO and a DCO? Why did the Juno use DCOs?'],
      de: ['Lade im Synth INIT und spiele eine Note. Stelle dann Cutoff auf 200 Hz und Resonanz auf 15. Beschreibe die Änderung.', 'Setze Sustain der Lautstärke-Hüllkurve auf 0 und Decay auf 300 ms: Welches Instrument klingt an?', 'Gehe die Presets durch und notiere, welche Blöcke den Charakter prägen (Osz, Filter, Hüllkurve, LFO).', 'Zeichne das Blockschaltbild eines Synths, den du besitzt (oder eines Plugins): Quellen, Ziele, Modulationsmatrix.', 'Recherche: Was unterscheidet VCO und DCO? Warum nutzte der Juno DCOs?'],
      ja: ['フルシンセでINITを読み込み1音鳴らす。次にカットオフを200 Hz、レゾナンスを15に。変化を言葉で説明しよう。', 'アンプ・エンベロープのサステインを0、ディケイを300 msに。どんな楽器を連想する？', 'プリセットを順に試し、それぞれの個性を主に作っているブロック（OSC・フィルター・エンベロープ・LFO）を書き出そう。', '手持ちのシンセ（またはプラグイン）のブロック図を紙に描こう：ソース、送り先、モジュレーション・マトリクス。', '調べよう：VCOとDCOの違いは？なぜJunoはDCOを採用した？']
    },
    deep: {
      es: `<h3>East coast vs. West coast</h3>
<p>Moog (Nueva York) popularizó la síntesis <b>sustractiva</b> con teclado tradicional. Buchla (California) evitó deliberadamente el teclado de piano y exploró la síntesis <b>"de abajo hacia arriba"</b>: osciladores complejos con <b>FM y wavefolding</b> que generan armónicos, y <b>low-pass gates</b> (vactrol) que combinan filtro y VCA con una respuesta orgánica tipo "pluck". Hoy el Eurorack mezcla ambas filosofías.</p>
<h3>Polifonía y asignación de voces</h3>
<p>Un sinte <b>monofónico</b> toca una nota a la vez; uno <b>parafónico</b> tiene varios osciladores con altura independiente pero comparte filtro y VCA; uno <b>polifónico</b> duplica la cadena completa por voz. Con pocas voces, el algoritmo de <b>asignación</b> decide qué nota se roba: la más vieja, la más grave, la más baja en volumen… En modo mono, la <b>prioridad</b> (última, más grave, más aguda) cambia el fraseo: los bajos Moog usaban prioridad grave, la 303 última.</p>
<h3>Analógico, digital y "VA"</h3>
<p>En un analógico los osciladores derivan levemente, los filtros saturan de forma no lineal y cada voz es un poco distinta: ese "desorden" da vida. Un <b>VA</b> lo simula con modelos matemáticos; hoy, técnicas como los filtros de retardo cero (ZDF) y el oversampling hacen la diferencia casi imperceptible en una mezcla. El criterio útil no es "analógico es mejor", sino entender qué característica concreta (deriva, saturación, respuesta del filtro, envolventes rápidas) produce el carácter que buscás.</p>`,
      en: `<h3>East coast vs West coast</h3>
<p>Moog (New York) popularised <b>subtractive</b> synthesis with a traditional keyboard. Buchla (California) deliberately avoided the piano keyboard and explored <b>"bottom-up"</b> synthesis: complex oscillators with <b>FM and wavefolding</b> that generate harmonics, and <b>low-pass gates</b> (vactrol) combining filter and VCA with an organic "pluck" response. Today Eurorack blends both philosophies.</p>
<h3>Polyphony and voice allocation</h3>
<p>A <b>monophonic</b> synth plays one note at a time; a <b>paraphonic</b> one has several independently pitched oscillators sharing one filter and VCA; a <b>polyphonic</b> one duplicates the whole chain per voice. With few voices, the <b>allocation</b> algorithm decides which note gets stolen: the oldest, lowest, quietest… In mono mode, <b>note priority</b> (last, low, high) changes phrasing: Moog basses used low priority, the 303 last-note.</p>
<h3>Analogue, digital and "VA"</h3>
<p>In an analogue synth the oscillators drift slightly, filters saturate non-linearly and each voice is a little different: that "disorder" brings life. A <b>VA</b> simulates it with mathematical models; today zero-delay-feedback (ZDF) filters and oversampling make the difference nearly imperceptible in a mix. The useful criterion is not "analogue is better", but understanding which concrete trait (drift, saturation, filter response, snappy envelopes) produces the character you want.</p>`,
      de: `<h3>East Coast vs. West Coast</h3>
<p>Moog (New York) machte die <b>subtraktive</b> Synthese mit klassischer Tastatur populär. Buchla (Kalifornien) mied bewusst die Klaviatur und erforschte <b>„Bottom-up"</b>-Synthese: komplexe Oszillatoren mit <b>FM und Wavefolding</b>, die Obertöne erzeugen, und <b>Low-Pass-Gates</b> (Vactrol), die Filter und VCA mit organischem „Pluck" kombinieren. Eurorack verbindet heute beide Philosophien.</p>
<h3>Polyphonie und Stimmenzuweisung</h3>
<p>Ein <b>monophoner</b> Synth spielt eine Note, ein <b>paraphoner</b> hat mehrere unabhängig gestimmte Oszillatoren mit gemeinsamem Filter/VCA, ein <b>polyphoner</b> verdoppelt die ganze Kette pro Stimme. Bei wenigen Stimmen entscheidet die <b>Zuweisung</b>, welche Note „geklaut" wird. Im Monomodus ändert die <b>Notenpriorität</b> (letzte, tiefste, höchste) die Phrasierung: Moog-Bässe nutzten Tiefpriorität, die 303 die letzte Note.</p>
<h3>Analog, digital und „VA"</h3>
<p>Analog driften Oszillatoren leicht, Filter sättigen nichtlinear, jede Stimme ist etwas anders: Diese „Unordnung" bringt Leben. Ein <b>VA</b> simuliert das mathematisch; heute machen ZDF-Filter und Oversampling den Unterschied im Mix fast unhörbar. Nützlich ist nicht „Analog ist besser", sondern zu verstehen, welches konkrete Merkmal (Drift, Sättigung, Filterverhalten, knackige Hüllkurven) den gewünschten Charakter erzeugt.</p>`,
      ja: `<h3>イーストコース対ウエストコースト</h3>
<p>Moog（ニューヨーク）は従来型の鍵盤で<b>減算</b>合成を広めました。Buchla（カリフォルニア）はあえてピアノ鍵盤を避け、<b>「ボトムアップ」</b>の合成を探求しました。倍音を生み出す<b>FMとウェーブフォールディング</b>を備えた複合オシレーターと、フィルターとVCAを組み合わせ有機的な「プラック」反応をする<b>ローパスゲート</b>（バクトロール）です。今日のユーロラックは両方の哲学を融合しています。</p>
<h3>ポリフォニーとボイス割り当て</h3>
<p><b>モノフォニック</b>は一度に1音、<b>パラフォニック</b>は独立した音高の複数オシレーターがフィルターとVCAを共有、<b>ポリフォニック</b>はボイスごとに全経路を複製します。ボイス数が少ないと<b>割り当て</b>アルゴリズムがどの音を奪うか決めます。モノモードでは<b>ノート優先</b>（後着・低音・高音）がフレージングを変え、Moogのベースは低音優先、303は後着優先でした。</p>
<h3>アナログ、デジタル、そして「VA」</h3>
<p>アナログではオシレーターがわずかにドリフトし、フィルターは非線形に歪み、各ボイスは少しずつ違います。その「不揃い」が生命感になります。<b>VA</b>はそれを数学モデルで再現し、今日ではZDFフィルターとオーバーサンプリングにより、ミックス内での差はほぼ判別不能です。大事なのは「アナログが上」ではなく、どの具体的特徴（ドリフト、飽和、フィルター特性、キレのあるエンベロープ）が狙うキャラクターを生むのかを理解することです。</p>`
    },
    read: ['Mark Vail — <i>The Synthesizer</i> (Oxford, 2014)', 'Trevor Pinch & Frank Trocco — <i>Analog Days</i>', 'Allen Strange — <i>Electronic Music: Systems, Techniques and Controls</i>', 'Kent Spong / Roland — manuales originales SH-101, Juno-106 (excelentes como tutoriales)'],
    quiz: [
      { q: { es: '¿Qué bloque define principalmente la altura?', en: 'Which block mainly sets the pitch?', de: 'Welcher Block bestimmt hauptsächlich die Tonhöhe?', ja: '主に音高を決めるブロックは？' }, o: { es: ['VCF', 'VCA', 'VCO', 'LFO'], en: ['VCF', 'VCA', 'VCO', 'LFO'], de: ['VCF', 'VCA', 'VCO', 'LFO'], ja: ['VCF', 'VCA', 'VCO', 'LFO'] }, c: 2, x: { es: 'El oscilador genera la frecuencia fundamental.', en: 'The oscillator generates the fundamental frequency.', de: 'Der Oszillator erzeugt die Grundfrequenz.', ja: 'オシレーターが基本周波数を生成します。' } },
      { q: { es: 'En el estándar 1 V/oct, ¿cuánto voltaje sube un semitono?', en: 'In the 1 V/oct standard, how much voltage raises a semitone?', de: 'Wie viel Spannung entspricht bei 1 V/Okt einem Halbton?', ja: '1 V/oct規格で半音上げる電圧は？' }, o: { es: ['1 V', '0,5 V', '1/12 V ≈ 83 mV', '12 V'], en: ['1 V', '0.5 V', '1/12 V ≈ 83 mV', '12 V'], de: ['1 V', '0,5 V', '1/12 V ≈ 83 mV', '12 V'], ja: ['1 V', '0.5 V', '1/12 V ≈ 83 mV', '12 V'] }, c: 2, x: { es: 'Una octava son 12 semitonos → 1 V/12.', en: 'An octave is 12 semitones → 1 V/12.', de: 'Eine Oktave hat 12 Halbtöne → 1 V/12.', ja: '1オクターブ＝12半音→1 V/12。' } },
      { q: { es: '¿Qué señal se mantiene alta mientras la tecla está apretada?', en: 'Which signal stays high while the key is held?', de: 'Welches Signal bleibt hoch, solange die Taste gedrückt ist?', ja: '鍵盤を押している間ハイを保つ信号は？' }, o: { es: ['Trigger', 'Gate', 'Clock', 'CV de altura'], en: ['Trigger', 'Gate', 'Clock', 'Pitch CV'], de: ['Trigger', 'Gate', 'Clock', 'Tonhöhen-CV'], ja: ['トリガー', 'ゲート', 'クロック', 'ピッチCV'] }, c: 1, x: { es: 'El gate dura lo que dura la nota; el trigger es un pulso corto.', en: 'The gate lasts as long as the note; a trigger is a short pulse.', de: 'Das Gate dauert so lange wie die Note; ein Trigger ist kurz.', ja: 'ゲートは音の長さだけ続き、トリガーは短いパルスです。' } },
      { q: { es: '¿Qué instrumento introdujo masivamente la FM digital y coincidió con el nacimiento del MIDI?', en: 'Which instrument brought digital FM to the masses alongside the birth of MIDI?', de: 'Welches Instrument brachte digitale FM zur Masse, zeitgleich mit MIDI?', ja: 'デジタルFMを大衆化し、MIDI誕生と同時期だった楽器は？' }, o: { es: ['Minimoog', 'Prophet-5', 'Yamaha DX7', 'Korg M1'], en: ['Minimoog', 'Prophet-5', 'Yamaha DX7', 'Korg M1'], de: ['Minimoog', 'Prophet-5', 'Yamaha DX7', 'Korg M1'], ja: ['ミニモーグ', 'Prophet-5', 'Yamaha DX7', 'Korg M1'] }, c: 2, x: { es: 'El DX7 (1983) y MIDI 1.0 (1983).', en: 'DX7 (1983) and MIDI 1.0 (1983).', de: 'DX7 (1983) und MIDI 1.0 (1983).', ja: 'DX7（1983年）とMIDI 1.0（1983年）。' } },
      { q: { es: 'En un semimodular, insertar un cable en un jack…', en: 'In a semi-modular, inserting a cable into a jack…', de: 'Beim Halbmodular bewirkt ein eingestecktes Kabel…', ja: 'セミモジュラーでジャックにケーブルを挿すと…' }, o: { es: ['Apaga el instrumento', 'Rompe la normalización y redirige la señal', 'No tiene efecto', 'Duplica la polifonía'], en: ['Turns the instrument off', 'Breaks the normalisation and reroutes the signal', 'Has no effect', 'Doubles polyphony'], de: ['Schaltet das Gerät aus', 'Bricht die Normalisierung und leitet um', 'Keine Wirkung', 'Verdoppelt die Polyphonie'], ja: ['電源が切れる', 'ノーマライズが切れて信号が経路変更される', '何も起きない', 'ポリフォニーが倍になる'] }, c: 1, x: { es: 'Los jacks con conmutador desconectan el cableado interno por defecto.', en: 'Switched jacks disconnect the default internal wiring.', de: 'Schaltbuchsen trennen die interne Standardverbindung.', ja: 'スイッチ付きジャックが内部の既定配線を切り離します。' } }
    ]
  });

  /* ===================== 4. OSCILADORES ===================== */
  M({
    id: 'osc', lv: 1, lab: ['osc', 'dsp'],
    title: { es: 'Osciladores en profundidad', en: 'Oscillators in depth', de: 'Oszillatoren im Detail', ja: 'オシレーターを深く' },
    sum: { es: 'Desafinación, unísono y supersaw, sincronía dura, PWM, sub-oscilador, deriva analógica y el problema del aliasing.', en: 'Detuning, unison and supersaw, hard sync, PWM, sub-oscillator, analogue drift and the aliasing problem.', de: 'Verstimmung, Unisono und Supersaw, Hard Sync, PWM, Suboszillator, analoge Drift und das Aliasing-Problem.', ja: 'デチューン、ユニゾンとスーパーソウ、ハードシンク、PWM、サブオシレーター、アナログのドリフト、エイリアシング問題。' },
    key: {
      es: ['Dos osciladores levemente desafinados producen batidos que "engordan" el sonido.', 'El <b>unísono</b> apila muchas voces desafinadas: base del <b>supersaw</b> (Roland JP-8000).', 'En <b>hard sync</b>, el oscilador esclavo se reinicia con cada ciclo del maestro: barrer su frecuencia crea el típico sonido "rasgado".', '<b>PWM</b>: modular el ancho de pulso crea movimiento y un coro natural.', 'Un oscilador digital ingenuo produce <b>aliasing</b>: armónicos por encima de Nyquist se reflejan como tonos falsos.'],
      en: ['Two slightly detuned oscillators produce beating that "fattens" the sound.', '<b>Unison</b> stacks many detuned voices: the basis of the <b>supersaw</b> (Roland JP-8000).', 'With <b>hard sync</b> the slave oscillator resets on every master cycle: sweeping its frequency gives the typical "tearing" sound.', '<b>PWM</b>: modulating pulse width creates motion and natural chorus.', 'A naive digital oscillator produces <b>aliasing</b>: harmonics above Nyquist fold back as false tones.'],
      de: ['Zwei leicht verstimmte Oszillatoren erzeugen Schwebungen, die den Klang „andicken".', '<b>Unisono</b> stapelt viele verstimmte Stimmen: Basis des <b>Supersaw</b> (Roland JP-8000).', 'Bei <b>Hard Sync</b> wird der Slave bei jedem Master-Zyklus zurückgesetzt: Sein Frequenz-Sweep ergibt den typischen „reißenden" Klang.', '<b>PWM</b>: Pulsbreitenmodulation erzeugt Bewegung und natürlichen Chorus.', 'Ein naiver Digitaloszillator erzeugt <b>Aliasing</b>: Obertöne über Nyquist spiegeln sich als falsche Töne.'],
      ja: ['わずかにデチューンした2つのオシレーターはうなりを生み、音を「太く」する。', '<b>ユニゾン</b>は多数のデチューンしたボイスを重ねる：<b>スーパーソウ</b>（Roland JP-8000）の基本。', '<b>ハードシンク</b>ではスレーブがマスターの周期ごとにリセットされ、その周波数を動かすと独特の「裂ける」音になる。', '<b>PWM</b>：パルス幅の変調が動きと自然なコーラスを生む。', '素朴なデジタル・オシレーターは<b>エイリアシング</b>を生む：ナイキストを超えた倍音が偽の音として折り返す。']
    },
    sec: [
      {
        h: { es: 'Desafinación y unísono', en: 'Detune and unison', de: 'Verstimmung und Unisono', ja: 'デチューンとユニゾン' },
        b: {
          es: `<p>Con dos osciladores en la misma nota separados por unos cents, cada armónico n bate a una velocidad n veces mayor: el resultado es un movimiento rico y "ancho". Valores típicos: 3–8 cents para un pad cálido, 10–25 cents para un sonido "trance" o "reese" agresivo.</p>
<p>El <b>unísono</b> extiende la idea a 3, 5, 7 o más copias distribuidas simétricamente alrededor de la nota (<i>spread</i>), a menudo panoramizadas en estéreo. El <b>supersaw</b> del JP-8000 usaba 7 sierras con desafinación no lineal y un filtro pasa altos que mantenía el grave limpio.</p>
<div class="warn">Cuidado con el grave: muchas voces desafinadas en un bajo producen cancelaciones de fase impredecibles. Una técnica clásica es mantener el sub-bajo en una sola voz senoidal y desafinar solo las capas superiores.</div>
<p><b>Retrigger de fase</b>: si todos los osciladores arrancan en fase 0 en cada nota, el ataque es consistente y "pegador" (útil en bajos y percusión). Si la fase es libre (free-running), cada nota suena levemente distinta, más analógico.</p>`,
          en: `<p>With two oscillators on the same note a few cents apart, each harmonic n beats n times faster: the result is rich, "wide" motion. Typical values: 3–8 cents for a warm pad, 10–25 cents for an aggressive "trance" or "reese".</p>
<p><b>Unison</b> extends the idea to 3, 5, 7 or more copies spread symmetrically around the note (<i>spread</i>), often panned in stereo. The JP-8000 <b>supersaw</b> used 7 saws with non-linear detune plus a high-pass filter to keep the low end clean.</p>
<div class="warn">Careful with bass: many detuned voices in a bass cause unpredictable phase cancellation. A classic technique is to keep the sub in a single sine voice and detune only the upper layers.</div>
<p><b>Phase retrigger</b>: if all oscillators start at phase 0 on each note, the attack is consistent and punchy (useful for bass and percussion). With free-running phase every note sounds slightly different, more analogue.</p>`,
          de: `<p>Zwei Oszillatoren auf derselben Note, wenige Cent auseinander: Jeder Oberton n schwebt n-mal schneller – reiche, „breite" Bewegung. Typisch: 3–8 Cent für warme Pads, 10–25 Cent für aggressiven „Trance"- oder „Reese"-Sound.</p>
<p><b>Unisono</b> erweitert das auf 3, 5, 7 oder mehr Kopien, symmetrisch um die Note gespreizt (<i>Spread</i>), oft im Stereobild verteilt. Der <b>Supersaw</b> des JP-8000 nutzte 7 Sägezähne mit nichtlinearer Verstimmung plus Hochpass für einen sauberen Bass.</p>
<div class="warn">Vorsicht im Bass: Viele verstimmte Stimmen erzeugen unvorhersehbare Phasenauslöschungen. Klassisch: Sub als einzelne Sinusstimme, nur obere Schichten verstimmen.</div>
<p><b>Phasen-Retrigger</b>: Starten alle Oszillatoren bei jeder Note mit Phase 0, ist der Anschlag konsistent und knackig (gut für Bass und Percussion). Bei freilaufender Phase klingt jede Note etwas anders – analoger.</p>`,
          ja: `<p>同じ音で数セント離した2つのオシレーターでは、第n倍音がn倍速くうなります。結果は豊かで「広い」動き。目安：暖かいパッドは3〜8セント、攻撃的な「トランス」や「リース」は10〜25セント。</p>
<p><b>ユニゾン</b>はこれを3, 5, 7以上のコピーに拡張し、音程の周りに対称に広げ（<i>スプレッド</i>）、しばしばステレオに振ります。JP-8000の<b>スーパーソウ</b>は非線形デチューンの7本のノコギリ波と、低域をクリーンに保つハイパスを使っていました。</p>
<div class="warn">低音に注意：ベースで多数のデチューン・ボイスを使うと予測不能な位相キャンセルが起こります。古典的な手法は、サブを1本のサイン波に保ち、上のレイヤーだけデチューンすること。</div>
<p><b>位相リトリガー</b>：毎回全オシレーターが位相0から始まると、アタックが一定でパンチが出ます（ベースやパーカッション向き）。フリーランニングだと毎回わずかに違い、よりアナログ的です。</p>`
        }
      },
      {
        h: { es: 'Sincronía dura (hard sync)', en: 'Hard sync', de: 'Hard Sync', ja: 'ハードシンク' },
        b: {
          es: `<p>Dos osciladores: el <b>maestro</b> fija la altura percibida; el <b>esclavo</b> se reinicia a fase cero cada vez que el maestro completa un ciclo. Si el esclavo es más agudo, la forma resultante es un fragmento de su onda repetido al ritmo del maestro.</p>
<p>Al <b>barrer la frecuencia del esclavo</b> (con una envolvente o LFO) la altura no cambia, pero los armónicos se desplazan con un barrido tipo formante muy agresivo: es el sonido de "Let's Go" de The Cars o de muchos leads de los 80 (Prophet-5). En el lab, activá "Barrido por LFO" en modo sync.</p>
<p>La <b>soft sync</b> solo reinicia bajo ciertas condiciones o invierte la dirección, dando un efecto más suave y variable según el instrumento.</p>`,
          en: `<p>Two oscillators: the <b>master</b> sets the perceived pitch; the <b>slave</b> resets to phase zero every time the master completes a cycle. If the slave is higher, the result is a fragment of its wave repeated at the master's rate.</p>
<p><b>Sweeping the slave frequency</b> (with an envelope or LFO) keeps the pitch but moves the harmonics in a very aggressive formant-like sweep: the sound of The Cars' "Let's Go" or many 80s leads (Prophet-5). In the lab, enable "LFO sweep" in sync mode.</p>
<p><b>Soft sync</b> only resets under certain conditions or reverses direction, giving a gentler effect that varies per instrument.</p>`,
          de: `<p>Zwei Oszillatoren: Der <b>Master</b> bestimmt die gehörte Tonhöhe; der <b>Slave</b> springt bei jedem Master-Zyklus auf Phase null zurück. Ist der Slave höher, entsteht ein Fragment seiner Welle im Takt des Masters.</p>
<p><b>Sweept man die Slave-Frequenz</b> (per Hüllkurve oder LFO), bleibt die Tonhöhe, aber die Obertöne wandern in einem aggressiven formantartigen Sweep: der Klang von „Let's Go" (The Cars) oder vieler 80er-Leads (Prophet-5). Aktiviere im Labor „LFO-Sweep" im Sync-Modus.</p>
<p><b>Soft Sync</b> setzt nur unter bestimmten Bedingungen zurück oder kehrt die Richtung um – sanfter und je nach Instrument verschieden.</p>`,
          ja: `<p>2つのオシレーター：<b>マスター</b>が聞こえる音高を決め、<b>スレーブ</b>はマスターが1周期を終えるたびに位相0へリセットされます。スレーブが高いと、その波形の断片がマスターの周期で繰り返されます。</p>
<p>エンベロープやLFOで<b>スレーブの周波数を動かす</b>と、音高は変わらずに倍音がフォルマントのように攻撃的に移動します。The Carsの「Let's Go」や80年代のリード（Prophet-5）の音です。ラボのsyncモードで「LFOスイープ」を有効にしよう。</p>
<p><b>ソフトシンク</b>は特定の条件でのみリセットしたり向きを反転したりし、楽器によって異なる穏やかな効果になります。</p>`
        }
      },
      {
        h: { es: 'PWM, sub-oscilador y otras fuentes', en: 'PWM, sub-oscillator and other sources', de: 'PWM, Suboszillator und weitere Quellen', ja: 'PWM・サブオシレーター・その他のソース' },
        b: {
          es: `<p><b>PWM</b>: un LFO lento (0,3–2 Hz) modulando el ancho entre ~10% y 90% hace que los armónicos aparezcan y desaparezcan continuamente: suena como dos osciladores desafinados, con un solo oscilador. Un truco de implementación (que usa el lab): un pulso es la <b>resta de dos sierras desfasadas</b>; mover el desfase mueve el ancho.</p>
<p><b>Sub-oscilador</b>: una cuadrada una o dos octavas abajo, derivada del oscilador principal (divisor de frecuencia). Agrega peso sin desafinación ni cancelaciones.</p>
<p><b>Ruido y fuentes externas</b>: muchos sintes permiten entrar audio externo al filtro (voz, guitarra, batería) para procesarlo como si fuera un oscilador.</p>
<p><b>Deriva y "slop"</b>: los VCO analógicos se desafinan con la temperatura y tienen microvariaciones. Los sintes digitales modernos agregan un parámetro de <i>drift</i> o <i>analog</i> que reproduce esa inestabilidad aleatoria por voz.</p>`,
          en: `<p><b>PWM</b>: a slow LFO (0.3–2 Hz) modulating the width between ~10% and 90% makes harmonics appear and vanish continuously: it sounds like two detuned oscillators from just one. An implementation trick (used in the lab): a pulse is the <b>difference of two phase-shifted saws</b>; moving the offset moves the width.</p>
<p><b>Sub-oscillator</b>: a square one or two octaves below, derived from the main oscillator (frequency divider). Adds weight without detune or cancellation.</p>
<p><b>Noise and external sources</b>: many synths let you feed external audio into the filter (voice, guitar, drums) and process it as if it were an oscillator.</p>
<p><b>Drift and "slop"</b>: analogue VCOs detune with temperature and have micro-variations. Modern digital synths add a <i>drift</i> or <i>analog</i> parameter reproducing that random per-voice instability.</p>`,
          de: `<p><b>PWM</b>: Ein langsamer LFO (0,3–2 Hz) moduliert die Breite zwischen ~10 % und 90 %, Obertöne erscheinen und verschwinden ständig: klingt wie zwei verstimmte Oszillatoren aus einem. Umsetzungstrick (im Labor): Ein Puls ist die <b>Differenz zweier phasenverschobener Sägezähne</b>; die Verschiebung bestimmt die Breite.</p>
<p><b>Suboszillator</b>: ein Rechteck eine oder zwei Oktaven tiefer, vom Hauptoszillator abgeleitet (Frequenzteiler). Mehr Gewicht ohne Verstimmung oder Auslöschung.</p>
<p><b>Rauschen und externe Quellen</b>: Viele Synths erlauben externes Audio ins Filter (Stimme, Gitarre, Drums), um es wie einen Oszillator zu bearbeiten.</p>
<p><b>Drift und „Slop"</b>: Analoge VCOs verstimmen sich mit der Temperatur. Moderne Digitalsynths haben einen <i>Drift</i>- oder <i>Analog</i>-Parameter für diese zufällige Instabilität pro Stimme.</p>`,
          ja: `<p><b>PWM</b>：遅いLFO（0.3〜2 Hz）で幅を約10%〜90%の間で変調すると、倍音が絶えず現れては消えます。1つのオシレーターで2つをデチューンしたように聞こえます。実装の技（ラボで使用）：パルスは<b>位相をずらした2つのノコギリ波の差</b>であり、ずれを動かせば幅が動きます。</p>
<p><b>サブオシレーター</b>：メイン・オシレーターから分周で作る1〜2オクターブ下の矩形波。デチューンや打ち消しなしに重みを加えます。</p>
<p><b>ノイズと外部ソース</b>：多くのシンセは外部音声（声、ギター、ドラム）をフィルターに入れ、オシレーターのように加工できます。</p>
<p><b>ドリフトと「スロップ」</b>：アナログVCOは温度で音程がずれ、微小な揺らぎがあります。現代のデジタルシンセはボイスごとのランダムな不安定さを再現する<i>ドリフト</i>／<i>アナログ</i>パラメーターを備えています。</p>`
        }
      },
      {
        h: { es: 'Aliasing: el talón de Aquiles digital', en: 'Aliasing: the digital Achilles\' heel', de: 'Aliasing: die digitale Achillesferse', ja: 'エイリアシング：デジタルの弱点' },
        b: {
          es: `<p>Un sistema digital muestreado a <code>fs</code> solo puede representar frecuencias hasta <b>Nyquist = fs/2</b> (24 kHz a 48 kHz). Una sierra "ingenua" (una rampa calculada muestra a muestra) tiene armónicos infinitos; los que superan Nyquist se <b>reflejan</b> hacia abajo: un armónico a <code>fs/2 + Δ</code> aparece en <code>fs/2 − Δ</code>. Esos tonos no son armónicos de la nota y suenan como silbidos metálicos, sobre todo en notas agudas y barridos.</p>
<p>Soluciones: osciladores <b>limitados en banda</b> (tablas de onda por rango, BLIT, BLEP/PolyBLEP, que suavizan las discontinuidades), y <b>oversampling</b> (procesar a 2×–8× la frecuencia de muestreo y filtrar antes de reducir).</p>
<div class="tip">En el lab "Digital", compará el barrido ingenuo con el limitado en banda: en el primero vas a oír tonos que <b>bajan</b> mientras la nota sube. Eso es aliasing.</div>`,
          en: `<p>A digital system sampled at <code>fs</code> can only represent frequencies up to <b>Nyquist = fs/2</b> (24 kHz at 48 kHz). A "naive" saw (a ramp computed sample by sample) has infinite harmonics; those above Nyquist <b>fold back</b>: a harmonic at <code>fs/2 + Δ</code> appears at <code>fs/2 − Δ</code>. These tones are not harmonics of the note and sound like metallic whistles, especially on high notes and sweeps.</p>
<p>Solutions: <b>band-limited</b> oscillators (per-range wavetables, BLIT, BLEP/PolyBLEP which smooth discontinuities), and <b>oversampling</b> (processing at 2×–8× the sample rate and filtering before decimating).</p>
<div class="tip">In the "Digital" lab, compare the naive sweep with the band-limited one: in the first you'll hear tones going <b>down</b> while the note rises. That is aliasing.</div>`,
          de: `<p>Ein mit <code>fs</code> abgetastetes System kann nur Frequenzen bis <b>Nyquist = fs/2</b> darstellen (24 kHz bei 48 kHz). Eine „naive" Säge (Rampe pro Sample berechnet) hat unendlich viele Obertöne; die über Nyquist werden <b>gespiegelt</b>: Ein Oberton bei <code>fs/2 + Δ</code> erscheint bei <code>fs/2 − Δ</code>. Diese Töne sind keine Obertöne der Note und klingen wie metallisches Pfeifen, besonders bei hohen Noten und Sweeps.</p>
<p>Lösungen: <b>bandbegrenzte</b> Oszillatoren (Wavetables pro Bereich, BLIT, BLEP/PolyBLEP, die Sprünge glätten) und <b>Oversampling</b> (Verarbeitung mit 2×–8× Abtastrate und Filterung vor dem Heruntertakten).</p>
<div class="tip">Vergleiche im Labor „Digital" den naiven mit dem bandbegrenzten Sweep: Beim ersten hörst du Töne, die <b>fallen</b>, während die Note steigt. Das ist Aliasing.</div>`,
          ja: `<p>サンプリング周波数<code>fs</code>のデジタル系は<b>ナイキスト＝fs/2</b>（48 kHzなら24 kHz）までしか表せません。サンプルごとに計算した「素朴な」ノコギリ波は無限の倍音を持ち、ナイキストを超えたものは<b>折り返し</b>ます。<code>fs/2 + Δ</code>の倍音は<code>fs/2 − Δ</code>に現れます。これらは元の音の倍音ではなく、特に高音やスイープで金属的な口笛のように聞こえます。</p>
<p>対策：<b>帯域制限</b>オシレーター（音域ごとのウェーブテーブル、BLIT、不連続を滑らかにするBLEP/PolyBLEP）と、<b>オーバーサンプリング</b>（2〜8倍のレートで処理し、間引く前にフィルタリング）。</p>
<div class="tip">「デジタル」ラボで素朴なスイープと帯域制限スイープを比べよう。前者では音程が上がるのに<b>下がっていく</b>音が聞こえる。それがエイリアシングです。</div>`
        }
      }
    ],
    ex: {
      es: ['En el lab de osciladores (unísono), pasá de 1 a 9 voces con spread 20¢. ¿En qué punto deja de "engordar" y empieza a sonar desafinado?', 'Modo sync: dejá fija la nota y mové la relación de 1 a 6. Luego activá el barrido. Anotá en qué rango te gusta más.', 'Modo PWM: probá anchos de 50%, 25% y 5% sin LFO, después activá el LFO a 0,5 Hz con profundidad 60%.', 'En el lab "Digital", reproducí los dos barridos y describí el aliasing con tus palabras.', 'Diseño: hacé un "pad supersaw" en el sinte completo usando osc2 desafinado +12¢, ataque lento y filtro a 2 kHz.'],
      en: ['In the oscillator lab (unison), go from 1 to 9 voices with 20¢ spread. At what point does it stop "fattening" and start sounding out of tune?', 'Sync mode: keep the note fixed and move the ratio from 1 to 6. Then enable the sweep. Note which range you like best.', 'PWM mode: try 50%, 25% and 5% widths without LFO, then enable the LFO at 0.5 Hz with 60% depth.', 'In the "Digital" lab, play both sweeps and describe aliasing in your own words.', 'Design: make a "supersaw pad" in the full synth using osc 2 detuned +12¢, slow attack and filter at 2 kHz.'],
      de: ['Gehe im Oszillator-Labor (Unisono) mit 20¢ Spread von 1 auf 9 Stimmen. Ab wann wird es nicht mehr „dicker", sondern verstimmt?', 'Sync-Modus: Note fest, Verhältnis von 1 bis 6 bewegen, dann Sweep aktivieren. Welchen Bereich magst du?', 'PWM-Modus: 50 %, 25 % und 5 % ohne LFO, dann LFO mit 0,5 Hz und 60 % Tiefe.', 'Spiele im Labor „Digital" beide Sweeps und beschreibe Aliasing in eigenen Worten.', 'Design: „Supersaw-Pad" im Synth mit Osz 2 auf +12¢, langsamem Attack und Filter bei 2 kHz.'],
      ja: ['オシレーター・ラボ（ユニゾン）でスプレッド20¢のまま1〜9ボイスにしていこう。どこで「太さ」が止まり、音痴に聞こえ始める？', 'syncモード：音程を固定し、比率を1〜6に動かす。次にスイープを有効化。気に入った範囲をメモしよう。', 'PWMモード：LFOなしで幅50%・25%・5%を試し、次にLFOを0.5 Hz、深さ60%で有効化。', '「デジタル」ラボで2つのスイープを再生し、エイリアシングを自分の言葉で説明しよう。', 'デザイン：フルシンセでOSC2を+12¢デチューン、遅いアタック、フィルター2 kHzで「スーパーソウ・パッド」を作ろう。']
    },
    deep: {
      es: `<h3>Cómo se genera una sierra sin aliasing (PolyBLEP)</h3>
<p>Una sierra ideal tiene una discontinuidad (salto) por ciclo; esa esquina infinitamente abrupta contiene armónicos infinitos. La técnica <b>BLEP</b> (Band-Limited stEP) reemplaza el salto por un escalón suavizado precalculado, limitado en banda. <b>PolyBLEP</b> aproxima ese escalón con un polinomio de 2º orden aplicado solo en las dos muestras alrededor del salto:</p>
<span class="formula">si t < dt:     r = t/dt;   corrección = 2r − r² − 1</span>
<span class="formula">si t > 1 − dt: r = (t−1)/dt; corrección = r² + 2r + 1</span>
<p>(t = fase 0..1, dt = f/fs). Se resta esa corrección a la rampa ingenua. El costo es mínimo y elimina la mayor parte del aliasing audible. La cuadrada se obtiene como diferencia de dos sierras PolyBLEP; la triangular, integrando una cuadrada limitada en banda (con un integrador con pérdidas).</p>
<h3>Osciladores analógicos por dentro</h3>
<p>Un VCO clásico es un <b>integrador</b> (un capacitor que se carga con una corriente proporcional a la exponencial del CV) y un <b>comparador</b> que lo descarga al llegar a un umbral: eso genera la sierra. El conversor <b>exponencial</b> (un par de transistores) implementa el 1 V/oct; su sensibilidad a la temperatura explica la deriva, y por eso se calientan o compensan con termistores. El "tracking" a lo largo de varias octavas se ajusta con trimmers de escala.</p>
<h3>Ruido de fase y "vida"</h3>
<p>Investigaciones sobre la percepción de sintes analógicos sugieren que gran parte de su carácter viene de pequeñas fluctuaciones de frecuencia (jitter de fase) y de cómo cada voz difiere en afinación y corte de filtro. Si un VA te suena "estéril", probá agregar 2–5 cents de deriva aleatoria por voz y variación de corte por voz.</p>`,
      en: `<h3>How to make an alias-free saw (PolyBLEP)</h3>
<p>An ideal saw has one discontinuity (jump) per cycle; that infinitely sharp corner contains infinite harmonics. The <b>BLEP</b> (Band-Limited stEP) technique replaces the jump with a precomputed band-limited smoothed step. <b>PolyBLEP</b> approximates that step with a 2nd-order polynomial applied only to the two samples around the jump:</p>
<span class="formula">if t < dt:     r = t/dt;   correction = 2r − r² − 1</span>
<span class="formula">if t > 1 − dt: r = (t−1)/dt; correction = r² + 2r + 1</span>
<p>(t = phase 0..1, dt = f/fs). Subtract that correction from the naive ramp. The cost is tiny and removes most audible aliasing. A square is the difference of two PolyBLEP saws; a triangle is a leaky-integrated band-limited square.</p>
<h3>Inside analogue oscillators</h3>
<p>A classic VCO is an <b>integrator</b> (a capacitor charged by a current proportional to the exponential of the CV) and a <b>comparator</b> that discharges it at a threshold: that gives the saw. The <b>exponential converter</b> (a transistor pair) implements 1 V/oct; its temperature sensitivity explains drift, hence heated or thermistor-compensated designs. Tracking over several octaves is set with scale trimmers.</p>
<h3>Phase noise and "life"</h3>
<p>Research on perception of analogue synths suggests much of their character comes from tiny frequency fluctuations (phase jitter) and from how each voice differs in tuning and filter cutoff. If a VA sounds "sterile", try adding 2–5 cents of random per-voice drift and per-voice cutoff variation.</p>`,
      de: `<h3>Alias-freie Säge (PolyBLEP)</h3>
<p>Eine ideale Säge hat pro Zyklus einen Sprung; diese unendlich scharfe Kante enthält unendlich viele Obertöne. <b>BLEP</b> (Band-Limited stEP) ersetzt den Sprung durch eine vorberechnete, bandbegrenzte Stufe. <b>PolyBLEP</b> nähert diese mit einem Polynom 2. Ordnung an, angewendet nur auf die zwei Samples um den Sprung:</p>
<span class="formula">wenn t < dt:     r = t/dt;   Korrektur = 2r − r² − 1</span>
<span class="formula">wenn t > 1 − dt: r = (t−1)/dt; Korrektur = r² + 2r + 1</span>
<p>(t = Phase 0..1, dt = f/fs). Die Korrektur wird von der naiven Rampe abgezogen – minimaler Aufwand, kaum hörbares Aliasing. Rechteck = Differenz zweier PolyBLEP-Sägen; Dreieck = verlustbehaftet integriertes bandbegrenztes Rechteck.</p>
<h3>Analoge Oszillatoren von innen</h3>
<p>Ein klassischer VCO ist ein <b>Integrator</b> (Kondensator, geladen mit einem zur Exponentialfunktion der CV proportionalen Strom) und ein <b>Komparator</b>, der ihn an einer Schwelle entlädt: So entsteht die Säge. Der <b>Exponentialwandler</b> (Transistorpaar) realisiert 1 V/Okt; seine Temperaturempfindlichkeit erklärt die Drift – daher beheizte oder thermistor-kompensierte Designs.</p>
<h3>Phasenrauschen und „Leben"</h3>
<p>Studien zur Wahrnehmung analoger Synths legen nahe, dass viel Charakter aus winzigen Frequenzschwankungen und Unterschieden zwischen Stimmen (Stimmung, Cutoff) stammt. Klingt ein VA „steril", füge 2–5 Cent zufällige Drift und Cutoff-Variation pro Stimme hinzu.</p>`,
      ja: `<h3>エイリアスのないノコギリ波の作り方（PolyBLEP）</h3>
<p>理想的なノコギリ波は1周期に1回の不連続（ジャンプ）を持ち、その無限に鋭い角は無限の倍音を含みます。<b>BLEP</b>（Band-Limited stEP）は、そのジャンプを事前計算した帯域制限済みの滑らかな段差に置き換えます。<b>PolyBLEP</b>はその段差を2次多項式で近似し、ジャンプ周辺の2サンプルだけに適用します：</p>
<span class="formula">t < dt のとき:     r = t/dt;   補正 = 2r − r² − 1</span>
<span class="formula">t > 1 − dt のとき: r = (t−1)/dt; 補正 = r² + 2r + 1</span>
<p>（t＝位相0..1、dt＝f/fs）。この補正を素朴なランプから引きます。コストはわずかで、聞こえるエイリアシングの大半を除去します。矩形波は2つのPolyBLEPノコギリ波の差、三角波は帯域制限した矩形波をリーク付き積分して作ります。</p>
<h3>アナログ・オシレーターの内部</h3>
<p>古典的なVCOは<b>積分器</b>（CVの指数に比例する電流で充電されるコンデンサー）と、閾値で放電させる<b>コンパレーター</b>から成り、これがノコギリ波を生みます。<b>指数変換器</b>（トランジスタ対）が1 V/octを実現し、その温度依存性がドリフトの原因で、加熱やサーミスタ補償の設計が生まれました。</p>
<h3>位相ノイズと「生命感」</h3>
<p>アナログシンセの知覚研究によれば、その個性の多くは微小な周波数の揺らぎ（位相ジッター）と、ボイスごとのチューニングやカットオフの違いから来ています。VAが「無機質」に聞こえたら、ボイスごとに2〜5セントのランダムなドリフトとカットオフのばらつきを加えてみよう。</p>`
    },
    read: ['Välimäki & Huovilainen — "Antialiasing Oscillators in Subtractive Synthesis" (IEEE Signal Processing Magazine, 2007)', 'Will Pirkle — <i>Designing Software Synthesizer Plug-ins in C++</i>', 'Ray Wilson — <i>Make: Analog Synthesizers</i>', 'Welsh\'s Synthesizer Cookbook — capítulos de osciladores y sync'],
    quiz: [
      { q: { es: 'En hard sync, ¿qué determina la altura percibida?', en: 'In hard sync, what sets the perceived pitch?', de: 'Was bestimmt bei Hard Sync die gehörte Tonhöhe?', ja: 'ハードシンクで聞こえる音高を決めるのは？' }, o: { es: ['El oscilador esclavo', 'El oscilador maestro', 'El filtro', 'La relación entre ambos'], en: ['The slave oscillator', 'The master oscillator', 'The filter', 'The ratio between them'], de: ['Der Slave', 'Der Master', 'Das Filter', 'Das Verhältnis beider'], ja: ['スレーブ', 'マスター', 'フィルター', '両者の比'] }, c: 1, x: { es: 'El esclavo se reinicia al ritmo del maestro, así que el período es el del maestro.', en: 'The slave resets at the master\'s rate, so the period is the master\'s.', de: 'Der Slave wird im Takt des Masters zurückgesetzt; die Periode ist die des Masters.', ja: 'スレーブはマスターの周期でリセットされるため、周期はマスターのものです。' } },
      { q: { es: 'Con fs = 48 kHz, un armónico de 26 kHz en un oscilador ingenuo aparece en…', en: 'At fs = 48 kHz, a 26 kHz harmonic in a naive oscillator appears at…', de: 'Bei fs = 48 kHz erscheint ein 26-kHz-Oberton eines naiven Oszillators bei…', ja: 'fs = 48 kHzで、素朴なオシレーターの26 kHzの倍音は…に現れる' }, o: { es: ['26 kHz', '22 kHz', '2 kHz', '48 kHz'], en: ['26 kHz', '22 kHz', '2 kHz', '48 kHz'], de: ['26 kHz', '22 kHz', '2 kHz', '48 kHz'], ja: ['26 kHz', '22 kHz', '2 kHz', '48 kHz'] }, c: 1, x: { es: 'Nyquist = 24 kHz; 26 = 24 + 2 → se refleja a 24 − 2 = 22 kHz.', en: 'Nyquist = 24 kHz; 26 = 24 + 2 → folds to 24 − 2 = 22 kHz.', de: 'Nyquist = 24 kHz; 26 = 24 + 2 → gespiegelt auf 24 − 2 = 22 kHz.', ja: 'ナイキスト＝24 kHz、26＝24＋2→24−2＝22 kHzに折り返す。' } },
      { q: { es: '¿Qué técnica es una buena práctica para bajos con unísono?', en: 'Which is good practice for basses with unison?', de: 'Was ist gute Praxis bei Bässen mit Unisono?', ja: 'ユニゾンを使うベースでの良い習慣は？' }, o: { es: ['Desafinar también el sub', 'Mantener el sub en una sola voz y desafinar solo arriba', 'Usar 16 voces con 50¢', 'Invertir la fase de la mitad de las voces'], en: ['Detune the sub too', 'Keep the sub in one voice and detune only the top', 'Use 16 voices at 50¢', 'Invert the phase of half the voices'], de: ['Auch den Sub verstimmen', 'Sub einstimmig lassen, nur oben verstimmen', '16 Stimmen mit 50¢', 'Phase der Hälfte invertieren'], ja: ['サブもデチューンする', 'サブは1ボイスに保ち上だけデチューン', '50¢で16ボイス', '半分のボイスの位相を反転'] }, c: 1, x: { es: 'Evita cancelaciones de fase en el registro grave.', en: 'Avoids phase cancellation in the low register.', de: 'Vermeidet Phasenauslöschung im Bass.', ja: '低音域での位相キャンセルを防ぎます。' } },
      { q: { es: '¿Qué hace un PWM lento sobre un pulso?', en: 'What does slow PWM do to a pulse?', de: 'Was bewirkt langsame PWM bei einem Puls?', ja: 'パルスに遅いPWMをかけると？' }, o: { es: ['Cambia la altura', 'Mueve el contenido armónico y crea un efecto de coro', 'Agrega ruido', 'Produce aliasing'], en: ['Changes pitch', 'Moves the harmonic content and creates a chorus effect', 'Adds noise', 'Produces aliasing'], de: ['Ändert die Tonhöhe', 'Bewegt die Obertöne, Chorus-Effekt', 'Fügt Rauschen hinzu', 'Erzeugt Aliasing'], ja: ['音高が変わる', '倍音構成が動きコーラス効果が出る', 'ノイズが加わる', 'エイリアシングが起こる'] }, c: 1, x: { es: 'Los armónicos suben y bajan con el ancho; suena "ancho" como dos osciladores.', en: 'Harmonics rise and fall with the width; it sounds wide like two oscillators.', de: 'Obertöne steigen und fallen mit der Breite; klingt breit wie zwei Oszillatoren.', ja: '幅に合わせて倍音が増減し、2つのオシレーターのように広く聞こえます。' } },
      { q: { es: '¿Qué es el oversampling?', en: 'What is oversampling?', de: 'Was ist Oversampling?', ja: 'オーバーサンプリングとは？' }, o: { es: ['Grabar más fuerte', 'Procesar a una frecuencia de muestreo mayor y filtrar antes de volver', 'Duplicar las voces', 'Agregar más bits'], en: ['Recording louder', 'Processing at a higher sample rate and filtering before returning', 'Doubling voices', 'Adding more bits'], de: ['Lauter aufnehmen', 'Mit höherer Abtastrate verarbeiten und vor dem Zurückrechnen filtern', 'Stimmen verdoppeln', 'Mehr Bits'], ja: ['大きく録音する', '高いサンプリングレートで処理し、戻す前にフィルタリングする', 'ボイスを倍にする', 'ビット数を増やす'] }, c: 1, x: { es: 'Sube Nyquist durante el proceso no lineal y evita que los armónicos se reflejen.', en: 'It raises Nyquist during non-linear processing so harmonics don\'t fold back.', de: 'Hebt Nyquist während nichtlinearer Verarbeitung an, damit nichts zurückspiegelt.', ja: '非線形処理中のナイキストを上げ、倍音の折り返しを防ぎます。' } }
    ]
  });
})();
