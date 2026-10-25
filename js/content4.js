/* Contenido del curso — Nivel 3: modelado físico, efectos, secuenciación, DSP (módulos 13–16) */
window.COURSE = window.COURSE || [];
(function () {
  const M = m => window.COURSE.push(m);

  /* ===================== 13. MODELADO FÍSICO ===================== */
  M({
    id: 'physical', lv: 3, lab: ['karplus'],
    title: { es: 'Modelado físico', en: 'Physical modeling', de: 'Physical Modeling', ja: '物理モデリング' },
    sum: { es: 'Excitador + resonador, Karplus-Strong, guías de onda, síntesis modal y resonadores: simular cómo vibra un objeto real.', en: 'Exciter + resonator, Karplus-Strong, waveguides, modal synthesis and resonators: simulating how real objects vibrate.', de: 'Erreger + Resonator, Karplus-Strong, Wellenleiter, Modalsynthese und Resonatoren: Simulation realer Schwingungen.', ja: '励振器＋共鳴器、カープラス・ストロング、導波管、モーダル合成、レゾネーター：現実の物体の振動をシミュレートする。' },
    key: {
      es: ['En vez de describir el <b>resultado</b> (espectro), el modelado físico simula la <b>causa</b>: un objeto que vibra.', 'Modelo básico: <b>excitador</b> (púa, arco, soplo, golpe) → <b>resonador</b> (cuerda, tubo, placa, cuerpo).', '<b>Karplus-Strong</b>: una ráfaga de ruido en una línea de retardo con filtro = una cuerda pulsada.', 'La longitud del retardo define la altura; el filtro del lazo, el brillo y el decay.', 'La síntesis <b>modal</b> suma resonadores (filtros muy agudos) para modelar campanas, barras, placas.'],
      en: ['Instead of describing the <b>result</b> (spectrum), physical modeling simulates the <b>cause</b>: a vibrating object.', 'Basic model: <b>exciter</b> (pick, bow, breath, strike) → <b>resonator</b> (string, tube, plate, body).', '<b>Karplus-Strong</b>: a noise burst into a filtered delay line = a plucked string.', 'Delay length sets pitch; the loop filter sets brightness and decay.', '<b>Modal</b> synthesis sums resonators (very sharp filters) to model bells, bars and plates.'],
      de: ['Statt das <b>Ergebnis</b> (Spektrum) zu beschreiben, simuliert Physical Modeling die <b>Ursache</b>: ein schwingendes Objekt.', 'Grundmodell: <b>Erreger</b> (Plektrum, Bogen, Atem, Schlag) → <b>Resonator</b> (Saite, Rohr, Platte, Korpus).', '<b>Karplus-Strong</b>: Rauschstoß in eine gefilterte Verzögerungsleitung = gezupfte Saite.', 'Die Verzögerungslänge bestimmt die Tonhöhe; das Schleifenfilter Helligkeit und Ausklingen.', '<b>Modalsynthese</b> summiert Resonatoren (sehr schmale Filter) für Glocken, Stäbe, Platten.'],
      ja: ['物理モデリングは<b>結果</b>（スペクトル）を記述する代わりに<b>原因</b>、つまり振動する物体をシミュレートする。', '基本モデル：<b>励振器</b>（ピック、弓、息、打撃）→<b>共鳴器</b>（弦、管、板、胴体）。', '<b>カープラス・ストロング</b>：フィルター付きディレイラインにノイズのバースト＝撥弦。', 'ディレイ長が音高を、ループ内フィルターが明るさと減衰を決める。', '<b>モーダル</b>合成は共鳴器（非常に鋭いフィルター）を足し合わせ、ベル・棒・板をモデル化する。']
    },
    sec: [
      {
        h: { es: 'Excitador y resonador', en: 'Exciter and resonator', de: 'Erreger und Resonator', ja: '励振器と共鳴器' },
        b: {
          es: `<p>Casi todo instrumento acústico se describe así: algo <b>inyecta energía</b> (púa, martillo, arco, labios, caña) y algo <b>la almacena y filtra</b> (cuerda, columna de aire, membrana, caja). Las frecuencias que "sobreviven" son las resonancias del sistema. Ventaja del modelado físico: los parámetros son <b>físicos e intuitivos</b> (dureza del martillo, posición de pulsado, tensión, material) y responden de forma natural a la interpretación: tocar más fuerte no solo sube el volumen, cambia todo el comportamiento.</p>
<p>Instrumentos de referencia: Yamaha VL1 (1994, guías de onda para vientos), Korg Prophecy/Z1, Applied Acoustics Chromaphone y String Studio, Ableton Collision y Tension, Mutable Instruments Rings y Elements, Pianoteq (piano modelado).</p>`,
          en: `<p>Almost every acoustic instrument can be described this way: something <b>injects energy</b> (pick, hammer, bow, lips, reed) and something <b>stores and filters it</b> (string, air column, membrane, body). The frequencies that "survive" are the system's resonances. The advantage: parameters are <b>physical and intuitive</b> (hammer hardness, pluck position, tension, material) and respond naturally to performance: playing harder doesn't just raise volume, it changes the whole behaviour.</p>
<p>Reference instruments: Yamaha VL1 (1994, waveguides for winds), Korg Prophecy/Z1, Applied Acoustics Chromaphone and String Studio, Ableton Collision and Tension, Mutable Instruments Rings and Elements, Pianoteq (modelled piano).</p>`,
          de: `<p>Fast jedes akustische Instrument lässt sich so beschreiben: Etwas <b>führt Energie zu</b> (Plektrum, Hammer, Bogen, Lippen, Rohrblatt), etwas <b>speichert und filtert</b> sie (Saite, Luftsäule, Membran, Korpus). Was „überlebt", sind die Resonanzen. Vorteil: <b>physikalische, intuitive</b> Parameter (Hammerhärte, Anzupfpunkt, Spannung, Material), die natürlich aufs Spiel reagieren: Härter spielen ändert das ganze Verhalten, nicht nur die Lautstärke.</p>
<p>Referenzen: Yamaha VL1 (1994, Wellenleiter für Bläser), Korg Prophecy/Z1, AAS Chromaphone und String Studio, Ableton Collision und Tension, Mutable Instruments Rings und Elements, Pianoteq.</p>`,
          ja: `<p>ほぼすべてのアコースティック楽器はこう記述できます。何かが<b>エネルギーを注入</b>し（ピック、ハンマー、弓、唇、リード）、何かが<b>それを蓄えて濾過する</b>（弦、空気柱、膜、胴体）。「生き残る」周波数が系の共鳴です。物理モデリングの利点は、パラメーターが<b>物理的で直感的</b>（ハンマーの硬さ、撥弦位置、張力、材質）で、演奏に自然に反応することです。強く弾けば音量だけでなく振る舞い全体が変わります。</p>
<p>代表的な楽器：Yamaha VL1（1994、管楽器の導波管）、Korg Prophecy/Z1、AAS ChromaphoneとString Studio、Ableton CollisionとTension、Mutable Instruments RingsとElements、Pianoteq（モデリング・ピアノ）。</p>`
        }
      },
      {
        h: { es: 'Karplus-Strong paso a paso', en: 'Karplus-Strong step by step', de: 'Karplus-Strong Schritt für Schritt', ja: 'カープラス・ストロングを順を追って' },
        b: {
          es: `<p>Kevin Karplus y Alex Strong (1983) descubrieron un algoritmo asombrosamente simple:</p>
<ol><li>Llenar una línea de retardo de longitud <b>N = fs / f</b> con ruido (la "púa").</li><li>En cada muestra, la salida es el promedio de las dos muestras más viejas del retardo, multiplicado por un factor de pérdida <b>g</b> &lt; 1, y vuelve a entrar al retardo.</li></ol>
<span class="formula">y[n] = x[n] + g · ½ (y[n−N] + y[n−N−1])</span>
<p>El ruido se repite cada N muestras → altura f. El promedio es un filtro pasa bajos suave: los armónicos agudos se pierden más rápido en cada vuelta, exactamente como en una cuerda real. Parámetros del lab:</p>
<ul><li><b>Decay (g)</b>: cuánto se conserva por vuelta (sustain de la cuerda).</li><li><b>Amortiguación</b>: el peso del filtro del lazo; más alto = cuerda más opaca (nylon, palm mute).</li><li><b>Brillo de excitación</b>: filtrar el ruido inicial = púa blanda vs metálica.</li><li><b>Punto de pulsación</b>: un filtro peine en la excitación que anula armónicos, como al pulsar cerca del puente (brillante) o en el medio (redondo).</li></ul>`,
          en: `<p>Kevin Karplus and Alex Strong (1983) found an astonishingly simple algorithm:</p>
<ol><li>Fill a delay line of length <b>N = fs / f</b> with noise (the "pluck").</li><li>On each sample, output the average of the two oldest samples in the delay, times a loss factor <b>g</b> &lt; 1, and feed it back in.</li></ol>
<span class="formula">y[n] = x[n] + g · ½ (y[n−N] + y[n−N−1])</span>
<p>The noise repeats every N samples → pitch f. The averaging is a gentle low-pass: high harmonics are lost faster on each pass, just like a real string. Lab parameters:</p>
<ul><li><b>Decay (g)</b>: how much survives each pass (string sustain).</li><li><b>Damping</b>: loop filter weight; higher = duller string (nylon, palm mute).</li><li><b>Excitation brightness</b>: filtering the initial noise = soft vs metal pick.</li><li><b>Pluck position</b>: a comb filter on the excitation cancelling harmonics, like plucking near the bridge (bright) or mid-string (round).</li></ul>`,
          de: `<p>Kevin Karplus und Alex Strong (1983) fanden einen verblüffend einfachen Algorithmus:</p>
<ol><li>Eine Verzögerungsleitung der Länge <b>N = fs / f</b> mit Rauschen füllen (das „Anzupfen").</li><li>Pro Sample den Mittelwert der zwei ältesten Samples mal Verlustfaktor <b>g</b> &lt; 1 ausgeben und zurückführen.</li></ol>
<span class="formula">y[n] = x[n] + g · ½ (y[n−N] + y[n−N−1])</span>
<p>Das Rauschen wiederholt sich alle N Samples → Tonhöhe f. Die Mittelung ist ein sanfter Tiefpass: Hohe Obertöne verschwinden pro Umlauf schneller – wie bei einer echten Saite. Labor-Parameter:</p>
<ul><li><b>Decay (g)</b>: was pro Umlauf erhalten bleibt.</li><li><b>Dämpfung</b>: Gewicht des Schleifenfilters; höher = dumpfere Saite (Nylon, Palm Mute).</li><li><b>Helligkeit der Anregung</b>: weiches vs. Metallplektrum.</li><li><b>Anzupfpunkt</b>: Kammfilter auf der Anregung, wie Zupfen nahe am Steg (hell) oder in der Mitte (rund).</li></ul>`,
          ja: `<p>ケヴィン・カープラスとアレックス・ストロング（1983）は驚くほど単純なアルゴリズムを発見しました：</p>
<ol><li>長さ<b>N = fs / f</b>のディレイラインをノイズで満たす（「撥弦」）。</li><li>各サンプルで、ディレイ内の最も古い2サンプルの平均に損失係数<b>g</b>（1未満）を掛けて出力し、ディレイへ戻す。</li></ol>
<span class="formula">y[n] = x[n] + g · ½ (y[n−N] + y[n−N−1])</span>
<p>ノイズはNサンプルごとに繰り返され→音高fになります。平均化は穏やかなローパスで、1周ごとに高次倍音が速く失われます。本物の弦と同じです。ラボのパラメーター：</p>
<ul><li><b>ディケイ（g）</b>：1周ごとに残る量（弦のサステイン）。</li><li><b>ダンピング</b>：ループ・フィルターの重み。高いほどこもった弦（ナイロン、パームミュート）。</li><li><b>励振の明るさ</b>：最初のノイズをフィルタリング＝柔らかいピックか金属ピックか。</li><li><b>撥弦位置</b>：励振へのコムフィルターで倍音を打ち消す。ブリッジ近く（明るい）か中央（丸い）か。</li></ul>`
        }
      },
      {
        h: { es: 'Guías de onda y síntesis modal', en: 'Waveguides and modal synthesis', de: 'Wellenleiter und Modalsynthese', ja: '導波管とモーダル合成' },
        b: {
          es: `<p><b>Guías de onda digitales</b> (Julius O. Smith, Stanford): una cuerda o tubo se modela con dos líneas de retardo (ondas que viajan en sentidos opuestos) y filtros en los extremos que representan las reflexiones (puente, cejilla, campana del instrumento). Agregando una no linealidad en el excitador (caña, labios, arco con fricción) se obtienen clarinetes, trompetas y violines expresivos.</p>
<p><b>Síntesis modal</b>: un objeto vibra en un conjunto de <b>modos</b> (frecuencia, amortiguación y amplitud según dónde se golpee). Se implementa con un banco de filtros resonantes (pasa banda de Q muy alto) excitados por un impulso o ruido. Barras de marimba, campanas, placas metálicas, vasos, copas: cada material tiene relaciones de modos características (por ej. una barra libre: 1 : 2,76 : 5,40 : 8,93).</p>
<div class="tip">¿Te suena "2,76"? Es la relación que usamos en el reto de oído FM y en el anillo: muchos sonidos metálicos clásicos imitan los modos de una barra.</div>`,
          en: `<p><b>Digital waveguides</b> (Julius O. Smith, Stanford): a string or tube is modelled with two delay lines (waves travelling in opposite directions) and filters at the ends representing reflections (bridge, nut, bell). Adding a non-linearity at the exciter (reed, lips, bow friction) yields expressive clarinets, trumpets and violins.</p>
<p><b>Modal synthesis</b>: an object vibrates in a set of <b>modes</b> (frequency, damping and amplitude depending on where it's struck). It's implemented with a bank of resonant filters (very-high-Q band-pass) excited by an impulse or noise. Marimba bars, bells, metal plates, glasses: each material has characteristic mode ratios (e.g. a free bar: 1 : 2.76 : 5.40 : 8.93).</p>
<div class="tip">Does "2.76" ring a bell? It's the ratio used in the FM ear test and the ring lab: many classic metallic sounds imitate bar modes.</div>`,
          de: `<p><b>Digitale Wellenleiter</b> (Julius O. Smith, Stanford): Eine Saite oder Röhre wird mit zwei Verzögerungsleitungen (gegenläufige Wellen) und Filtern an den Enden (Reflexionen an Steg, Sattel, Schalltrichter) modelliert. Mit einer Nichtlinearität im Erreger (Rohrblatt, Lippen, Bogenreibung) entstehen ausdrucksstarke Klarinetten, Trompeten, Geigen.</p>
<p><b>Modalsynthese</b>: Ein Objekt schwingt in <b>Moden</b> (Frequenz, Dämpfung, Amplitude je nach Anschlagort). Umsetzung mit einer Bank resonanter Filter (Bandpässe mit sehr hohem Q), angeregt durch Impuls oder Rauschen. Marimbastäbe, Glocken, Platten, Gläser – jedes Material hat typische Modenverhältnisse (freier Stab: 1 : 2,76 : 5,40 : 8,93).</p>
<div class="tip">Kommt dir „2,76" bekannt vor? Das Verhältnis aus dem FM-Gehörtest und dem Ringmod-Labor: Viele metallische Klassiker imitieren Stabmoden.</div>`,
          ja: `<p><b>デジタル導波管</b>（ジュリアス・O・スミス、スタンフォード）：弦や管を2本のディレイライン（逆方向に進む波）と、端での反射（ブリッジ、ナット、ベル）を表すフィルターでモデル化します。励振器に非線形性（リード、唇、弓の摩擦）を加えると、表情豊かなクラリネット、トランペット、バイオリンが得られます。</p>
<p><b>モーダル合成</b>：物体は一連の<b>モード</b>（周波数、減衰、そして叩く位置によって変わる振幅）で振動します。インパルスやノイズで励振する共鳴フィルター（非常に高いQのバンドパス）のバンクで実装します。マリンバの鍵盤、ベル、金属板、グラス：材質ごとに特有のモード比があります（例：自由な棒は1 : 2.76 : 5.40 : 8.93）。</p>
<div class="tip">「2.76」に聞き覚えは？FMの耳トレやリング変調ラボで使った比です。多くの古典的な金属音は棒のモードを模倣しています。</div>`
        }
      }
    ],
    ex: {
      es: ['Lab Karplus-Strong: tocá el rasgueo "Strum". Luego bajá el decay a 0,98 y subí la amortiguación: ¿qué instrumento parece?', 'Mové el punto de pulsación de 2% a 50% tocando la misma nota. Describí el cambio de timbre.', 'Brillo de excitación al 10% vs 100%: ¿púa de fieltro o de metal?', 'Tocá notas muy agudas y muy graves con los mismos ajustes. ¿Por qué las agudas decaen más rápido?', 'Investigá: ¿cómo modelarías un tambor con este enfoque (excitador + resonador)?'],
      en: ['Karplus-Strong lab: play the "Strum". Then lower decay to 0.98 and raise damping: what instrument does it resemble?', 'Move pluck position from 2% to 50% on the same note. Describe the timbre change.', 'Excitation brightness 10% vs 100%: felt or metal pick?', 'Play very high and very low notes with the same settings. Why do high notes decay faster?', 'Research: how would you model a drum with this (exciter + resonator) approach?'],
      de: ['Karplus-Strong-Labor: „Strum" spielen. Dann Decay auf 0,98 senken, Dämpfung erhöhen: Welches Instrument?', 'Anzupfpunkt von 2 % auf 50 % bei gleicher Note. Klangänderung beschreiben.', 'Anregungshelligkeit 10 % vs. 100 %: Filz- oder Metallplektrum?', 'Sehr hohe und sehr tiefe Noten mit gleichen Einstellungen. Warum klingen hohe schneller aus?', 'Recherche: Wie würdest du eine Trommel nach diesem Ansatz modellieren?'],
      ja: ['カープラス・ストロング・ラボ：「Strum」を鳴らそう。次にディケイを0.98に下げダンピングを上げる。何の楽器に似ている？', '同じ音で撥弦位置を2%から50%へ動かし、音色の変化を説明しよう。', '励振の明るさ10%と100%：フェルトのピックか金属のピックか？', '同じ設定で非常に高い音と低い音を弾こう。なぜ高音の方が速く減衰する？', '調べよう：この（励振器＋共鳴器）アプローチで太鼓をどうモデル化する？']
    },
    deep: {
      es: `<h3>Por qué las notas agudas decaen más rápido</h3>
<p>En Karplus-Strong, la señal pasa por el filtro del lazo una vez por período. Una nota aguda tiene períodos más cortos → más vueltas por segundo → más pérdidas por segundo. Igual que en una guitarra o un piano real. Para compensarlo se ajusta g en función de la frecuencia: <code>g = 10^(−3·N / (fs·T60))</code> para obtener un tiempo de decay T60 deseado.</p>
<h3>Afinación fina</h3>
<p>La longitud N debe ser entera en un retardo simple, lo que produce errores de afinación en notas agudas (a 44,1 kHz, una nota de 2 kHz tiene N ≈ 22: un error de 0,5 muestra son ~40 cents). Se resuelve con un <b>filtro pasa todo</b> fraccional o interpolación de Lagrange en el lazo (el lab usa interpolación lineal).</p>
<h3>Extensiones de Jaffe y Smith (1983)</h3>
<p>Filtro de dinámica (velocidad → brillo de excitación), control de la posición de pulsado (filtro peine), efecto de "rigidez" (dispersión con filtros pasa todo: los armónicos se estiran como en un piano), cuerdas acopladas y simpáticas (varias cuerdas que se alimentan entre sí, como en un sitar o un piano con pedal).</p>
<h3>Comparación de técnicas de síntesis</h3>
<table><tr><th>Técnica</th><th>Parámetros</th><th>CPU</th><th>Fuerte en</th></tr>
<tr><td>Sustractiva</td><td>pocos, intuitivos</td><td>baja</td><td>bajos, leads, pads</td></tr>
<tr><td>FM</td><td>abstractos</td><td>muy baja</td><td>campanas, EP, metales</td></tr>
<tr><td>Aditiva</td><td>muchísimos</td><td>alta</td><td>control espectral total</td></tr>
<tr><td>Wavetable</td><td>medio</td><td>baja</td><td>timbres evolutivos</td></tr>
<tr><td>Sampling</td><td>pocos</td><td>baja (memoria alta)</td><td>realismo estático</td></tr>
<tr><td>Granular</td><td>medio</td><td>media</td><td>texturas, tiempo</td></tr>
<tr><td>Modelado físico</td><td>físicos</td><td>media-alta</td><td>expresividad, realismo dinámico</td></tr></table>`,
      en: `<h3>Why high notes decay faster</h3>
<p>In Karplus-Strong the signal passes the loop filter once per period. A high note has shorter periods → more passes per second → more loss per second. Just like a real guitar or piano. To compensate, g is set by frequency: <code>g = 10^(−3·N / (fs·T60))</code> for a desired decay time T60.</p>
<h3>Fine tuning</h3>
<p>N must be an integer in a simple delay, which detunes high notes (at 44.1 kHz a 2 kHz note has N ≈ 22: half a sample error is ~40 cents). Solved with a fractional <b>all-pass filter</b> or Lagrange interpolation in the loop (the lab uses linear interpolation).</p>
<h3>Jaffe & Smith extensions (1983)</h3>
<p>Dynamics filter (velocity → excitation brightness), pluck position (comb filter), "stiffness" (dispersion via all-pass filters: harmonics stretch as in a piano), coupled and sympathetic strings (several strings feeding each other, as in a sitar or a piano with the pedal down).</p>
<h3>Comparing synthesis techniques</h3>
<table><tr><th>Technique</th><th>Parameters</th><th>CPU</th><th>Strong at</th></tr>
<tr><td>Subtractive</td><td>few, intuitive</td><td>low</td><td>basses, leads, pads</td></tr>
<tr><td>FM</td><td>abstract</td><td>very low</td><td>bells, EP, metals</td></tr>
<tr><td>Additive</td><td>very many</td><td>high</td><td>total spectral control</td></tr>
<tr><td>Wavetable</td><td>medium</td><td>low</td><td>evolving timbres</td></tr>
<tr><td>Sampling</td><td>few</td><td>low (high memory)</td><td>static realism</td></tr>
<tr><td>Granular</td><td>medium</td><td>medium</td><td>textures, time</td></tr>
<tr><td>Physical modelling</td><td>physical</td><td>medium-high</td><td>expressiveness, dynamic realism</td></tr></table>`,
      de: `<h3>Warum hohe Noten schneller ausklingen</h3>
<p>Bei Karplus-Strong passiert das Signal das Schleifenfilter einmal pro Periode. Hohe Noten haben kürzere Perioden → mehr Umläufe pro Sekunde → mehr Verlust. Wie bei echter Gitarre oder Klavier. Ausgleich: g abhängig von der Frequenz, <code>g = 10^(−3·N / (fs·T60))</code> für eine gewünschte Nachklingzeit T60.</p>
<h3>Feinstimmung</h3>
<p>N muss in einer einfachen Verzögerung ganzzahlig sein – hohe Noten werden verstimmt (bei 44,1 kHz hat eine 2-kHz-Note N ≈ 22: ein halbes Sample ≈ 40 Cent). Lösung: fraktionaler <b>Allpass</b> oder Lagrange-Interpolation (das Labor nutzt lineare Interpolation).</p>
<h3>Erweiterungen von Jaffe & Smith (1983)</h3>
<p>Dynamikfilter (Velocity → Anregungshelligkeit), Anzupfpunkt (Kammfilter), „Steifigkeit" (Dispersion per Allpass: Obertöne spreizen wie beim Klavier), gekoppelte und Resonanzsaiten (Sitar, Klavier mit Pedal).</p>
<h3>Vergleich der Syntheseverfahren</h3>
<table><tr><th>Verfahren</th><th>Parameter</th><th>CPU</th><th>Stark bei</th></tr>
<tr><td>Subtraktiv</td><td>wenige, intuitiv</td><td>niedrig</td><td>Bässe, Leads, Pads</td></tr>
<tr><td>FM</td><td>abstrakt</td><td>sehr niedrig</td><td>Glocken, E-Piano, Metall</td></tr>
<tr><td>Additiv</td><td>sehr viele</td><td>hoch</td><td>totale Spektralkontrolle</td></tr>
<tr><td>Wavetable</td><td>mittel</td><td>niedrig</td><td>evolvierende Klänge</td></tr>
<tr><td>Sampling</td><td>wenige</td><td>niedrig (viel Speicher)</td><td>statischer Realismus</td></tr>
<tr><td>Granular</td><td>mittel</td><td>mittel</td><td>Texturen, Zeit</td></tr>
<tr><td>Physical Modeling</td><td>physikalisch</td><td>mittel-hoch</td><td>Ausdruck, dynamischer Realismus</td></tr></table>`,
      ja: `<h3>高音が速く減衰する理由</h3>
<p>カープラス・ストロングでは、信号は1周期に1回ループ・フィルターを通ります。高音は周期が短い→毎秒の周回が多い→毎秒の損失が多い。本物のギターやピアノと同じです。補正するには周波数に応じてgを設定します：所望の減衰時間T60に対し<code>g = 10^(−3·N / (fs·T60))</code>。</p>
<h3>微細なチューニング</h3>
<p>単純なディレイではNは整数でなければならず、高音で音程誤差が出ます（44.1 kHzで2 kHzの音はN≈22、0.5サンプルの誤差で約40セント）。ループ内の分数<b>オールパス・フィルター</b>やラグランジュ補間で解決します（ラボは線形補間）。</p>
<h3>ジャフェとスミスの拡張（1983）</h3>
<p>ダイナミクス・フィルター（ベロシティ→励振の明るさ）、撥弦位置（コムフィルター）、「剛性」（オールパスによる分散：ピアノのように倍音が引き伸ばされる）、結合弦・共鳴弦（シタールやペダルを踏んだピアノのように複数の弦が互いに作用）。</p>
<h3>合成手法の比較</h3>
<table><tr><th>手法</th><th>パラメーター</th><th>CPU</th><th>得意分野</th></tr>
<tr><td>減算</td><td>少なく直感的</td><td>低</td><td>ベース、リード、パッド</td></tr>
<tr><td>FM</td><td>抽象的</td><td>非常に低</td><td>ベル、エレピ、金属</td></tr>
<tr><td>加算</td><td>非常に多い</td><td>高</td><td>完全なスペクトル制御</td></tr>
<tr><td>ウェーブテーブル</td><td>中</td><td>低</td><td>変化する音色</td></tr>
<tr><td>サンプリング</td><td>少ない</td><td>低（メモリー大）</td><td>静的なリアルさ</td></tr>
<tr><td>グラニュラー</td><td>中</td><td>中</td><td>テクスチャ、時間</td></tr>
<tr><td>物理モデリング</td><td>物理的</td><td>中〜高</td><td>表現力、動的なリアルさ</td></tr></table>`
    },
    read: ['Karplus & Strong — "Digital Synthesis of Plucked-String and Drum Timbres" (CMJ, 1983)', 'Jaffe & Smith — "Extensions of the Karplus-Strong Plucked-String Algorithm" (CMJ, 1983)', 'Julius O. Smith III — <i>Physical Audio Signal Processing</i> (libre en ccrma.stanford.edu)', 'Perry Cook — <i>Real Sound Synthesis for Interactive Applications</i>'],
    quiz: [
      { q: { es: 'En Karplus-Strong, ¿qué determina la altura?', en: 'In Karplus-Strong, what sets the pitch?', de: 'Was bestimmt bei Karplus-Strong die Tonhöhe?', ja: 'カープラス・ストロングで音高を決めるのは？' }, o: { es: ['El color del ruido', 'La longitud de la línea de retardo', 'El factor g', 'El volumen'], en: ['Noise colour', 'Delay line length', 'The g factor', 'Volume'], de: ['Rauschfarbe', 'Länge der Verzögerungsleitung', 'Faktor g', 'Lautstärke'], ja: ['ノイズの色', 'ディレイラインの長さ', '係数g', '音量'] }, c: 1, x: { es: 'f = fs / N.', en: 'f = fs / N.', de: 'f = fs / N.', ja: 'f＝fs / N。' } },
      { q: { es: '¿Qué representa el filtro dentro del lazo?', en: 'What does the in-loop filter represent?', de: 'Was stellt das Filter in der Schleife dar?', ja: 'ループ内のフィルターが表すのは？' }, o: { es: ['La púa', 'Las pérdidas de energía dependientes de la frecuencia', 'La caja de resonancia', 'El micrófono'], en: ['The pick', 'Frequency-dependent energy losses', 'The soundboard', 'The microphone'], de: ['Das Plektrum', 'Frequenzabhängige Energieverluste', 'Den Resonanzboden', 'Das Mikrofon'], ja: ['ピック', '周波数に依存するエネルギー損失', '響板', 'マイク'] }, c: 1, x: { es: 'Los agudos se pierden más rápido, como en una cuerda real.', en: 'Highs are lost faster, as in a real string.', de: 'Höhen gehen schneller verloren, wie bei echten Saiten.', ja: '本物の弦と同様に高域が速く失われます。' } },
      { q: { es: 'La síntesis modal se implementa con…', en: 'Modal synthesis is implemented with…', de: 'Modalsynthese wird umgesetzt mit…', ja: 'モーダル合成の実装に使うのは…' }, o: { es: ['Un banco de resonadores (filtros de Q alto)', 'Un solo oscilador de sierra', 'Granos de audio', 'Un vocoder'], en: ['A bank of resonators (high-Q filters)', 'A single saw oscillator', 'Audio grains', 'A vocoder'], de: ['Einer Bank von Resonatoren (Filter mit hohem Q)', 'Einem einzelnen Sägezahn', 'Audiokörnern', 'Einem Vocoder'], ja: ['共鳴器のバンク（高Qフィルター）', '1つのノコギリ波オシレーター', 'オーディオの粒', 'ボコーダー'] }, c: 0, x: { es: 'Cada modo es un resonador con su frecuencia y decay.', en: 'Each mode is a resonator with its own frequency and decay.', de: 'Jede Mode ist ein Resonator mit eigener Frequenz und Abklingzeit.', ja: '各モードは固有の周波数と減衰を持つ共鳴器です。' } },
      { q: { es: 'Pulsar una cuerda cerca del puente da un sonido…', en: 'Plucking a string near the bridge sounds…', de: 'Anzupfen nahe am Steg klingt…', ja: 'ブリッジ近くで弦を弾くと…' }, o: { es: ['Más brillante y fino', 'Más grave', 'Más redondo', 'Igual'], en: ['Brighter and thinner', 'Lower', 'Rounder', 'The same'], de: ['Heller und dünner', 'Tiefer', 'Runder', 'Gleich'], ja: ['明るく細い', '低い', '丸い', '同じ'] }, c: 0, x: { es: 'Se conservan más armónicos agudos.', en: 'More high harmonics are preserved.', de: 'Mehr hohe Obertöne bleiben erhalten.', ja: '高次倍音がより多く残ります。' } },
      { q: { es: 'El Yamaha VL1 (1994) usaba…', en: 'The Yamaha VL1 (1994) used…', de: 'Der Yamaha VL1 (1994) nutzte…', ja: 'Yamaha VL1（1994）が使ったのは…' }, o: { es: ['FM de 6 operadores', 'Guías de onda (modelado físico)', 'Wavetables', 'Samples'], en: ['6-operator FM', 'Waveguides (physical modelling)', 'Wavetables', 'Samples'], de: ['6-Operator-FM', 'Wellenleiter (Physical Modeling)', 'Wavetables', 'Samples'], ja: ['6オペレーターFM', '導波管（物理モデリング）', 'ウェーブテーブル', 'サンプル'] }, c: 1, x: { es: 'Fue el primer sinte comercial de modelado físico de vientos.', en: 'The first commercial physical-modelling wind synth.', de: 'Der erste kommerzielle Physical-Modeling-Synth für Bläser.', ja: '初の商用・管楽器物理モデリング・シンセです。' } }
    ]
  });

  /* ===================== 14. EFECTOS ===================== */
  M({
    id: 'fx', lv: 3, lab: ['fx'],
    title: { es: 'Efectos y espacio', en: 'Effects and space', de: 'Effekte und Raum', ja: 'エフェクトと空間' },
    sum: { es: 'Delay, chorus, flanger, phaser, reverb, compresión y EQ: cómo funcionan por dentro y cómo integrarlos al diseño del sonido.', en: 'Delay, chorus, flanger, phaser, reverb, compression and EQ: how they work inside and how to integrate them into sound design.', de: 'Delay, Chorus, Flanger, Phaser, Hall, Kompression und EQ: wie sie innen funktionieren und wie man sie ins Sounddesign integriert.', ja: 'ディレイ、コーラス、フランジャー、フェイザー、リバーブ、コンプ、EQ：仕組みとサウンドデザインへの組み込み方。' },
    key: {
      es: ['Casi todos los efectos de modulación son <b>retardos cortos modulados</b> mezclados con la señal original.', 'Chorus ≈ 10–30 ms modulado; flanger ≈ 1–10 ms con realimentación; phaser = filtros <b>pasa todo</b> en cadena.', 'El delay sincronizado al tempo (1/8 con puntillo, 1/4) es parte del groove.', 'La reverb simula reflexiones de un espacio: pre-delay, reflexiones tempranas y cola.', 'Los efectos son parte del timbre: un sonido con chorus y reverb se diseña distinto que uno seco.'],
      en: ['Nearly all modulation effects are <b>short modulated delays</b> mixed with the dry signal.', 'Chorus ≈ 10–30 ms modulated; flanger ≈ 1–10 ms with feedback; phaser = cascaded <b>all-pass</b> filters.', 'Tempo-synced delay (dotted 1/8, 1/4) is part of the groove.', 'Reverb simulates reflections in a space: pre-delay, early reflections and tail.', 'Effects are part of the timbre: a sound with chorus and reverb is designed differently from a dry one.'],
      de: ['Fast alle Modulationseffekte sind <b>kurze modulierte Delays</b>, gemischt mit dem Original.', 'Chorus ≈ 10–30 ms moduliert; Flanger ≈ 1–10 ms mit Feedback; Phaser = kaskadierte <b>Allpässe</b>.', 'Temposynchrones Delay (punktierte 1/8, 1/4) gehört zum Groove.', 'Hall simuliert Reflexionen: Pre-Delay, frühe Reflexionen, Nachhall.', 'Effekte sind Teil der Klangfarbe: Mit Chorus und Hall gestaltet man anders als trocken.'],
      ja: ['ほとんどのモジュレーション系エフェクトは、原音と混ぜた<b>変調された短いディレイ</b>である。', 'コーラス≈変調された10〜30 ms、フランジャー≈フィードバック付き1〜10 ms、フェイザー＝直列の<b>オールパス</b>フィルター。', 'テンポ同期ディレイ（付点8分、4分）はグルーヴの一部。', 'リバーブは空間の反射をシミュレートする：プリディレイ、初期反射、残響。', 'エフェクトは音色の一部。コーラスとリバーブ前提の音は、ドライな音とは違う設計になる。']
    },
    sec: [
      {
        h: { es: 'Delay', en: 'Delay', de: 'Delay', ja: 'ディレイ' },
        b: {
          es: `<p>Un delay graba la señal y la reproduce después de un tiempo; con <b>realimentación</b> las repeticiones se repiten. Variantes: <b>ping-pong</b> (alterna izquierda/derecha), <b>tape/analógico</b> (filtro y saturación en el lazo: cada repetición más oscura; modulación de "wow & flutter"), <b>multitap</b>, <b>slapback</b> (80–150 ms, una sola repetición, rockabilly).</p>
<span class="formula">tiempo (ms) = 60000 / BPM × fracción      1/4 a 120 BPM = 500 ms; 1/8 con puntillo = 375 ms</span>
<p>El delay de 1/8 con puntillo es el "truco" de The Edge (U2) y de muchos leads de trance: rellena los huecos rítmicos.</p>`,
          en: `<p>A delay records the signal and plays it back after a time; with <b>feedback</b> the repeats repeat. Variants: <b>ping-pong</b> (alternating L/R), <b>tape/analogue</b> (filter and saturation in the loop: each repeat darker; "wow & flutter" modulation), <b>multitap</b>, <b>slapback</b> (80–150 ms, single repeat, rockabilly).</p>
<span class="formula">time (ms) = 60000 / BPM × fraction      1/4 at 120 BPM = 500 ms; dotted 1/8 = 375 ms</span>
<p>The dotted-1/8 delay is The Edge's (U2) "trick" and that of many trance leads: it fills the rhythmic gaps.</p>`,
          de: `<p>Ein Delay nimmt das Signal auf und spielt es zeitversetzt ab; mit <b>Feedback</b> wiederholen sich die Wiederholungen. Varianten: <b>Ping-Pong</b> (links/rechts), <b>Band/analog</b> (Filter und Sättigung in der Schleife: jede Wiederholung dunkler; „Wow & Flutter"), <b>Multitap</b>, <b>Slapback</b> (80–150 ms, eine Wiederholung, Rockabilly).</p>
<span class="formula">Zeit (ms) = 60000 / BPM × Bruch      1/4 bei 120 BPM = 500 ms; punktierte 1/8 = 375 ms</span>
<p>Das punktierte 1/8-Delay ist der „Trick" von The Edge (U2) und vieler Trance-Leads: Es füllt rhythmische Lücken.</p>`,
          ja: `<p>ディレイは信号を記録し、一定時間後に再生します。<b>フィードバック</b>があると反復が繰り返されます。種類：<b>ピンポン</b>（左右交互）、<b>テープ／アナログ</b>（ループ内のフィルターと歪みで反復ごとに暗くなり、「ワウ・フラッター」の揺れ）、<b>マルチタップ</b>、<b>スラップバック</b>（80〜150 ms、1回だけ、ロカビリー）。</p>
<span class="formula">時間 (ms) = 60000 / BPM × 分数      120 BPMで1/4＝500 ms、付点8分＝375 ms</span>
<p>付点8分ディレイはジ・エッジ（U2）や多くのトランスのリードの「技」で、リズムの隙間を埋めます。</p>`
        }
      },
      {
        h: { es: 'Chorus, flanger y phaser', en: 'Chorus, flanger and phaser', de: 'Chorus, Flanger und Phaser', ja: 'コーラス・フランジャー・フェイザー' },
        b: {
          es: `<ul><li><b>Chorus</b>: un retardo de 10–30 ms cuya duración varía con un LFO lento. La variación del retardo produce un leve cambio de altura (efecto Doppler) → como varias voces desafinadas. El chorus estéreo del Juno-60 (dos LFO en contrafase) es legendario. <b>Ensemble</b> usa varias líneas con LFO distintos (string machines).</li><li><b>Flanger</b>: retardo más corto (0,5–10 ms) con realimentación. Crea un <b>filtro peine</b> (picos y valles regularmente espaciados) que se desplaza: el clásico "avión a reacción".</li><li><b>Phaser</b>: no usa retardo sino 4–12 <b>filtros pasa todo</b> en serie; al mezclar con la señal seca aparecen notches no armónicamente espaciados que se mueven con el LFO. Más suave y "líquido" que el flanger.</li></ul>
<div class="tip">Rack de efectos: activá el bucle de demostración y probá cada efecto solo, luego combiná chorus + delay + reverb para un pluck "producido".</div>`,
          en: `<ul><li><b>Chorus</b>: a 10–30 ms delay whose time varies with a slow LFO. The varying delay slightly shifts pitch (Doppler effect) → like several detuned voices. The Juno-60's stereo chorus (two anti-phase LFOs) is legendary. <b>Ensemble</b> uses several lines with different LFOs (string machines).</li><li><b>Flanger</b>: shorter delay (0.5–10 ms) with feedback. It creates a <b>comb filter</b> (regularly spaced peaks and notches) that moves: the classic "jet plane".</li><li><b>Phaser</b>: no delay, but 4–12 <b>all-pass filters</b> in series; mixed with the dry signal they create non-harmonically spaced notches that move with the LFO. Smoother and more "liquid" than a flanger.</li></ul>
<div class="tip">Effects rack: enable the demo loop and try each effect alone, then combine chorus + delay + reverb for a "produced" pluck.</div>`,
          de: `<ul><li><b>Chorus</b>: 10–30 ms Delay, dessen Zeit ein langsamer LFO variiert. Das ändert leicht die Tonhöhe (Doppler) → wie mehrere verstimmte Stimmen. Der Stereo-Chorus des Juno-60 (zwei gegenphasige LFOs) ist legendär. <b>Ensemble</b> nutzt mehrere Linien mit verschiedenen LFOs (String Machines).</li><li><b>Flanger</b>: kürzeres Delay (0,5–10 ms) mit Feedback. Erzeugt ein wanderndes <b>Kammfilter</b> (regelmäßige Spitzen und Kerben): der klassische „Düsenjet".</li><li><b>Phaser</b>: kein Delay, sondern 4–12 <b>Allpässe</b> in Reihe; gemischt mit dem Original entstehen nicht-harmonisch verteilte Kerben, die der LFO bewegt. Weicher und „flüssiger" als ein Flanger.</li></ul>
<div class="tip">Effekt-Rack: Demo-Loop aktivieren, jeden Effekt einzeln testen, dann Chorus + Delay + Hall für einen „produzierten" Pluck kombinieren.</div>`,
          ja: `<ul><li><b>コーラス</b>：遅いLFOで時間が変わる10〜30 msのディレイ。ディレイの変化がわずかに音高を変え（ドップラー効果）、複数のデチューンしたボイスのようになる。Juno-60のステレオ・コーラス（逆相の2つのLFO）は伝説的。<b>アンサンブル</b>は異なるLFOの複数ラインを使う（ストリング・マシン）。</li><li><b>フランジャー</b>：フィードバック付きのより短いディレイ（0.5〜10 ms）。動く<b>コムフィルター</b>（等間隔のピークと谷）を作る。定番の「ジェット機」。</li><li><b>フェイザー</b>：ディレイではなく4〜12個の<b>オールパス・フィルター</b>を直列に。原音と混ぜると、倍音的でない間隔のノッチがLFOで動く。フランジャーより滑らかで「液体的」。</li></ul>
<div class="tip">エフェクト・ラック：デモ・ループを有効にし、各エフェクトを単独で試してから、コーラス＋ディレイ＋リバーブで「仕上げた」プラックにしよう。</div>`
        }
      },
      {
        h: { es: 'Reverb, compresión y EQ', en: 'Reverb, compression and EQ', de: 'Hall, Kompression und EQ', ja: 'リバーブ・コンプレッション・EQ' },
        b: {
          es: `<p><b>Reverb</b>: en una sala oímos el sonido directo, luego <b>reflexiones tempranas</b> (primeros 50–80 ms, dan tamaño y forma) y finalmente una <b>cola</b> densa que decae (RT60 = tiempo para caer 60 dB). Tipos: algorítmica (redes de retardos con realimentación: Schroeder, Moorer, FDN; Lexicon, Valhalla) y por <b>convolución</b> (respuesta al impulso de un espacio real; el lab genera una IR sintética de ruido con decay). El <b>pre-delay</b> (10–80 ms) separa el sonido de la cola y preserva la claridad.</p>
<p><b>Compresión</b>: reduce la diferencia entre partes fuertes y suaves (umbral, ratio, ataque, release). Con ataque lento resalta transitorios; con <b>sidechain</b> desde el bombo crea el "bombeo" del house/EDM.</p>
<p><b>EQ</b>: en diseño sonoro, un HP en todo lo que no sea bajo (80–150 Hz) libera la mezcla; cortes estrechos quitan resonancias molestas; un shelving agudo suave agrega "aire".</p>`,
          en: `<p><b>Reverb</b>: in a room we hear the direct sound, then <b>early reflections</b> (first 50–80 ms, giving size and shape) and finally a dense decaying <b>tail</b> (RT60 = time to drop 60 dB). Types: algorithmic (feedback delay networks: Schroeder, Moorer, FDN; Lexicon, Valhalla) and <b>convolution</b> (a real space's impulse response; the lab generates a synthetic decaying-noise IR). <b>Pre-delay</b> (10–80 ms) separates the sound from the tail and preserves clarity.</p>
<p><b>Compression</b>: reduces the difference between loud and soft parts (threshold, ratio, attack, release). Slow attack emphasises transients; <b>sidechain</b> from the kick creates house/EDM "pumping".</p>
<p><b>EQ</b>: in sound design, an HP on everything except bass (80–150 Hz) frees the mix; narrow cuts remove annoying resonances; a gentle high shelf adds "air".</p>`,
          de: `<p><b>Hall</b>: Im Raum hören wir den Direktschall, dann <b>frühe Reflexionen</b> (erste 50–80 ms, geben Größe und Form) und schließlich eine dichte, abklingende <b>Fahne</b> (RT60 = Zeit für −60 dB). Typen: algorithmisch (rückgekoppelte Delaynetzwerke: Schroeder, Moorer, FDN; Lexicon, Valhalla) und <b>Faltung</b> (Impulsantwort eines echten Raums; das Labor erzeugt eine synthetische Rausch-IR). <b>Pre-Delay</b> (10–80 ms) trennt Klang und Fahne und bewahrt Klarheit.</p>
<p><b>Kompression</b>: verringert den Abstand zwischen laut und leise (Threshold, Ratio, Attack, Release). Langsamer Attack betont Transienten; <b>Sidechain</b> von der Kick erzeugt das House/EDM-„Pumpen".</p>
<p><b>EQ</b>: Ein HP auf allem außer Bass (80–150 Hz) räumt den Mix auf; schmale Absenkungen entfernen störende Resonanzen; ein sanftes Höhen-Shelf bringt „Luft".</p>`,
          ja: `<p><b>リバーブ</b>：部屋では直接音、次に<b>初期反射</b>（最初の50〜80 ms、大きさと形を与える）、最後に減衰する密な<b>残響</b>（RT60＝60 dB下がる時間）が聞こえます。種類：アルゴリズミック（フィードバック・ディレイ・ネットワーク：Schroeder、Moorer、FDN、Lexicon、Valhalla）と<b>コンボリューション</b>（実空間のインパルス応答。ラボは減衰するノイズで合成IRを生成）。<b>プリディレイ</b>（10〜80 ms）は音と残響を分け、明瞭さを保ちます。</p>
<p><b>コンプレッション</b>：大きい部分と小さい部分の差を縮める（スレッショルド、レシオ、アタック、リリース）。遅いアタックはトランジェントを強調し、キックからの<b>サイドチェーン</b>はハウス／EDMの「パンピング」を作ります。</p>
<p><b>EQ</b>：サウンドデザインでは、ベース以外すべてに80〜150 HzのHPを入れるとミックスが整理されます。狭いカットで耳障りな共鳴を取り、穏やかな高域シェルフで「空気感」を加えます。</p>`
        }
      }
    ],
    ex: {
      es: ['Rack: con el bucle activo, delay 375 ms (1/8 con puntillo a 120 BPM aprox.) y realimentación 40%. Luego probá 500 ms. ¿Cuál "groovea" más con el patrón?', 'Activá solo el chorus y subí la profundidad al máximo: ¿en qué momento se vuelve un vibrato desafinado?', 'Comparé phaser y chorus sobre el preset PAD.', 'Reverb de 0,5 s vs 6 s sobre el pluck: describí qué le pasa al ritmo.', 'Diseñá una cadena de efectos para un lead de synthwave y anotá el orden y los valores.'],
      en: ['Rack: with the loop running, delay 375 ms (≈ dotted 1/8 at 120 BPM) and 40% feedback. Then try 500 ms. Which grooves more with the pattern?', 'Enable only chorus and max out the depth: at what point does it become out-of-tune vibrato?', 'Compare phaser and chorus on the PAD preset.', 'Reverb 0.5 s vs 6 s on the pluck: describe what happens to the rhythm.', 'Design an effects chain for a synthwave lead and write down order and values.'],
      de: ['Rack: Loop läuft, Delay 375 ms (≈ punktierte 1/8 bei 120 BPM), Feedback 40 %. Dann 500 ms. Was groovt besser?', 'Nur Chorus, Tiefe auf Maximum: Ab wann wird es zu verstimmtem Vibrato?', 'Phaser und Chorus auf dem PAD-Preset vergleichen.', 'Hall 0,5 s vs. 6 s auf dem Pluck: Was passiert mit dem Rhythmus?', 'Entwirf eine Effektkette für einen Synthwave-Lead (Reihenfolge und Werte).'],
      ja: ['ラック：ループを流しながら、ディレイ375 ms（120 BPMで付点8分に近い）、フィードバック40%。次に500 ms。パターンとよりグルーヴするのは？', 'コーラスだけ有効にしてデプスを最大に。どこで音痴なビブラートになる？', 'PADプリセットでフェイザーとコーラスを比べよう。', 'プラックにリバーブ0.5秒と6秒：リズムに何が起こる？', 'シンセウェーブのリード用エフェクト・チェーンを設計し、順序と値を記録しよう。']
    },
    deep: {
      es: `<h3>Orden de la cadena</h3>
<p>Un orden típico: <b>EQ correctiva → saturación → filtro/modulación (chorus, phaser) → compresión → delay → reverb</b>. Poner la distorsión después de la reverb produce una cola sucia y masiva (shoegaze); el delay antes del chorus da repeticiones estáticas, después las hace "nadar". No hay reglas fijas, pero sí consecuencias.</p>
<h3>Reverbs algorítmicas: Schroeder</h3>
<p>Manfred Schroeder (1962) propuso 4 filtros peine en paralelo (retardos de longitudes primas entre sí, 30–45 ms, para densidad de ecos) seguidos de 2 filtros pasa todo en serie (para difusión). Las <b>FDN</b> (Feedback Delay Networks, Jot 1991) generalizan la idea con una matriz de realimentación ortogonal, base de la mayoría de las reverbs modernas.</p>
<h3>Efectos como síntesis</h3>
<p>Un delay muy corto (1–20 ms) con realimentación alta <b>es</b> un resonador de Karplus-Strong: excitarlo con ruido o percusión produce tonos. Un phaser con resonancia es un filtro de formantes móvil. Un pitch-shifter en el lazo de un delay produce cascadas ascendentes ("shimmer"). Muchos diseñadores usan los efectos como fuentes de sonido, no solo como decoración.</p>`,
      en: `<h3>Chain order</h3>
<p>A typical order: <b>corrective EQ → saturation → filter/modulation (chorus, phaser) → compression → delay → reverb</b>. Distortion after reverb gives a dirty massive tail (shoegaze); delay before chorus gives static repeats, after it makes them "swim". No fixed rules, but there are consequences.</p>
<h3>Algorithmic reverbs: Schroeder</h3>
<p>Manfred Schroeder (1962) proposed 4 parallel comb filters (mutually prime delay lengths, 30–45 ms, for echo density) followed by 2 series all-pass filters (for diffusion). <b>FDNs</b> (Feedback Delay Networks, Jot 1991) generalise this with an orthogonal feedback matrix, the basis of most modern reverbs.</p>
<h3>Effects as synthesis</h3>
<p>A very short delay (1–20 ms) with high feedback <b>is</b> a Karplus-Strong resonator: exciting it with noise or percussion produces tones. A resonant phaser is a moving formant filter. A pitch shifter inside a delay loop produces rising cascades ("shimmer"). Many designers use effects as sound sources, not just decoration.</p>`,
      de: `<h3>Reihenfolge der Kette</h3>
<p>Typisch: <b>korrigierender EQ → Sättigung → Filter/Modulation (Chorus, Phaser) → Kompression → Delay → Hall</b>. Verzerrung nach dem Hall ergibt eine schmutzige, massive Fahne (Shoegaze); Delay vor Chorus gibt statische Wiederholungen, danach „schwimmen" sie. Keine festen Regeln, aber Konsequenzen.</p>
<h3>Algorithmischer Hall: Schroeder</h3>
<p>Manfred Schroeder (1962) schlug 4 parallele Kammfilter (teilerfremde Längen, 30–45 ms, für Echodichte) und 2 serielle Allpässe (Diffusion) vor. <b>FDNs</b> (Feedback Delay Networks, Jot 1991) verallgemeinern das mit einer orthogonalen Rückkopplungsmatrix – Basis der meisten modernen Hallgeräte.</p>
<h3>Effekte als Synthese</h3>
<p>Ein sehr kurzes Delay (1–20 ms) mit hohem Feedback <b>ist</b> ein Karplus-Strong-Resonator. Ein resonanter Phaser ist ein beweglicher Formantfilter. Ein Pitch-Shifter in der Delayschleife ergibt aufsteigende Kaskaden („Shimmer"). Viele nutzen Effekte als Klangquellen, nicht nur als Dekoration.</p>`,
      ja: `<h3>チェーンの順序</h3>
<p>典型的な順序：<b>補正EQ→歪み→フィルター／変調（コーラス、フェイザー）→コンプレッション→ディレイ→リバーブ</b>。リバーブの後に歪みを置くと汚れた巨大な残響に（シューゲイザー）。コーラスの前のディレイは静的な反復、後なら反復が「泳ぐ」。固定ルールはないが、結果は変わる。</p>
<h3>アルゴリズミック・リバーブ：シュレーダー</h3>
<p>マンフレート・シュレーダー（1962）は、並列の4つのコムフィルター（互いに素な30〜45 msの長さでエコー密度を得る）と直列の2つのオールパス（拡散）を提案しました。<b>FDN</b>（フィードバック・ディレイ・ネットワーク、Jot 1991）は直交フィードバック行列でこれを一般化し、現代のほとんどのリバーブの基礎になっています。</p>
<h3>合成としてのエフェクト</h3>
<p>フィードバックの強いごく短いディレイ（1〜20 ms）はカープラス・ストロングの共鳴器<b>そのもの</b>です。ノイズや打楽器で励振すると音程が生まれます。レゾナンスの強いフェイザーは動くフォルマント・フィルター。ディレイのループ内にピッチシフターを入れると上昇するカスケード（「シマー」）になります。多くのデザイナーはエフェクトを装飾ではなく音源として使います。</p>`
    },
    read: ['Udo Zölzer (ed.) — <i>DAFX: Digital Audio Effects</i>', 'Will Pirkle — <i>Designing Audio Effect Plugins in C++</i>', 'Sean Costello — blog de Valhalla DSP (reverbs)', 'Bob Katz — <i>Mastering Audio</i> (compresión y EQ)'],
    quiz: [
      { q: { es: '¿Qué efecto usa filtros pasa todo en cadena?', en: 'Which effect uses cascaded all-pass filters?', de: 'Welcher Effekt nutzt kaskadierte Allpässe?', ja: 'オールパスを直列に使うエフェクトは？' }, o: { es: ['Chorus', 'Flanger', 'Phaser', 'Delay'], en: ['Chorus', 'Flanger', 'Phaser', 'Delay'], de: ['Chorus', 'Flanger', 'Phaser', 'Delay'], ja: ['コーラス', 'フランジャー', 'フェイザー', 'ディレイ'] }, c: 2, x: { es: 'El phaser genera notches con desplazamiento de fase, sin retardo.', en: 'The phaser creates notches through phase shift, without delay.', de: 'Der Phaser erzeugt Kerben über Phasenverschiebung, ohne Delay.', ja: 'フェイザーはディレイではなく位相シフトでノッチを作ります。' } },
      { q: { es: 'A 100 BPM, ¿cuánto dura una negra?', en: 'At 100 BPM, how long is a quarter note?', de: 'Wie lang ist eine Viertel bei 100 BPM?', ja: '100 BPMで4分音符の長さは？' }, o: { es: ['500 ms', '600 ms', '750 ms', '1000 ms'], en: ['500 ms', '600 ms', '750 ms', '1000 ms'], de: ['500 ms', '600 ms', '750 ms', '1000 ms'], ja: ['500 ms', '600 ms', '750 ms', '1000 ms'] }, c: 1, x: { es: '60000 / 100 = 600 ms.', en: '60000 / 100 = 600 ms.', de: '60000 / 100 = 600 ms.', ja: '60000 / 100＝600 ms。' } },
      { q: { es: '¿Qué hace el pre-delay en una reverb?', en: 'What does pre-delay do in a reverb?', de: 'Was bewirkt Pre-Delay im Hall?', ja: 'リバーブのプリディレイの役割は？' }, o: { es: ['Alarga la cola', 'Separa el sonido directo de la reverberación', 'Agrega graves', 'Sincroniza al tempo'], en: ['Lengthens the tail', 'Separates the direct sound from the reverb', 'Adds bass', 'Syncs to tempo'], de: ['Verlängert die Fahne', 'Trennt Direktschall und Hall', 'Mehr Bass', 'Temposync'], ja: ['残響を長くする', '直接音と残響を分ける', '低音を加える', 'テンポ同期'] }, c: 1, x: { es: 'Preserva la claridad del ataque.', en: 'It preserves attack clarity.', de: 'Bewahrt die Klarheit des Anschlags.', ja: 'アタックの明瞭さを保ちます。' } },
      { q: { es: 'El flanger produce un…', en: 'A flanger produces a…', de: 'Ein Flanger erzeugt ein…', ja: 'フランジャーが作るのは…' }, o: { es: ['Filtro peine móvil', 'Pasa bajos fijo', 'Reverb', 'Bitcrush'], en: ['Moving comb filter', 'Fixed low-pass', 'Reverb', 'Bitcrush'], de: ['Wanderndes Kammfilter', 'Festen Tiefpass', 'Hall', 'Bitcrush'], ja: ['動くコムフィルター', '固定ローパス', 'リバーブ', 'ビットクラッシュ'] }, c: 0, x: { es: 'Un retardo corto mezclado con el original genera picos y valles regularmente espaciados.', en: 'A short delay mixed with the original gives regularly spaced peaks and notches.', de: 'Kurzes Delay plus Original ergibt regelmäßige Spitzen und Kerben.', ja: '短いディレイを原音と混ぜると等間隔のピークと谷ができます。' } },
      { q: { es: 'El "bombeo" del house se logra con…', en: 'House "pumping" is achieved with…', de: 'Das „Pumpen" im House entsteht durch…', ja: 'ハウスの「パンピング」を作るのは…' }, o: { es: ['Chorus', 'Compresión con sidechain desde el bombo', 'Reverb larga', 'FM'], en: ['Chorus', 'Compression sidechained from the kick', 'Long reverb', 'FM'], de: ['Chorus', 'Kompression mit Sidechain von der Kick', 'Langen Hall', 'FM'], ja: ['コーラス', 'キックからのサイドチェーン・コンプ', '長いリバーブ', 'FM'] }, c: 1, x: { es: 'Cada golpe de bombo baja el volumen del resto.', en: 'Each kick ducks the rest.', de: 'Jede Kick drückt den Rest weg.', ja: 'キックのたびに他のパートの音量が下がります。' } }
    ]
  });

  /* ===================== 15. SECUENCIACIÓN, MIDI, PERFORMANCE ===================== */
  M({
    id: 'seq', lv: 3, lab: ['seq'],
    title: { es: 'Secuenciación, MIDI y performance', en: 'Sequencing, MIDI and performance', de: 'Sequencing, MIDI und Performance', ja: 'シーケンス・MIDI・パフォーマンス' },
    sum: { es: 'Secuenciadores por pasos, acentos y slides, arpegiadores, ritmos euclidianos, MIDI (notas, CC, clock), MPE y sincronización.', en: 'Step sequencers, accents and slides, arpeggiators, Euclidean rhythms, MIDI (notes, CC, clock), MPE and sync.', de: 'Step-Sequencer, Akzente und Slides, Arpeggiatoren, euklidische Rhythmen, MIDI (Noten, CC, Clock), MPE und Sync.', ja: 'ステップ・シーケンサー、アクセントとスライド、アルペジエーター、ユークリッド・リズム、MIDI（ノート、CC、クロック）、MPE、同期。' },
    key: {
      es: ['Un secuenciador por pasos dispara notas en una grilla (típicamente 16 pasos = 1 compás de semicorcheas).', 'Acento (velocidad → filtro) y slide (glide) son el alma del acid.', 'Los <b>ritmos euclidianos</b> E(k,n) reparten k golpes lo más uniformemente posible en n pasos: muchos ritmos tradicionales del mundo.', 'MIDI 1.0 (1983) transmite eventos: Note On/Off con velocidad, CC, pitch bend, aftertouch, clock.', 'MIDI 2.0 y MPE agregan resolución y expresión por nota.'],
      en: ['A step sequencer fires notes on a grid (typically 16 steps = one bar of 16ths).', 'Accent (velocity → filter) and slide (glide) are the soul of acid.', '<b>Euclidean rhythms</b> E(k,n) spread k hits as evenly as possible over n steps: many traditional world rhythms.', 'MIDI 1.0 (1983) sends events: Note On/Off with velocity, CC, pitch bend, aftertouch, clock.', 'MIDI 2.0 and MPE add resolution and per-note expression.'],
      de: ['Ein Step-Sequencer löst Noten auf einem Raster aus (typisch 16 Schritte = ein Takt in Sechzehnteln).', 'Accent (Velocity → Filter) und Slide (Glide) sind die Seele von Acid.', '<b>Euklidische Rhythmen</b> E(k,n) verteilen k Schläge möglichst gleichmäßig auf n Schritte: viele traditionelle Rhythmen der Welt.', 'MIDI 1.0 (1983) überträgt Ereignisse: Note On/Off mit Velocity, CC, Pitch Bend, Aftertouch, Clock.', 'MIDI 2.0 und MPE bringen Auflösung und Ausdruck pro Note.'],
      ja: ['ステップ・シーケンサーはグリッド上で音を鳴らす（通常16ステップ＝16分音符で1小節）。', 'アクセント（ベロシティ→フィルター）とスライド（グライド）がアシッドの魂。', '<b>ユークリッド・リズム</b>E(k,n)はk個の打点をnステップにできるだけ均等に配置する：世界の多くの伝統リズム。', 'MIDI 1.0（1983）はイベントを送る：ベロシティ付きノートオン／オフ、CC、ピッチベンド、アフタータッチ、クロック。', 'MIDI 2.0とMPEは解像度と音ごとの表現を加える。']
    },
    sec: [
      {
        h: { es: 'Secuenciadores por pasos', en: 'Step sequencers', de: 'Step-Sequencer', ja: 'ステップ・シーケンサー' },
        b: {
          es: `<p>Desde los secuenciadores analógicos de 8–16 pasos de Moog y ARP hasta la TR-808 y la TB-303, la grilla de pasos definió géneros enteros. Cada paso tiene: <b>activo/inactivo</b>, <b>nota</b>, <b>acento</b>, <b>slide/tie</b>, y en máquinas modernas: probabilidad, micro-timing, "parameter locks" (Elektron: cualquier parámetro puede cambiar en un paso).</p>
<ul><li><b>Acento</b> en la 303: sube volumen y, sobre todo, la envolvente del filtro; combinado con resonancia alta da los "gritos".</li><li><b>Slide</b>: la nota se liga a la siguiente con glide, sin reiniciar envolvente.</li><li><b>Swing</b>: retrasa los pasos pares (semicorcheas a contratiempo) un porcentaje: de cuadrado a "shuffle" (MPC, 808).</li><li><b>Longitudes distintas</b> por pista (polimetría): una pista de 16 y otra de 12 crean patrones que se desfasan.</li></ul>`,
          en: `<p>From Moog and ARP 8–16-step analogue sequencers to the TR-808 and TB-303, the step grid defined whole genres. Each step has: <b>on/off</b>, <b>note</b>, <b>accent</b>, <b>slide/tie</b>, and on modern machines: probability, micro-timing, "parameter locks" (Elektron: any parameter can change on one step).</p>
<ul><li><b>Accent</b> on the 303: raises volume and, above all, the filter envelope; with high resonance it gives the "screams".</li><li><b>Slide</b>: the note ties to the next with glide, without retriggering the envelope.</li><li><b>Swing</b>: delays the even steps (off-beat 16ths) by a percentage: from square to shuffle (MPC, 808).</li><li><b>Different lengths</b> per track (polymeter): a 16-step and a 12-step track create shifting patterns.</li></ul>`,
          de: `<p>Von den analogen 8–16-Step-Sequencern von Moog und ARP bis zu TR-808 und TB-303 definierte das Step-Raster ganze Genres. Jeder Schritt hat: <b>an/aus</b>, <b>Note</b>, <b>Accent</b>, <b>Slide/Tie</b>, moderne Geräte auch Wahrscheinlichkeit, Mikrotiming, „Parameter Locks" (Elektron: jeder Parameter pro Schritt).</p>
<ul><li><b>Accent</b> bei der 303: mehr Lautstärke und vor allem Filterhüllkurve; mit hoher Resonanz die „Schreie".</li><li><b>Slide</b>: Die Note wird mit Glide zur nächsten gebunden, ohne Hüllkurven-Neustart.</li><li><b>Swing</b>: verzögert die geraden Schritte prozentual: von gerade zu Shuffle (MPC, 808).</li><li><b>Unterschiedliche Längen</b> pro Spur (Polymetrik): 16 und 12 Schritte erzeugen wandernde Muster.</li></ul>`,
          ja: `<p>MoogやARPの8〜16ステップのアナログ・シーケンサーからTR-808、TB-303まで、ステップのグリッドはジャンルそのものを定義しました。各ステップには<b>オン／オフ</b>、<b>音程</b>、<b>アクセント</b>、<b>スライド／タイ</b>があり、現代の機材では確率、マイクロタイミング、「パラメーター・ロック」（Elektron：任意のパラメーターをステップごとに変更）もあります。</p>
<ul><li>303の<b>アクセント</b>：音量と、何よりフィルター・エンベロープを上げる。高いレゾナンスと組み合わせて「叫び」になる。</li><li><b>スライド</b>：エンベロープを再始動せずグライドで次の音につなぐ。</li><li><b>スウィング</b>：偶数ステップ（裏の16分）を一定割合遅らせる：イーブンから「シャッフル」へ（MPC、808）。</li><li>トラックごとに<b>異なる長さ</b>（ポリメーター）：16ステップと12ステップのトラックはずれていくパターンを作る。</li></ul>`
        }
      },
      {
        h: { es: 'Arpegiadores y ritmos euclidianos', en: 'Arpeggiators and Euclidean rhythms', de: 'Arpeggiatoren und euklidische Rhythmen', ja: 'アルペジエーターとユークリッド・リズム' },
        b: {
          es: `<p>Un <b>arpegiador</b> toma las notas mantenidas y las toca una por una: modos arriba, abajo, arriba-abajo, aleatorio, orden de pulsación; rango de octavas; división rítmica; gate. Es la base del sonido de Jarre, Giorgio Moroder o del synth-pop.</p>
<p><b>Ritmos euclidianos</b> (Godfried Toussaint, 2005): distribuir k pulsos en n pasos de la forma más pareja (el mismo algoritmo de Euclides para el máximo común divisor). Ejemplos:</p>
<ul><li>E(3,8) = x..x..x. → <b>tresillo</b> cubano.</li><li>E(5,8) = x.xx.xx. → cinquillo.</li><li>E(5,16) → bossa nova.</li><li>E(7,12) → patrón de campana de África occidental.</li></ul>
<p>Rotar el patrón (empezar en otro paso) genera variaciones. En el secuenciador del lab podés aplicar E(k,16) a bombo, hi-hat o al sinte.</p>`,
          en: `<p>An <b>arpeggiator</b> takes held notes and plays them one by one: up, down, up-down, random, as-played; octave range; rhythmic division; gate. Basis of Jarre, Giorgio Moroder and synth-pop.</p>
<p><b>Euclidean rhythms</b> (Godfried Toussaint, 2005): distribute k pulses over n steps as evenly as possible (the same Euclidean algorithm for the greatest common divisor). Examples:</p>
<ul><li>E(3,8) = x..x..x. → Cuban <b>tresillo</b>.</li><li>E(5,8) = x.xx.xx. → cinquillo.</li><li>E(5,16) → bossa nova.</li><li>E(7,12) → West African bell pattern.</li></ul>
<p>Rotating the pattern (starting on another step) gives variations. In the lab sequencer you can apply E(k,16) to kick, hi-hat or synth.</p>`,
          de: `<p>Ein <b>Arpeggiator</b> spielt gehaltene Noten einzeln: aufwärts, abwärts, auf-ab, zufällig, Anschlagreihenfolge; Oktavbereich; rhythmische Teilung; Gate. Basis von Jarre, Giorgio Moroder und Synthpop.</p>
<p><b>Euklidische Rhythmen</b> (Godfried Toussaint, 2005): k Pulse möglichst gleichmäßig auf n Schritte verteilen (derselbe euklidische Algorithmus wie für den ggT). Beispiele:</p>
<ul><li>E(3,8) = x..x..x. → kubanischer <b>Tresillo</b>.</li><li>E(5,8) = x.xx.xx. → Cinquillo.</li><li>E(5,16) → Bossa Nova.</li><li>E(7,12) → westafrikanisches Glockenmuster.</li></ul>
<p>Rotieren ergibt Variationen. Im Labor-Sequencer kannst du E(k,16) auf Kick, Hi-Hat oder Synth anwenden.</p>`,
          ja: `<p><b>アルペジエーター</b>は押さえた音を1音ずつ演奏します：アップ、ダウン、アップダウン、ランダム、押鍵順。オクターブ範囲、リズムの分割、ゲート。ジャン＝ミシェル・ジャール、ジョルジオ・モロダー、シンセポップの基本です。</p>
<p><b>ユークリッド・リズム</b>（ゴドフリード・トゥーサン、2005）：k個のパルスをnステップにできるだけ均等に分配（最大公約数を求めるユークリッドの互除法と同じ）。例：</p>
<ul><li>E(3,8) = x..x..x.→キューバの<b>トレシージョ</b>。</li><li>E(5,8) = x.xx.xx.→シンキージョ。</li><li>E(5,16)→ボサノヴァ。</li><li>E(7,12)→西アフリカのベル・パターン。</li></ul>
<p>パターンを回転（別のステップから開始）するとバリエーションが生まれます。ラボのシーケンサーではE(k,16)をキック、ハイハット、シンセに適用できます。</p>`
        }
      },
      {
        h: { es: 'MIDI y MPE en lo esencial', en: 'MIDI and MPE essentials', de: 'MIDI und MPE: das Wesentliche', ja: 'MIDIとMPEの要点' },
        b: {
          es: `<ul><li><b>Note On / Note Off</b>: número de nota (0–127, C4 = 60) y velocidad (0–127).</li><li><b>Control Change (CC)</b>: 128 controladores (CC1 = rueda de modulación, CC7 = volumen, CC64 = sustain, CC74 = brillo/corte en muchos sintes).</li><li><b>Pitch bend</b>: 14 bits (±2 semitonos por defecto).</li><li><b>Aftertouch</b>: de canal (uno para todo el teclado) o polifónico (por tecla).</li><li><b>Program Change</b>, <b>SysEx</b> (datos propietarios: volcado de patches).</li><li><b>Clock</b>: 24 pulsos por negra + Start/Stop para sincronizar tempo.</li><li>16 <b>canales</b> por puerto.</li></ul>
<p><b>MPE</b> asigna un canal distinto a cada nota, así cada una tiene su propio pitch bend, presión y CC74: glissandos independientes y vibrato por nota. <b>MIDI 2.0</b> (2020) agrega 32 bits de resolución, perfiles y negociación bidireccional.</p>`,
          en: `<ul><li><b>Note On / Note Off</b>: note number (0–127, C4 = 60) and velocity (0–127).</li><li><b>Control Change (CC)</b>: 128 controllers (CC1 = mod wheel, CC7 = volume, CC64 = sustain, CC74 = brightness/cutoff on many synths).</li><li><b>Pitch bend</b>: 14 bits (±2 semitones by default).</li><li><b>Aftertouch</b>: channel (one for the whole keyboard) or polyphonic (per key).</li><li><b>Program Change</b>, <b>SysEx</b> (proprietary data: patch dumps).</li><li><b>Clock</b>: 24 pulses per quarter note + Start/Stop to sync tempo.</li><li>16 <b>channels</b> per port.</li></ul>
<p><b>MPE</b> gives each note its own channel, so each has its own pitch bend, pressure and CC74: independent glissandi and per-note vibrato. <b>MIDI 2.0</b> (2020) adds 32-bit resolution, profiles and bidirectional negotiation.</p>`,
          de: `<ul><li><b>Note On / Note Off</b>: Notennummer (0–127, C4 = 60) und Velocity (0–127).</li><li><b>Control Change (CC)</b>: 128 Controller (CC1 = Modrad, CC7 = Lautstärke, CC64 = Sustain, CC74 = Helligkeit/Cutoff bei vielen Synths).</li><li><b>Pitch Bend</b>: 14 Bit (standardmäßig ±2 Halbtöne).</li><li><b>Aftertouch</b>: Kanal (für alle Tasten) oder polyphon (pro Taste).</li><li><b>Program Change</b>, <b>SysEx</b> (herstellerspezifisch: Patch-Dumps).</li><li><b>Clock</b>: 24 Pulse pro Viertel + Start/Stop zur Temposynchronisation.</li><li>16 <b>Kanäle</b> pro Port.</li></ul>
<p><b>MPE</b> gibt jeder Note einen eigenen Kanal mit eigenem Pitch Bend, Druck und CC74: unabhängige Glissandi und Vibrato pro Note. <b>MIDI 2.0</b> (2020) bringt 32-Bit-Auflösung, Profile und bidirektionale Aushandlung.</p>`,
          ja: `<ul><li><b>ノートオン／ノートオフ</b>：ノート番号（0〜127、C4＝60）とベロシティ（0〜127）。</li><li><b>コントロール・チェンジ（CC）</b>：128個のコントローラー（CC1＝モジュレーション・ホイール、CC7＝音量、CC64＝サステイン、CC74＝多くのシンセで明るさ／カットオフ）。</li><li><b>ピッチベンド</b>：14ビット（既定は±2半音）。</li><li><b>アフタータッチ</b>：チャンネル（鍵盤全体で1つ）またはポリフォニック（鍵ごと）。</li><li><b>プログラム・チェンジ</b>、<b>SysEx</b>（メーカー独自データ：パッチのダンプ）。</li><li><b>クロック</b>：4分音符あたり24パルス＋スタート／ストップでテンポ同期。</li><li>ポートあたり16<b>チャンネル</b>。</li></ul>
<p><b>MPE</b>は各音に別々のチャンネルを割り当て、それぞれが独自のピッチベンド、圧力、CC74を持ちます：独立したグリッサンドや音ごとのビブラート。<b>MIDI 2.0</b>（2020）は32ビット解像度、プロファイル、双方向ネゴシエーションを追加しました。</p>`
        }
      }
    ],
    ex: {
      es: ['Secuenciador: con el preset ACID, tocá el patrón y mové en vivo corte, resonancia y env→filtro. Es la "performance" clásica de la 303.', 'Generá E(3,8)-like con E(6,16) en el bombo, E(5,16) en el hi-hat. ¿Qué estilo evoca?', 'Probá swing 0%, 30% y 55%. ¿En qué valor empieza a sonar "shuffle"?', 'Escribí una línea de bajo de 16 pasos en escala dórica y marcá los acentos en los tiempos 1, 7 y 11.', 'Calculá: ¿cuántos pulsos de MIDI clock hay en un compás de 4/4? (24 × 4 = 96).'],
      en: ['Sequencer: with the ACID preset, play the pattern and tweak cutoff, resonance and env→filter live. The classic 303 "performance".', 'Put E(6,16) on the kick and E(5,16) on the hi-hat. What style does it evoke?', 'Try swing 0%, 30% and 55%. At what value does it start sounding "shuffled"?', 'Write a 16-step bass line in Dorian and place accents on steps 1, 7 and 11.', 'Compute: how many MIDI clock pulses are in a 4/4 bar? (24 × 4 = 96).'],
      de: ['Sequencer: Preset ACID, Pattern spielen und live Cutoff, Resonanz und Hk→Filter drehen – die klassische 303-„Performance".', 'E(6,16) auf die Kick, E(5,16) auf die Hi-Hat. Welcher Stil?', 'Swing 0 %, 30 % und 55 % testen. Ab wann klingt es nach Shuffle?', 'Schreibe eine 16-Schritt-Basslinie in Dorisch mit Akzenten auf 1, 7 und 11.', 'Rechne: Wie viele MIDI-Clock-Pulse hat ein 4/4-Takt? (24 × 4 = 96).'],
      ja: ['シーケンサー：ACIDプリセットでパターンを鳴らし、カットオフ、レゾナンス、エンベ→フィルターをリアルタイムで動かそう。303の定番「パフォーマンス」。', 'キックにE(6,16)、ハイハットにE(5,16)。どんなスタイルを思わせる？', 'スウィング0%、30%、55%を試そう。どの値から「シャッフル」に聞こえる？', 'ドリアンで16ステップのベースラインを書き、ステップ1・7・11にアクセントを置こう。', '計算：4/4拍子1小節のMIDIクロックは何パルス？（24×4＝96）']
    },
    deep: {
      es: `<h3>El algoritmo de Bjorklund</h3>
<p>El patrón euclidiano se puede obtener con una fórmula simple (la que usa el lab): el paso i está activo si <code>floor(i·k/n) ≠ floor((i−1)·k/n)</code>. El algoritmo original de Bjorklund (para temporización de aceleradores de partículas) agrupa recursivamente secuencias de "1" y "0" como en la división de Euclides y produce los mismos patrones salvo rotación.</p>
<h3>Música generativa</h3>
<p>Secuenciadores con <b>probabilidad</b> por paso, <b>condiciones</b> (tocar solo cada 3ª vez), <b>cadenas de Markov</b> (la próxima nota depende de la actual), <b>Turing Machine</b> (registro de 16 bits que muta con probabilidad p) o <b>autómatas celulares</b> generan música que evoluciona sola. Brian Eno ("Music for Airports") usó loops de cinta de longitudes no múltiplos para producir combinaciones que casi nunca se repiten: la misma idea que la polimetría.</p>
<h3>Latencia y jitter</h3>
<p>El MIDI DIN transmite a 31,25 kbit/s: un Note On (3 bytes) tarda ~1 ms. Un acorde de 10 notas llega "arpegiado" en 10 ms. Por eso las grillas cuantizadas de hardware a veces se sienten distintas que las de software. Este secuenciador web programa los eventos con el reloj del motor de audio (lookahead scheduling) para minimizar el jitter.</p>`,
      en: `<h3>Bjorklund's algorithm</h3>
<p>Euclidean patterns can be obtained with a simple formula (used in the lab): step i is on if <code>floor(i·k/n) ≠ floor((i−1)·k/n)</code>. Bjorklund's original algorithm (for particle accelerator timing) recursively groups sequences of 1s and 0s as in Euclid's division and yields the same patterns up to rotation.</p>
<h3>Generative music</h3>
<p>Sequencers with per-step <b>probability</b>, <b>conditions</b> (play only every 3rd time), <b>Markov chains</b> (next note depends on the current one), a <b>Turing Machine</b> (16-bit register mutating with probability p) or <b>cellular automata</b> produce self-evolving music. Brian Eno ("Music for Airports") used tape loops of non-multiple lengths to produce combinations that almost never repeat: the same idea as polymeter.</p>
<h3>Latency and jitter</h3>
<p>DIN MIDI runs at 31.25 kbit/s: a Note On (3 bytes) takes ~1 ms. A 10-note chord arrives "arpeggiated" over 10 ms. That's why hardware quantised grids sometimes feel different from software. This web sequencer schedules events with the audio engine's clock (lookahead scheduling) to minimise jitter.</p>`,
      de: `<h3>Bjorklund-Algorithmus</h3>
<p>Euklidische Muster erhält man mit einer einfachen Formel (im Labor): Schritt i ist aktiv, wenn <code>floor(i·k/n) ≠ floor((i−1)·k/n)</code>. Bjorklunds Original (für Teilchenbeschleuniger-Timing) gruppiert rekursiv Folgen von 1 und 0 wie bei Euklids Division und liefert bis auf Rotation dieselben Muster.</p>
<h3>Generative Musik</h3>
<p>Sequencer mit <b>Wahrscheinlichkeit</b> pro Schritt, <b>Bedingungen</b> (nur jedes 3. Mal), <b>Markov-Ketten</b>, <b>Turing Machine</b> (16-Bit-Register, das mit Wahrscheinlichkeit p mutiert) oder <b>zelluläre Automaten</b> erzeugen sich selbst entwickelnde Musik. Brian Eno („Music for Airports") nutzte Bandschleifen ungleicher Länge für fast nie wiederkehrende Kombinationen – dieselbe Idee wie Polymetrik.</p>
<h3>Latenz und Jitter</h3>
<p>DIN-MIDI läuft mit 31,25 kbit/s: Ein Note On (3 Bytes) braucht ~1 ms. Ein 10-Ton-Akkord kommt über 10 ms „arpeggiert" an. Dieser Web-Sequencer plant Ereignisse mit der Uhr der Audio-Engine (Lookahead-Scheduling), um Jitter zu minimieren.</p>`,
      ja: `<h3>ビョルクルンドのアルゴリズム</h3>
<p>ユークリッド・パターンは簡単な式（ラボで使用）で得られます：<code>floor(i·k/n) ≠ floor((i−1)·k/n)</code>ならステップiはオン。ビョルクルンドの元のアルゴリズム（粒子加速器のタイミング用）はユークリッドの割り算のように1と0の列を再帰的にまとめ、回転を除いて同じパターンを生みます。</p>
<h3>ジェネレーティブ・ミュージック</h3>
<p>ステップごとの<b>確率</b>、<b>条件</b>（3回に1回だけ鳴らす）、<b>マルコフ連鎖</b>（次の音が現在の音に依存）、<b>チューリング・マシン</b>（確率pで変異する16ビット・レジスタ）、<b>セル・オートマトン</b>などのシーケンサーは自ら進化する音楽を生みます。ブライアン・イーノ（「Music for Airports」）は長さが倍数関係にないテープループで、ほとんど繰り返さない組み合わせを作りました。ポリメーターと同じ発想です。</p>
<h3>レイテンシーとジッター</h3>
<p>DIN MIDIは31.25 kbit/sで、ノートオン（3バイト）に約1 msかかります。10音の和音は10 msかけて「アルペジオ」のように届きます。このWebシーケンサーはジッターを最小にするため、オーディオ・エンジンの時計でイベントを先読みスケジュールしています。</p>`
    },
    read: ['Godfried Toussaint — "The Euclidean Algorithm Generates Traditional Musical Rhythms" (2005)', 'MIDI Association — especificaciones MIDI 1.0 / 2.0 / MPE (midi.org)', 'Chris Wilson — "A Tale of Two Clocks" (scheduling en Web Audio)', 'Manuales de Elektron (parameter locks, trig conditions)'],
    quiz: [
      { q: { es: '¿Qué patrón es E(3,8)?', en: 'Which pattern is E(3,8)?', de: 'Welches Muster ist E(3,8)?', ja: 'E(3,8)のパターンは？' }, o: { es: ['x.x.x...', 'x..x..x.', 'xxx.....', 'x...x...'], en: ['x.x.x...', 'x..x..x.', 'xxx.....', 'x...x...'], de: ['x.x.x...', 'x..x..x.', 'xxx.....', 'x...x...'], ja: ['x.x.x...', 'x..x..x.', 'xxx.....', 'x...x...'] }, c: 1, x: { es: 'El tresillo cubano: 3+3+2.', en: 'The Cuban tresillo: 3+3+2.', de: 'Der kubanische Tresillo: 3+3+2.', ja: 'キューバのトレシージョ：3+3+2。' } },
      { q: { es: '¿Qué hace el "slide" en un secuenciador tipo 303?', en: 'What does "slide" do on a 303-style sequencer?', de: 'Was macht „Slide" bei einem 303-Sequencer?', ja: '303型シーケンサーの「スライド」とは？' }, o: { es: ['Sube el volumen', 'Liga la nota a la siguiente con glide', 'Repite el paso', 'Cambia la escala'], en: ['Raises volume', 'Ties the note to the next with glide', 'Repeats the step', 'Changes the scale'], de: ['Lauter', 'Bindet die Note mit Glide an die nächste', 'Wiederholt den Schritt', 'Ändert die Tonleiter'], ja: ['音量を上げる', 'グライドで次の音につなぐ', 'ステップを繰り返す', 'スケールを変える'] }, c: 1, x: { es: 'Sin reiniciar la envolvente.', en: 'Without retriggering the envelope.', de: 'Ohne Hüllkurven-Neustart.', ja: 'エンベロープは再始動しません。' } },
      { q: { es: '¿Cuántos pulsos por negra envía el MIDI clock?', en: 'How many pulses per quarter note does MIDI clock send?', de: 'Wie viele Pulse pro Viertel sendet MIDI Clock?', ja: 'MIDIクロックは4分音符あたり何パルス？' }, o: { es: ['4', '16', '24', '96'], en: ['4', '16', '24', '96'], de: ['4', '16', '24', '96'], ja: ['4', '16', '24', '96'] }, c: 2, x: { es: '24 PPQN.', en: '24 PPQN.', de: '24 PPQN.', ja: '24 PPQN。' } },
      { q: { es: '¿Qué CC es la rueda de modulación?', en: 'Which CC is the mod wheel?', de: 'Welcher CC ist das Modrad?', ja: 'モジュレーション・ホイールのCCは？' }, o: { es: ['CC1', 'CC7', 'CC64', 'CC74'], en: ['CC1', 'CC7', 'CC64', 'CC74'], de: ['CC1', 'CC7', 'CC64', 'CC74'], ja: ['CC1', 'CC7', 'CC64', 'CC74'] }, c: 0, x: { es: 'CC7 es volumen, CC64 sustain, CC74 brillo.', en: 'CC7 volume, CC64 sustain, CC74 brightness.', de: 'CC7 Lautstärke, CC64 Sustain, CC74 Helligkeit.', ja: 'CC7＝音量、CC64＝サステイン、CC74＝明るさ。' } },
      { q: { es: 'MPE permite…', en: 'MPE allows…', de: 'MPE ermöglicht…', ja: 'MPEで可能になるのは…' }, o: { es: ['Más canales de audio', 'Pitch bend y presión independientes por nota', 'Mayor tempo', 'Samples más largos'], en: ['More audio channels', 'Independent per-note pitch bend and pressure', 'Faster tempo', 'Longer samples'], de: ['Mehr Audiokanäle', 'Unabhängiges Pitch Bend und Druck pro Note', 'Höheres Tempo', 'Längere Samples'], ja: ['より多くのオーディオ・チャンネル', '音ごとに独立したピッチベンドと圧力', 'より速いテンポ', 'より長いサンプル'] }, c: 1, x: { es: 'Cada nota usa su propio canal MIDI.', en: 'Each note uses its own MIDI channel.', de: 'Jede Note nutzt einen eigenen MIDI-Kanal.', ja: '各音が専用のMIDIチャンネルを使います。' } }
    ]
  });

  /* ===================== 16. DSP Y SÍNTESIS DIGITAL ===================== */
  M({
    id: 'dsp', lv: 3, lab: ['dsp', 'osc'],
    title: { es: 'Audio digital y DSP para sintesistas', en: 'Digital audio and DSP for synthesists', de: 'Digitales Audio und DSP für Synthesisten', ja: 'シンセ奏者のためのデジタル音声とDSP' },
    sum: { es: 'Muestreo, Nyquist, cuantización y bits, aliasing, oversampling, filtros digitales, osciladores de tabla y cómo se programa un sinte.', en: 'Sampling, Nyquist, quantisation and bits, aliasing, oversampling, digital filters, table oscillators and how a synth is programmed.', de: 'Abtastung, Nyquist, Quantisierung und Bits, Aliasing, Oversampling, digitale Filter, Tabellenoszillatoren und wie man einen Synth programmiert.', ja: 'サンプリング、ナイキスト、量子化とビット、エイリアシング、オーバーサンプリング、デジタル・フィルター、テーブル・オシレーター、シンセのプログラミング。' },
    key: {
      es: ['El audio digital es una lista de números: <b>fs</b> muestras por segundo, cada una con <b>N bits</b>.', 'Teorema de muestreo: se representa sin pérdida todo lo que esté por debajo de <b>fs/2</b> (Nyquist).', 'Cada bit agrega ≈ <b>6 dB</b> de rango dinámico: 16 bits ≈ 96 dB, 24 bits ≈ 144 dB.', 'La reducción de bits y de frecuencia de muestreo son efectos creativos (lo-fi, bitcrush).', 'Un sinte digital es un bucle que calcula muestras: fase → forma de onda → filtro → envolvente.'],
      en: ['Digital audio is a list of numbers: <b>fs</b> samples per second, each with <b>N bits</b>.', 'Sampling theorem: everything below <b>fs/2</b> (Nyquist) is represented without loss.', 'Each bit adds ≈ <b>6 dB</b> of dynamic range: 16 bits ≈ 96 dB, 24 bits ≈ 144 dB.', 'Bit and sample-rate reduction are creative effects (lo-fi, bitcrush).', 'A digital synth is a loop computing samples: phase → waveform → filter → envelope.'],
      de: ['Digitales Audio ist eine Zahlenliste: <b>fs</b> Samples pro Sekunde mit je <b>N Bit</b>.', 'Abtasttheorem: Alles unter <b>fs/2</b> (Nyquist) wird verlustfrei dargestellt.', 'Jedes Bit bringt ≈ <b>6 dB</b> Dynamik: 16 Bit ≈ 96 dB, 24 Bit ≈ 144 dB.', 'Bit- und Abtastratenreduktion sind kreative Effekte (Lo-Fi, Bitcrush).', 'Ein Digitalsynth ist eine Schleife, die Samples berechnet: Phase → Wellenform → Filter → Hüllkurve.'],
      ja: ['デジタル音声は数値の列：毎秒<b>fs</b>個のサンプル、それぞれ<b>Nビット</b>。', 'サンプリング定理：<b>fs/2</b>（ナイキスト）未満はすべて損失なく表現できる。', '1ビットごとに約<b>6 dB</b>のダイナミックレンジ：16ビット≈96 dB、24ビット≈144 dB。', 'ビット数とサンプリングレートの削減はクリエイティブな効果（ローファイ、ビットクラッシュ）。', 'デジタルシンセはサンプルを計算するループ：位相→波形→フィルター→エンベロープ。']
    },
    sec: [
      {
        h: { es: 'Muestreo y cuantización', en: 'Sampling and quantisation', de: 'Abtastung und Quantisierung', ja: 'サンプリングと量子化' },
        b: {
          es: `<p>Un conversor A/D mide la señal <b>fs</b> veces por segundo (44,1 kHz CD, 48 kHz video, 96 kHz estudio). El <b>teorema de Nyquist-Shannon</b> asegura que si la señal no contiene frecuencias ≥ fs/2, se puede reconstruir exactamente. Por eso antes de convertir se usa un filtro anti-aliasing.</p>
<p>Cada muestra se redondea a un valor entre 2<sup>N</sup> niveles: el error de redondeo es <b>ruido de cuantización</b>. Rango dinámico ≈ 6,02·N + 1,76 dB. En niveles bajos el error se correlaciona con la señal y suena como distorsión; el <b>dither</b> (ruido mínimo agregado) lo convierte en un siseo neutro.</p>
<p>Internamente, los sintes y DAWs modernos calculan en <b>coma flotante de 32/64 bits</b>: prácticamente sin límite de rango, aunque al final todo se convierte al formato de salida.</p>`,
          en: `<p>An A/D converter measures the signal <b>fs</b> times per second (44.1 kHz CD, 48 kHz video, 96 kHz studio). The <b>Nyquist-Shannon theorem</b> guarantees exact reconstruction if the signal contains no frequencies ≥ fs/2. Hence an anti-aliasing filter before conversion.</p>
<p>Each sample is rounded to one of 2<sup>N</sup> levels: the rounding error is <b>quantisation noise</b>. Dynamic range ≈ 6.02·N + 1.76 dB. At low levels the error correlates with the signal and sounds like distortion; <b>dither</b> (a tiny added noise) turns it into neutral hiss.</p>
<p>Internally, modern synths and DAWs compute in <b>32/64-bit floating point</b>: virtually unlimited range, though everything is finally converted to the output format.</p>`,
          de: `<p>Ein A/D-Wandler misst das Signal <b>fs</b>-mal pro Sekunde (44,1 kHz CD, 48 kHz Video, 96 kHz Studio). Das <b>Nyquist-Shannon-Theorem</b> garantiert exakte Rekonstruktion, wenn keine Frequenzen ≥ fs/2 enthalten sind – daher ein Anti-Aliasing-Filter vor der Wandlung.</p>
<p>Jedes Sample wird auf eine von 2<sup>N</sup> Stufen gerundet: Der Fehler ist <b>Quantisierungsrauschen</b>. Dynamik ≈ 6,02·N + 1,76 dB. Bei kleinen Pegeln korreliert der Fehler mit dem Signal und klingt verzerrt; <b>Dither</b> (minimales Rauschen) macht daraus neutrales Rauschen.</p>
<p>Intern rechnen moderne Synths und DAWs in <b>32/64-Bit-Gleitkomma</b>: praktisch unbegrenzter Bereich, am Ende wird ins Ausgabeformat gewandelt.</p>`,
          ja: `<p>A/D変換器は信号を毎秒<b>fs</b>回測定します（CDは44.1 kHz、映像は48 kHz、スタジオは96 kHz）。<b>ナイキスト＝シャノンの定理</b>は、信号にfs/2以上の周波数が含まれなければ正確に再構成できることを保証します。そのため変換前にアンチエイリアシング・フィルターを使います。</p>
<p>各サンプルは2<sup>N</sup>段階のどれかに丸められ、その誤差が<b>量子化ノイズ</b>です。ダイナミックレンジ≈6.02·N＋1.76 dB。小さなレベルでは誤差が信号と相関して歪みのように聞こえますが、<b>ディザー</b>（ごく小さなノイズの付加）でニュートラルなヒスに変わります。</p>
<p>現代のシンセやDAWは内部で<b>32/64ビット浮動小数点</b>で計算するので、レンジは事実上無制限です。最後に出力形式へ変換されます。</p>`
        }
      },
      {
        h: { es: 'Lo-fi como herramienta', en: 'Lo-fi as a tool', de: 'Lo-Fi als Werkzeug', ja: '道具としてのローファイ' },
        b: {
          es: `<p>Las primeras máquinas digitales (Fairlight a 8 bits, E-mu SP-1200 a 12 bits/26 kHz, Akai S950, LinnDrum) tenían limitaciones que hoy se buscan a propósito:</p>
<ul><li><b>Reducción de bits</b>: escalones en la onda → armónicos ásperos, ruido granulado que sigue a la señal.</li><li><b>Reducción de frecuencia de muestreo</b> (sample & hold de la señal sin filtrar): aliasing deliberado, tonos "metálicos" inarmónicos, carácter de videojuego.</li><li><b>Filtros de reconstrucción</b> imperfectos y conversores no lineales que suman color.</li></ul>
<div class="tip">Lab "Digital": tocá el preset LEAD bajando bits a 4 y downsample a ÷8. Luego compará el barrido ingenuo con el limitado en banda para oír el aliasing.</div>`,
          en: `<p>The first digital machines (8-bit Fairlight, 12-bit/26 kHz E-mu SP-1200, Akai S950, LinnDrum) had limitations that are now sought on purpose:</p>
<ul><li><b>Bit reduction</b>: steps in the wave → harsh harmonics, grainy noise following the signal.</li><li><b>Sample-rate reduction</b> (sample & hold of the unfiltered signal): deliberate aliasing, inharmonic "metallic" tones, video-game character.</li><li>Imperfect <b>reconstruction filters</b> and non-linear converters adding colour.</li></ul>
<div class="tip">"Digital" lab: play the LEAD preset with bits at 4 and downsample ÷8. Then compare the naive and band-limited sweeps to hear aliasing.</div>`,
          de: `<p>Die ersten digitalen Maschinen (8-Bit-Fairlight, 12 Bit/26 kHz E-mu SP-1200, Akai S950, LinnDrum) hatten Grenzen, die man heute bewusst sucht:</p>
<ul><li><b>Bitreduktion</b>: Stufen in der Welle → raue Obertöne, körniges Rauschen, das dem Signal folgt.</li><li><b>Abtastratenreduktion</b> (Sample & Hold ohne Filter): gewolltes Aliasing, unharmonische „metallische" Töne, Videospiel-Charakter.</li><li>Unperfekte <b>Rekonstruktionsfilter</b> und nichtlineare Wandler, die färben.</li></ul>
<div class="tip">Labor „Digital": LEAD-Preset mit 4 Bit und ÷8 spielen. Dann naiven und bandbegrenzten Sweep vergleichen.</div>`,
          ja: `<p>初期のデジタル機（8ビットのFairlight、12ビット／26 kHzのE-mu SP-1200、Akai S950、LinnDrum）の制約は、今ではあえて求められています：</p>
<ul><li><b>ビット削減</b>：波形に段差→ざらついた倍音、信号に付きまとう粒状のノイズ。</li><li><b>サンプリングレート削減</b>（フィルターなしでのサンプル＆ホールド）：意図的なエイリアシング、非調和な「金属的」音、ゲーム機のようなキャラクター。</li><li>不完全な<b>再構成フィルター</b>や非線形な変換器による色付け。</li></ul>
<div class="tip">「デジタル」ラボ：LEADプリセットでビットを4、ダウンサンプルを÷8にして弾こう。次に素朴なスイープと帯域制限スイープを比べてエイリアシングを聴こう。</div>`
        }
      },
      {
        h: { es: 'Cómo se programa un sintetizador', en: 'How a synthesizer is programmed', de: 'Wie man einen Synthesizer programmiert', ja: 'シンセサイザーのプログラミング' },
        b: {
          es: `<p>El núcleo de cualquier sinte digital es un bucle que, para cada muestra, actualiza un <b>acumulador de fase</b> y lo transforma en sonido:</p>
<span class="formula">fase += f / fs;  if (fase ≥ 1) fase −= 1;   sierra = 2·fase − 1</span>
<span class="formula">filtro (1 polo): y += a · (x − y),   a = 1 − e^(−2π·fc/fs)</span>
<span class="formula">envolvente: nivel += (objetivo − nivel) · coef   (curva exponencial)</span>
<p>Con esas tres líneas ya tenés oscilador, pasa bajos y envolvente. Lo demás —polifonía, anti-aliasing, modulación, efectos— son capas sobre ese bucle. Plataformas para empezar: <b>Web Audio API</b> (como esta app), <b>Pure Data</b> y <b>Max/MSP</b> (visuales), <b>SuperCollider</b>, <b>Csound</b>, <b>Faust</b> (compila a plugins), <b>JUCE</b> (C++ para VST/AU), <b>VCV Rack</b> (Eurorack virtual con SDK abierto), <b>Daisy/Teensy</b> (hardware).</p>`,
          en: `<p>The core of any digital synth is a loop that, for each sample, updates a <b>phase accumulator</b> and turns it into sound:</p>
<span class="formula">phase += f / fs;  if (phase ≥ 1) phase −= 1;   saw = 2·phase − 1</span>
<span class="formula">1-pole filter: y += a · (x − y),   a = 1 − e^(−2π·fc/fs)</span>
<span class="formula">envelope: level += (target − level) · coef   (exponential curve)</span>
<p>Those three lines give you an oscillator, a low-pass and an envelope. Everything else — polyphony, anti-aliasing, modulation, effects — is layered over that loop. Platforms to start: <b>Web Audio API</b> (like this app), <b>Pure Data</b> and <b>Max/MSP</b> (visual), <b>SuperCollider</b>, <b>Csound</b>, <b>Faust</b> (compiles to plugins), <b>JUCE</b> (C++ for VST/AU), <b>VCV Rack</b> (virtual Eurorack with open SDK), <b>Daisy/Teensy</b> (hardware).</p>`,
          de: `<p>Kern jedes Digitalsynths ist eine Schleife, die pro Sample einen <b>Phasenakkumulator</b> aktualisiert und in Klang verwandelt:</p>
<span class="formula">phase += f / fs;  if (phase ≥ 1) phase −= 1;   saw = 2·phase − 1</span>
<span class="formula">1-Pol-Filter: y += a · (x − y),   a = 1 − e^(−2π·fc/fs)</span>
<span class="formula">Hüllkurve: pegel += (ziel − pegel) · koef   (exponentiell)</span>
<p>Diese drei Zeilen ergeben Oszillator, Tiefpass und Hüllkurve. Alles andere – Polyphonie, Anti-Aliasing, Modulation, Effekte – baut darauf auf. Einstiegsplattformen: <b>Web Audio API</b> (wie diese App), <b>Pure Data</b> und <b>Max/MSP</b> (visuell), <b>SuperCollider</b>, <b>Csound</b>, <b>Faust</b> (kompiliert zu Plugins), <b>JUCE</b> (C++ für VST/AU), <b>VCV Rack</b> (virtuelles Eurorack mit offenem SDK), <b>Daisy/Teensy</b> (Hardware).</p>`,
          ja: `<p>デジタルシンセの中核は、サンプルごとに<b>位相アキュムレーター</b>を更新し音に変えるループです：</p>
<span class="formula">phase += f / fs;  if (phase ≥ 1) phase −= 1;   saw = 2·phase − 1</span>
<span class="formula">1ポール・フィルター: y += a · (x − y),   a = 1 − e^(−2π·fc/fs)</span>
<span class="formula">エンベロープ: level += (target − level) · coef   （指数カーブ）</span>
<p>この3行でオシレーター、ローパス、エンベロープが手に入ります。ポリフォニー、アンチエイリアス、変調、エフェクトはすべてこのループの上に重ねたものです。始めるためのプラットフォーム：<b>Web Audio API</b>（このアプリと同じ）、<b>Pure Data</b>と<b>Max/MSP</b>（ビジュアル）、<b>SuperCollider</b>、<b>Csound</b>、<b>Faust</b>（プラグインにコンパイル）、<b>JUCE</b>（VST/AU用C++）、<b>VCV Rack</b>（オープンSDKの仮想ユーロラック）、<b>Daisy/Teensy</b>（ハードウェア）。</p>`
        }
      }
    ],
    ex: {
      es: ['Calculá el rango dinámico teórico de 8, 12, 16 y 24 bits.', 'En el lab Digital, bajá los bits uno a uno desde 16. ¿En qué valor empezás a notar el cambio con el preset LEAD?', 'Con downsample, ¿qué frecuencia de muestreo efectiva tenés con ÷10? ¿Cuál es su Nyquist?', 'Escribí en pseudocódigo un oscilador cuadrado usando el acumulador de fase.', 'Elegí una plataforma (Pure Data, VCV Rack o Web Audio) y planificá un mini-sinte de 1 oscilador + filtro + envolvente.'],
      en: ['Compute the theoretical dynamic range of 8, 12, 16 and 24 bits.', 'In the Digital lab lower bits one by one from 16. At what value do you start hearing the change on LEAD?', 'With downsample ÷10, what is the effective sample rate? Its Nyquist?', 'Write pseudocode for a square oscillator using the phase accumulator.', 'Choose a platform (Pure Data, VCV Rack or Web Audio) and plan a mini synth: 1 oscillator + filter + envelope.'],
      de: ['Berechne die theoretische Dynamik von 8, 12, 16 und 24 Bit.', 'Im Labor „Digital" die Bits von 16 an schrittweise senken. Ab wann hörst du es beim LEAD-Preset?', 'Effektive Abtastrate bei ÷10? Ihr Nyquist?', 'Schreibe Pseudocode für einen Rechteckoszillator mit Phasenakkumulator.', 'Wähle eine Plattform (Pure Data, VCV Rack, Web Audio) und plane einen Minisynth: 1 Oszillator + Filter + Hüllkurve.'],
      ja: ['8・12・16・24ビットの理論ダイナミックレンジを計算しよう。', 'デジタル・ラボで16からビットを1つずつ下げよう。LEADプリセットでどの値から変化に気づく？', 'ダウンサンプル÷10の実効サンプリングレートは？そのナイキストは？', '位相アキュムレーターを使った矩形波オシレーターを疑似コードで書こう。', 'プラットフォーム（Pure Data、VCV Rack、Web Audio）を選び、1オシレーター＋フィルター＋エンベロープのミニシンセを計画しよう。']
    },
    deep: {
      es: `<h3>Del dominio analógico al digital: la transformada z en una página</h3>
<p>Un filtro digital es una ecuación en diferencias. Su función de transferencia <code>H(z) = (b0 + b1·z⁻¹ + b2·z⁻²) / (1 + a1·z⁻¹ + a2·z⁻²)</code> tiene <b>polos</b> (raíces del denominador) y <b>ceros</b> (del numerador). Si todos los polos están dentro del círculo unitario, el filtro es estable; cuanto más cerca del borde, más resonante. Para pasar un filtro analógico (en s) a digital se usa la <b>transformada bilineal</b> <code>s = (2/T)·(1 − z⁻¹)/(1 + z⁻¹)</code>, con "prewarping" de la frecuencia de corte, porque comprime todo el eje de frecuencias analógico en 0…Nyquist.</p>
<h3>Interpolación y lectura de tablas</h3>
<p>Para leer una tabla a una frecuencia arbitraria, el índice de lectura casi nunca es entero. Opciones: sin interpolación (ruidoso), lineal (bueno con tablas grandes), cúbica/Hermite (mejor), sinc con ventana (la mejor, cara). La misma cuestión aparece en samplers (transposición), delays modulados (chorus) y Karplus-Strong.</p>
<h3>Paralelismo y tiempo real</h3>
<p>El audio se procesa en <b>bloques</b> (64–1024 muestras). El bloque debe calcularse antes de que termine de sonar el anterior: con 128 muestras a 48 kHz hay 2,7 ms. Por eso el código de audio evita reservar memoria, bloquear hilos o acceder al disco dentro del bucle. Los moduladores lentos se calculan a "tasa de control" (una vez por bloque) y los rápidos a "tasa de audio".</p>
<h3>Hacia dónde ir</h3>
<p>Proyecto sugerido para consolidar todo el curso: construir en VCV Rack o Pure Data un sinte con 2 osciladores (uno con sync), filtro con envolvente, LFO a PWM, secuenciador euclidiano y delay; documentarlo con los conceptos de cada módulo.</p>`,
      en: `<h3>From analogue to digital: the z-transform on one page</h3>
<p>A digital filter is a difference equation. Its transfer function <code>H(z) = (b0 + b1·z⁻¹ + b2·z⁻²) / (1 + a1·z⁻¹ + a2·z⁻²)</code> has <b>poles</b> (roots of the denominator) and <b>zeros</b> (of the numerator). If all poles lie inside the unit circle the filter is stable; the closer to the edge, the more resonant. To turn an analogue filter (in s) into a digital one we use the <b>bilinear transform</b> <code>s = (2/T)·(1 − z⁻¹)/(1 + z⁻¹)</code>, with cutoff "prewarping", because it compresses the whole analogue frequency axis into 0…Nyquist.</p>
<h3>Interpolation and table reading</h3>
<p>Reading a table at an arbitrary frequency, the read index is almost never an integer. Options: none (noisy), linear (good with big tables), cubic/Hermite (better), windowed sinc (best, expensive). The same issue appears in samplers (transposition), modulated delays (chorus) and Karplus-Strong.</p>
<h3>Parallelism and real time</h3>
<p>Audio is processed in <b>blocks</b> (64–1024 samples). Each block must be computed before the previous one finishes playing: 128 samples at 48 kHz gives 2.7 ms. So audio code avoids allocating memory, locking threads or disk access inside the loop. Slow modulators run at "control rate" (once per block), fast ones at "audio rate".</p>
<h3>Where to go next</h3>
<p>Suggested capstone project: build in VCV Rack or Pure Data a synth with 2 oscillators (one synced), filter with envelope, LFO to PWM, Euclidean sequencer and delay; document it with each module's concepts.</p>`,
      de: `<h3>Von analog zu digital: die z-Transformation auf einer Seite</h3>
<p>Ein Digitalfilter ist eine Differenzengleichung. Seine Übertragungsfunktion <code>H(z) = (b0 + b1·z⁻¹ + b2·z⁻²) / (1 + a1·z⁻¹ + a2·z⁻²)</code> hat <b>Pole</b> (Nullstellen des Nenners) und <b>Nullstellen</b> (des Zählers). Liegen alle Pole im Einheitskreis, ist es stabil; je näher am Rand, desto resonanter. Analoge Filter (in s) überführt man mit der <b>bilinearen Transformation</b> <code>s = (2/T)·(1 − z⁻¹)/(1 + z⁻¹)</code> samt „Prewarping", weil sie die ganze analoge Frequenzachse auf 0…Nyquist staucht.</p>
<h3>Interpolation und Tabellenauslesen</h3>
<p>Der Leseindex ist fast nie ganzzahlig. Optionen: keine (rauschig), linear (gut bei großen Tabellen), kubisch/Hermite (besser), gefensterter Sinc (beste, teuer). Dasselbe Problem bei Samplern, modulierten Delays und Karplus-Strong.</p>
<h3>Parallelität und Echtzeit</h3>
<p>Audio wird in <b>Blöcken</b> (64–1024 Samples) verarbeitet. Jeder Block muss fertig sein, bevor der vorige ausgespielt ist: 128 Samples bei 48 kHz = 2,7 ms. Daher vermeidet Audiocode Speicherreservierung, Sperren und Plattenzugriffe in der Schleife. Langsame Modulatoren laufen mit „Control Rate", schnelle mit „Audio Rate".</p>
<h3>Wie es weitergeht</h3>
<p>Vorgeschlagenes Abschlussprojekt: In VCV Rack oder Pure Data einen Synth mit 2 Oszillatoren (einer gesynct), Filter mit Hüllkurve, LFO auf PWM, euklidischem Sequencer und Delay bauen und mit den Konzepten jedes Moduls dokumentieren.</p>`,
      ja: `<h3>アナログからデジタルへ：1ページでわかるz変換</h3>
<p>デジタル・フィルターは差分方程式です。伝達関数<code>H(z) = (b0 + b1·z⁻¹ + b2·z⁻²) / (1 + a1·z⁻¹ + a2·z⁻²)</code>には<b>極</b>（分母の根）と<b>零点</b>（分子の根）があります。すべての極が単位円の内側にあれば安定で、縁に近いほど共鳴的になります。アナログ・フィルター（s領域）をデジタルにするには<b>双一次変換</b><code>s = (2/T)·(1 − z⁻¹)/(1 + z⁻¹)</code>を使い、アナログの全周波数軸を0〜ナイキストに圧縮するため、カットオフの「プリワーピング」を行います。</p>
<h3>補間とテーブルの読み出し</h3>
<p>任意の周波数でテーブルを読むと、読み出し位置はほぼ整数になりません。選択肢：補間なし（ノイズが多い）、線形（大きなテーブルなら良好）、3次／エルミート（より良い）、窓付きsinc（最良だが重い）。同じ問題はサンプラー（移調）、変調ディレイ（コーラス）、カープラス・ストロングにも現れます。</p>
<h3>並列性とリアルタイム</h3>
<p>音声は<b>ブロック</b>（64〜1024サンプル）単位で処理されます。前のブロックの再生が終わる前に次を計算しなければならず、48 kHzで128サンプルなら2.7 msです。だから音声コードはループ内でメモリー確保、スレッドのロック、ディスクアクセスを避けます。遅い変調は「コントロール・レート」（ブロックに1回）、速い変調は「オーディオ・レート」で計算します。</p>
<h3>次に進むために</h3>
<p>総仕上げのプロジェクト案：VCV RackかPure Dataで、2オシレーター（1つはシンク）、エンベロープ付きフィルター、PWMへのLFO、ユークリッド・シーケンサー、ディレイを備えたシンセを作り、各モジュールの概念で説明を書こう。</p>`
    },
    read: ['Miller Puckette — <i>The Theory and Technique of Electronic Music</i> (libre en línea)', 'Julius O. Smith III — <i>Introduction to Digital Filters</i> (ccrma.stanford.edu)', 'Will Pirkle — <i>Designing Software Synthesizer Plug-ins in C++</i>', 'Steven W. Smith — <i>The Scientist and Engineer\'s Guide to DSP</i> (libre en línea)', 'Eli Fieldsteel — tutoriales de SuperCollider (YouTube)'],
    quiz: [
      { q: { es: 'Con fs = 44,1 kHz, ¿cuál es la frecuencia de Nyquist?', en: 'At fs = 44.1 kHz, what is the Nyquist frequency?', de: 'Wie hoch ist Nyquist bei fs = 44,1 kHz?', ja: 'fs＝44.1 kHzのナイキスト周波数は？' }, o: { es: ['20 kHz', '22,05 kHz', '44,1 kHz', '88,2 kHz'], en: ['20 kHz', '22.05 kHz', '44.1 kHz', '88.2 kHz'], de: ['20 kHz', '22,05 kHz', '44,1 kHz', '88,2 kHz'], ja: ['20 kHz', '22.05 kHz', '44.1 kHz', '88.2 kHz'] }, c: 1, x: { es: 'fs/2.', en: 'fs/2.', de: 'fs/2.', ja: 'fs/2。' } },
      { q: { es: '¿Rango dinámico aproximado de 16 bits?', en: 'Approximate dynamic range of 16 bits?', de: 'Ungefähre Dynamik bei 16 Bit?', ja: '16ビットのおおよそのダイナミックレンジは？' }, o: { es: ['48 dB', '72 dB', '96 dB', '144 dB'], en: ['48 dB', '72 dB', '96 dB', '144 dB'], de: ['48 dB', '72 dB', '96 dB', '144 dB'], ja: ['48 dB', '72 dB', '96 dB', '144 dB'] }, c: 2, x: { es: '≈ 6 dB por bit.', en: '≈ 6 dB per bit.', de: '≈ 6 dB pro Bit.', ja: '1ビットあたり約6 dB。' } },
      { q: { es: '¿Para qué sirve el dither?', en: 'What is dither for?', de: 'Wofür ist Dither?', ja: 'ディザーの目的は？' }, o: { es: ['Subir el volumen', 'Convertir la distorsión de cuantización en ruido neutro', 'Eliminar el aliasing', 'Sincronizar MIDI'], en: ['Raise volume', 'Turn quantisation distortion into neutral noise', 'Remove aliasing', 'Sync MIDI'], de: ['Lautstärke erhöhen', 'Quantisierungsverzerrung in neutrales Rauschen verwandeln', 'Aliasing entfernen', 'MIDI synchronisieren'], ja: ['音量を上げる', '量子化歪みをニュートラルなノイズに変える', 'エイリアシングを除去', 'MIDI同期'] }, c: 1, x: { es: 'Descorrelaciona el error de la señal.', en: 'It decorrelates the error from the signal.', de: 'Es entkoppelt den Fehler vom Signal.', ja: '誤差と信号の相関をなくします。' } },
      { q: { es: 'En un acumulador de fase, ¿cuánto avanza la fase por muestra?', en: 'In a phase accumulator, how much does phase advance per sample?', de: 'Um wie viel wächst die Phase pro Sample im Phasenakkumulator?', ja: '位相アキュムレーターで1サンプルごとの位相の進みは？' }, o: { es: ['f · fs', 'f / fs', 'fs / f', '1 / f'], en: ['f · fs', 'f / fs', 'fs / f', '1 / f'], de: ['f · fs', 'f / fs', 'fs / f', '1 / f'], ja: ['f · fs', 'f / fs', 'fs / f', '1 / f'] }, c: 1, x: { es: 'Así completa f ciclos por segundo.', en: 'That way it completes f cycles per second.', de: 'So entstehen f Zyklen pro Sekunde.', ja: 'これで毎秒f周期を完了します。' } },
      { q: { es: 'Un filtro digital es estable si sus polos están…', en: 'A digital filter is stable if its poles are…', de: 'Ein Digitalfilter ist stabil, wenn seine Pole…', ja: 'デジタル・フィルターが安定なのは極が…' }, o: { es: ['Fuera del círculo unitario', 'Dentro del círculo unitario', 'Sobre el eje real', 'En cero'], en: ['Outside the unit circle', 'Inside the unit circle', 'On the real axis', 'At zero'], de: ['Außerhalb des Einheitskreises', 'Innerhalb des Einheitskreises liegen', 'Auf der reellen Achse', 'Bei null'], ja: ['単位円の外側', '単位円の内側', '実軸上', 'ゼロ'] }, c: 1, x: { es: 'Cerca del borde = muy resonante; fuera = inestable.', en: 'Near the edge = very resonant; outside = unstable.', de: 'Nahe am Rand = sehr resonant; außerhalb = instabil.', ja: '縁に近いほど共鳴的、外側なら不安定。' } }
    ]
  });
})();
