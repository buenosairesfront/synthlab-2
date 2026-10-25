/* Contenido del curso — Nivel 1–2: filtros, envolventes, modulación, diseño sustractivo (módulos 5–8) */
window.COURSE = window.COURSE || [];
(function () {
  const M = m => window.COURSE.push(m);

  /* ===================== 5. FILTROS ===================== */
  M({
    id: 'filters', lv: 1, lab: ['filter', 'synth'],
    title: { es: 'Filtros: esculpir el espectro', en: 'Filters: sculpting the spectrum', de: 'Filter: das Spektrum formen', ja: 'フィルター：スペクトルを彫刻する' },
    sum: { es: 'Pasa bajos, altos, banda y notch; frecuencia de corte, pendiente, resonancia, autooscilación, seguimiento de teclado y los filtros clásicos.', en: 'Low-, high-, band-pass and notch; cutoff, slope, resonance, self-oscillation, key tracking and the classic filters.', de: 'Tief-, Hoch-, Bandpass und Notch; Grenzfrequenz, Steilheit, Resonanz, Selbstoszillation, Keytracking und klassische Filter.', ja: 'ローパス・ハイパス・バンドパス・ノッチ、カットオフ、スロープ、レゾナンス、自己発振、キートラック、名フィルター。' },
    key: {
      es: ['El filtro deja pasar unas frecuencias y atenúa otras: es el "pincel" del sintesista.', 'La <b>pendiente</b> se mide en dB/octava: 6 dB por cada polo (12 dB = 2 polos, 24 dB = 4 polos).', 'La <b>resonancia</b> (Q) realza la zona del corte; al máximo, el filtro <b>autooscila</b> y genera una senoidal.', 'El <b>seguimiento de teclado</b> hace que el corte acompañe la nota para un brillo uniforme.', 'Moog ladder, SEM, MS-20, TB-303, Oberheim: cada topología tiene su carácter.'],
      en: ['A filter passes some frequencies and attenuates others: it is the synthesist\'s "brush".', '<b>Slope</b> is measured in dB/octave: 6 dB per pole (12 dB = 2 poles, 24 dB = 4 poles).', '<b>Resonance</b> (Q) boosts the cutoff region; at maximum the filter <b>self-oscillates</b> and produces a sine.', '<b>Key tracking</b> makes the cutoff follow the note for consistent brightness.', 'Moog ladder, SEM, MS-20, TB-303, Oberheim: each topology has its character.'],
      de: ['Ein Filter lässt manche Frequenzen durch und dämpft andere: der „Pinsel" des Synthesisten.', 'Die <b>Steilheit</b> wird in dB/Oktave gemessen: 6 dB pro Pol (12 dB = 2 Pole, 24 dB = 4 Pole).', '<b>Resonanz</b> (Q) hebt den Bereich um die Grenzfrequenz an; maximal <b>schwingt</b> das Filter selbst und erzeugt einen Sinus.', '<b>Keytracking</b> lässt den Cutoff der Note folgen – gleichmäßige Helligkeit.', 'Moog-Kaskade, SEM, MS-20, TB-303, Oberheim: jede Topologie hat Charakter.'],
      ja: ['フィルターはある周波数を通し、他を減衰させる。シンセ奏者の「筆」だ。', '<b>スロープ</b>はdB/オクターブで測り、1ポールあたり6 dB（12 dB＝2ポール、24 dB＝4ポール）。', '<b>レゾナンス</b>（Q）はカットオフ付近を強調し、最大にするとフィルターが<b>自己発振</b>してサイン波を出す。', '<b>キートラック</b>はカットオフを音程に追従させ、明るさを揃える。', 'Moogラダー、SEM、MS-20、TB-303、オーバーハイム：構造ごとに個性がある。']
    },
    sec: [
      {
        h: { es: 'Tipos de filtro', en: 'Filter types', de: 'Filtertypen', ja: 'フィルターの種類' },
        b: {
          es: `<ul><li><b>Pasa bajos (LP)</b>: deja pasar los graves y atenúa por encima del corte. El más usado: "oscurece", suaviza, simula la pérdida de brillo de los instrumentos acústicos al apagarse.</li><li><b>Pasa altos (HP)</b>: atenúa por debajo del corte. Adelgaza, limpia graves en pads, crea sonidos "de radio".</li><li><b>Pasa banda (BP)</b>: deja pasar solo una franja. Telefónico, nasal, vocales, percusión metálica.</li><li><b>Rechazo de banda (notch)</b>: elimina una franja estrecha. Barrido lentamente da un efecto tipo phaser.</li><li><b>Campana (peaking) y shelving</b>: más propios de ecualizadores; realzan o atenúan sin quitar el resto.</li><li><b>Peine (comb)</b> y <b>formantes</b>: múltiples picos; los veremos en efectos y síntesis vocal.</li></ul>
<p>La <b>frecuencia de corte</b> se define donde la señal cae 3 dB. Por encima (en un LP), la atenuación crece según la pendiente.</p>`,
          en: `<ul><li><b>Low-pass (LP)</b>: passes lows and attenuates above the cutoff. The most used: it "darkens", softens, and mimics acoustic instruments losing brightness as they decay.</li><li><b>High-pass (HP)</b>: attenuates below the cutoff. Thins, cleans low end in pads, creates "radio" sounds.</li><li><b>Band-pass (BP)</b>: passes only a band. Telephone, nasal, vowels, metallic percussion.</li><li><b>Notch (band-reject)</b>: removes a narrow band. Swept slowly it gives a phaser-like effect.</li><li><b>Peaking and shelving</b>: more typical of EQs; boost or cut without removing the rest.</li><li><b>Comb</b> and <b>formant</b> filters: multiple peaks; covered in effects and vocal synthesis.</li></ul>
<p>The <b>cutoff frequency</b> is defined where the signal drops 3 dB. Beyond it (in an LP), attenuation increases according to the slope.</p>`,
          de: `<ul><li><b>Tiefpass (LP)</b>: lässt Tiefen durch, dämpft oberhalb des Cutoffs. Am häufigsten: macht dunkler, weicher, imitiert den Helligkeitsverlust akustischer Instrumente beim Ausklingen.</li><li><b>Hochpass (HP)</b>: dämpft unterhalb. Macht dünner, räumt Bässe in Pads auf, „Radio"-Klänge.</li><li><b>Bandpass (BP)</b>: nur ein Band passiert. Telefon, nasal, Vokale, metallische Percussion.</li><li><b>Notch (Bandsperre)</b>: entfernt ein schmales Band. Langsam bewegt: phaserartig.</li><li><b>Glocke und Shelving</b>: eher EQ-typisch; anheben oder absenken ohne Rest zu entfernen.</li><li><b>Kamm-</b> und <b>Formantfilter</b>: mehrere Spitzen; später bei Effekten und Stimmsynthese.</li></ul>
<p>Die <b>Grenzfrequenz</b> liegt dort, wo das Signal um 3 dB abfällt. Darüber (beim LP) nimmt die Dämpfung gemäß Steilheit zu.</p>`,
          ja: `<ul><li><b>ローパス（LP）</b>：低域を通しカットオフより上を減衰。最もよく使われ、音を「暗く」柔らかくし、減衰とともに明るさを失うアコースティック楽器を模倣する。</li><li><b>ハイパス（HP）</b>：カットオフより下を減衰。音を細くし、パッドの低域を整理し、「ラジオ」風の音を作る。</li><li><b>バンドパス（BP）</b>：帯域だけを通す。電話声、鼻声、母音、金属的なパーカッション。</li><li><b>ノッチ（バンドリジェクト）</b>：狭い帯域を除去。ゆっくり動かすとフェイザー的になる。</li><li><b>ピーキングとシェルビング</b>：EQ的で、他を削らずに持ち上げたり下げたりする。</li><li><b>コム</b>と<b>フォルマント</b>フィルター：複数のピーク。エフェクトや音声合成で扱う。</li></ul>
<p><b>カットオフ周波数</b>は信号が3 dB下がる点で定義します。その先（LPなら上側）はスロープに従って減衰が増えます。</p>`
        }
      },
      {
        h: { es: 'Pendiente y polos', en: 'Slope and poles', de: 'Steilheit und Pole', ja: 'スロープとポール' },
        b: {
          es: `<p>Cada <b>polo</b> (una etapa RC en analógico) aporta 6 dB/oct de atenuación. Así:</p>
<table><tr><th>Polos</th><th>Pendiente</th><th>Ejemplos</th><th>Carácter</th></tr>
<tr><td>1</td><td>6 dB/oct</td><td>tono de guitarra, EQ suave</td><td>muy suave, casi un "tilt"</td></tr>
<tr><td>2</td><td>12 dB/oct</td><td>Oberheim SEM, MS-20, Juno (modo), state variable</td><td>abierto, "vocal", deja pasar más armónicos</td></tr>
<tr><td>3</td><td>18 dB/oct</td><td>TB-303 (aprox.), ARP</td><td>intermedio</td></tr>
<tr><td>4</td><td>24 dB/oct</td><td>Moog ladder, Prophet-5, Jupiter</td><td>gordo, oscuro, bajos contundentes</td></tr></table>
<p>Una pendiente de 24 dB hace que una octava arriba del corte la señal ya esté 24 dB abajo (≈1/16). Por eso con 24 dB es más fácil lograr bajos "redondos"; con 12 dB los sonidos conservan más "aire" y suenan más brillantes con el mismo corte.</p>`,
          en: `<p>Each <b>pole</b> (one RC stage in analogue) contributes 6 dB/oct of attenuation. So:</p>
<table><tr><th>Poles</th><th>Slope</th><th>Examples</th><th>Character</th></tr>
<tr><td>1</td><td>6 dB/oct</td><td>guitar tone knob, gentle EQ</td><td>very soft, almost a "tilt"</td></tr>
<tr><td>2</td><td>12 dB/oct</td><td>Oberheim SEM, MS-20, state variable</td><td>open, "vocal", lets more harmonics through</td></tr>
<tr><td>3</td><td>18 dB/oct</td><td>TB-303 (approx.), ARP</td><td>in between</td></tr>
<tr><td>4</td><td>24 dB/oct</td><td>Moog ladder, Prophet-5, Jupiter</td><td>fat, dark, punchy basses</td></tr></table>
<p>With a 24 dB slope, one octave above the cutoff the signal is already 24 dB down (≈1/16). That makes "round" basses easy; with 12 dB sounds keep more "air" and are brighter at the same cutoff.</p>`,
          de: `<p>Jeder <b>Pol</b> (eine RC-Stufe analog) bringt 6 dB/Okt Dämpfung:</p>
<table><tr><th>Pole</th><th>Steilheit</th><th>Beispiele</th><th>Charakter</th></tr>
<tr><td>1</td><td>6 dB/Okt</td><td>Gitarren-Tonregler, sanfter EQ</td><td>sehr weich, fast ein „Tilt"</td></tr>
<tr><td>2</td><td>12 dB/Okt</td><td>Oberheim SEM, MS-20, State Variable</td><td>offen, „vokal", mehr Obertöne</td></tr>
<tr><td>3</td><td>18 dB/Okt</td><td>TB-303 (ca.), ARP</td><td>dazwischen</td></tr>
<tr><td>4</td><td>24 dB/Okt</td><td>Moog-Kaskade, Prophet-5, Jupiter</td><td>fett, dunkel, druckvolle Bässe</td></tr></table>
<p>Bei 24 dB ist das Signal eine Oktave über dem Cutoff schon 24 dB leiser (≈1/16). „Runde" Bässe gelingen leicht; mit 12 dB behalten Klänge mehr „Luft" und sind beim selben Cutoff heller.</p>`,
          ja: `<p>各<b>ポール</b>（アナログではRC1段）は6 dB/octの減衰をもたらします：</p>
<table><tr><th>ポール</th><th>スロープ</th><th>例</th><th>キャラクター</th></tr>
<tr><td>1</td><td>6 dB/oct</td><td>ギターのトーン、緩やかなEQ</td><td>とても穏やか、ほぼ「チルト」</td></tr>
<tr><td>2</td><td>12 dB/oct</td><td>Oberheim SEM、MS-20、ステートバリアブル</td><td>開放的、「ボーカル的」、倍音が多く残る</td></tr>
<tr><td>3</td><td>18 dB/oct</td><td>TB-303（近似）、ARP</td><td>中間</td></tr>
<tr><td>4</td><td>24 dB/oct</td><td>Moogラダー、Prophet-5、Jupiter</td><td>太く暗く、パンチのあるベース</td></tr></table>
<p>24 dBではカットオフの1オクターブ上ですでに24 dB（約1/16）下がります。「丸い」ベースが作りやすく、12 dBでは同じカットオフでも「空気感」が残り明るく聞こえます。</p>`
        }
      },
      {
        h: { es: 'Resonancia y autooscilación', en: 'Resonance and self-oscillation', de: 'Resonanz und Selbstoszillation', ja: 'レゾナンスと自己発振' },
        b: {
          es: `<p>La <b>resonancia</b> realimenta parte de la salida del filtro a su entrada, creando un pico alrededor del corte. Valores bajos dan presencia; valores altos producen el "chillido" característico al barrer el corte (acid, wah). Con suficiente realimentación el filtro <b>autooscila</b>: genera una senoidal en la frecuencia de corte aun sin entrada. Con seguimiento de teclado al 100% se puede tocar como un oscilador más.</p>
<p>En muchos filtros (especialmente el Moog ladder) subir la resonancia <b>reduce los graves</b> de la banda de paso: por eso un bajo con mucha resonancia suena más fino. Algunos diseños compensan ese efecto ("bass compensation").</p>
<div class="tip">Lab de filtros: fuente "ruido", tipo pasa bajos, Q en 30 y barré el corte: vas a escuchar un tono silbado emergiendo del ruido. Eso es casi autooscilación.</div>`,
          en: `<p><b>Resonance</b> feeds part of the filter output back to its input, creating a peak around the cutoff. Low values add presence; high values produce the characteristic "squeal" when sweeping (acid, wah). With enough feedback the filter <b>self-oscillates</b>: it generates a sine at the cutoff even without input. With 100% key tracking it can be played as an extra oscillator.</p>
<p>In many filters (especially the Moog ladder) raising resonance <b>reduces the bass</b> in the passband, which is why a highly resonant bass sounds thinner. Some designs compensate ("bass compensation").</p>
<div class="tip">Filter lab: source "noise", low-pass, Q at 30 and sweep the cutoff: you'll hear a whistling tone emerging from the noise. That is near self-oscillation.</div>`,
          de: `<p><b>Resonanz</b> führt einen Teil des Filterausgangs zum Eingang zurück und erzeugt eine Spitze um den Cutoff. Wenig Resonanz gibt Präsenz; viel ergibt das typische „Quietschen" beim Sweepen (Acid, Wah). Mit genug Rückkopplung <b>schwingt</b> das Filter selbst: ein Sinus auf der Grenzfrequenz, auch ohne Eingang. Mit 100 % Keytracking spielbar wie ein Oszillator.</p>
<p>Bei vielen Filtern (besonders Moog-Kaskade) <b>sinken die Bässe</b> im Durchlassbereich mit steigender Resonanz – resonante Bässe klingen dünner. Manche Designs kompensieren das.</p>
<div class="tip">Filter-Labor: Quelle „Rauschen", Tiefpass, Q 30, Cutoff sweepen: Ein pfeifender Ton taucht aus dem Rauschen auf – fast Selbstoszillation.</div>`,
          ja: `<p><b>レゾナンス</b>はフィルター出力の一部を入力に戻し、カットオフ付近にピークを作ります。少なめなら存在感が増し、多いとカットオフを動かしたときの特徴的な「叫び」（アシッド、ワウ）になります。十分なフィードバックでフィルターは<b>自己発振</b>し、入力がなくてもカットオフ周波数でサイン波を出します。キートラック100%ならもう1つのオシレーターとして演奏できます。</p>
<p>多くのフィルター（特にMoogラダー）ではレゾナンスを上げると通過帯域の<b>低音が減る</b>ため、レゾナンスの強いベースは細く聞こえます。それを補正する設計（ベース補正）もあります。</p>
<div class="tip">フィルター・ラボ：ソース「ノイズ」、ローパス、Q 30でカットオフを動かすと、ノイズから口笛のような音が浮かび上がる。それが自己発振寸前の状態です。</div>`
        }
      },
      {
        h: { es: 'Modular el filtro: envolvente, teclado y LFO', en: 'Modulating the filter: envelope, keyboard and LFO', de: 'Filter modulieren: Hüllkurve, Tastatur und LFO', ja: 'フィルターを変調する：エンベロープ・鍵盤・LFO' },
        b: {
          es: `<p>Un filtro estático es útil, pero la magia está en moverlo:</p>
<ul><li><b>Envolvente de filtro</b>: abre el corte al atacar y lo cierra al decaer → el sonido empieza brillante y se oscurece, como una cuerda pulsada. Es la base del 80% de los bajos y plucks.</li><li><b>Velocidad → corte</b>: tocar más fuerte = más brillante, como en instrumentos acústicos.</li><li><b>Seguimiento de teclado</b>: con 0%, las notas agudas suenan opacas (el corte queda fijo mientras los armónicos suben); con 100%, el timbre es igual en todo el teclado.</li><li><b>LFO → corte</b>: wah automático, "wobble" de dubstep si se sincroniza al tempo.</li></ul>
<span class="formula">corte_efectivo = corte · 2^(env·cantidad + LFO·prof + (nota−60)/12·keytrack)</span>
<p>Fijate que los moduladores se suman en <b>octavas</b> (escala exponencial): así funciona el control 1 V/oct del filtro en analógico.</p>`,
          en: `<p>A static filter is useful, but the magic is in moving it:</p>
<ul><li><b>Filter envelope</b>: opens the cutoff on attack and closes it on decay → the sound starts bright and darkens, like a plucked string. Basis of 80% of basses and plucks.</li><li><b>Velocity → cutoff</b>: playing harder = brighter, like acoustic instruments.</li><li><b>Key tracking</b>: at 0% high notes sound dull (fixed cutoff while harmonics rise); at 100% the timbre is even across the keyboard.</li><li><b>LFO → cutoff</b>: auto-wah, dubstep "wobble" if synced to tempo.</li></ul>
<span class="formula">effective_cutoff = cutoff · 2^(env·amount + LFO·depth + (note−60)/12·keytrack)</span>
<p>Note that modulators add in <b>octaves</b> (exponential scale): that's how an analogue filter's 1 V/oct control works.</p>`,
          de: `<p>Ein statisches Filter ist nützlich, die Magie liegt aber in der Bewegung:</p>
<ul><li><b>Filterhüllkurve</b>: öffnet beim Anschlag und schließt im Decay → der Klang startet hell und wird dunkel, wie eine gezupfte Saite. Basis von 80 % aller Bässe und Plucks.</li><li><b>Velocity → Cutoff</b>: härter spielen = heller, wie akustisch.</li><li><b>Keytracking</b>: bei 0 % klingen hohe Noten dumpf; bei 100 % gleichmäßige Klangfarbe über die Tastatur.</li><li><b>LFO → Cutoff</b>: Auto-Wah, Dubstep-„Wobble" bei Temposync.</li></ul>
<span class="formula">Cutoff_eff = Cutoff · 2^(Hk·Menge + LFO·Tiefe + (Note−60)/12·Keytrack)</span>
<p>Modulatoren addieren sich in <b>Oktaven</b> (exponentiell) – so funktioniert die 1-V/Okt-Steuerung analoger Filter.</p>`,
          ja: `<p>静的なフィルターも役立ちますが、魔法は動かすことにあります：</p>
<ul><li><b>フィルター・エンベロープ</b>：アタックでカットオフを開き、ディケイで閉じる→音は明るく始まり暗くなる。撥弦のように。ベースとプラックの8割の基本。</li><li><b>ベロシティ→カットオフ</b>：強く弾くほど明るい。アコースティック楽器と同じ。</li><li><b>キートラック</b>：0%だと高音がこもる（カットオフ固定で倍音は上がる）。100%なら鍵盤全体で音色が均一。</li><li><b>LFO→カットオフ</b>：オートワウ、テンポ同期すればダブステップの「ウォブル」。</li></ul>
<span class="formula">実効カットオフ = カットオフ · 2^(エンベ·量 + LFO·深さ + (ノート−60)/12·キートラック)</span>
<p>変調は<b>オクターブ</b>単位（指数スケール）で加算されることに注目。これがアナログ・フィルターの1 V/oct制御の仕組みです。</p>`
        }
      }
    ],
    ex: {
      es: ['Lab de filtros: con sierra, compará 12 y 24 dB/oct al mismo corte (600 Hz). Mirá la curva de respuesta y escuchá la diferencia.', 'Activá "Barrido por LFO" a 0,3 Hz con Q 10 en pasa bajos, luego en pasa banda y en notch. Describí cada uno.', 'Encontrá la autooscilación con ruido y Q alto. ¿Podés "tocar" melodías moviendo solo el corte?', 'En el sinte completo, bajo: corte 150 Hz, env→filtro +3,5 oct, decay de filtro 250 ms, sustain 0. Variá el decay del filtro de 80 ms a 800 ms.', 'Probá seguimiento de teclado 0% y 100% tocando C2 y C5. ¿Qué cambia?'],
      en: ['Filter lab: with a saw, compare 12 and 24 dB/oct at the same cutoff (600 Hz). Look at the response curve and listen.', 'Enable "LFO sweep" at 0.3 Hz with Q 10 in low-pass, then band-pass and notch. Describe each.', 'Find self-oscillation with noise and high Q. Can you "play" melodies just by moving the cutoff?', 'In the full synth, bass: cutoff 150 Hz, env→filter +3.5 oct, filter decay 250 ms, sustain 0. Vary filter decay from 80 to 800 ms.', 'Try key tracking 0% and 100% playing C2 and C5. What changes?'],
      de: ['Filter-Labor: Säge, 12 vs. 24 dB/Okt bei gleichem Cutoff (600 Hz). Kurve ansehen und hören.', '„LFO-Sweep" mit 0,3 Hz, Q 10 im Tiefpass, dann Bandpass und Notch. Beschreibe jeden.', 'Selbstoszillation mit Rauschen und hohem Q finden. Kannst du nur mit dem Cutoff Melodien „spielen"?', 'Synth-Bass: Cutoff 150 Hz, Hk→Filter +3,5 Okt, Filter-Decay 250 ms, Sustain 0. Decay von 80 bis 800 ms variieren.', 'Keytracking 0 % und 100 % mit C2 und C5 testen. Was ändert sich?'],
      ja: ['フィルター・ラボ：ノコギリ波で、同じカットオフ（600 Hz）の12と24 dB/octを比較。特性カーブを見て聴こう。', '「LFOスイープ」を0.3 Hz、Q 10でローパス、次にバンドパスとノッチで。それぞれ説明しよう。', 'ノイズと高いQで自己発振を見つけよう。カットオフだけでメロディを「弾ける」？', 'フルシンセでベース：カットオフ150 Hz、エンベ→フィルター+3.5 oct、フィルター・ディケイ250 ms、サステイン0。ディケイを80〜800 msで変えてみよう。', 'キートラック0%と100%でC2とC5を弾き比べよう。何が変わる？']
    },
    deep: {
      es: `<h3>Filtros clásicos y su firma sonora</h3>
<ul><li><b>Moog ladder (1965)</b>: cuatro etapas de transistores en "escalera", 24 dB/oct, la resonancia hace perder graves, saturación suave y redonda. La referencia del bajo "gordo".</li><li><b>Oberheim SEM</b>: state-variable de 12 dB con salidas LP/BP/HP simultáneas y un control continuo LP↔notch↔HP. Suena abierto y musical.</li><li><b>Korg MS-20</b>: Sallen-Key de 12 dB con resonancia agresiva y sucia; HP y LP en serie. Chillón, "industrial".</li><li><b>Roland TB-303</b>: escalera de diodos de 4 polos con comportamiento ~18 dB/oct, interacción especial entre "accent" y resonancia: el sonido acid.</li><li><b>Roland IR3109 (Juno/Jupiter)</b>: OTA de 24 dB, limpio y suave.</li><li><b>Steiner-Parker / Synthacon</b>: 12 dB, muy agresivo con resonancia.</li></ul>
<h3>Filtros digitales: el biquad</h3>
<p>El bloque básico digital es el <b>biquad</b> (2 polos, 2 ceros):</p>
<span class="formula">y[n] = b0·x[n] + b1·x[n−1] + b2·x[n−2] − a1·y[n−1] − a2·y[n−2]</span>
<p>Las fórmulas del "Audio EQ Cookbook" de Robert Bristow-Johnson dan los coeficientes para LP, HP, BP, notch, peaking y shelving a partir de f0, Q y ganancia. Problema: al modular rápido el corte, el biquad clásico puede generar clics o inestabilidad. Los filtros de <b>realimentación de retardo cero (ZDF / TPT)</b> de Vadim Zavalishin resuelven el lazo de forma implícita y se comportan como el circuito analógico incluso con modulación a audio y saturación dentro del lazo.</p>
<h3>Q, ancho de banda y resonancia</h3>
<p>Q = f0 / ancho de banda (a −3 dB). Q = 0,707 es la respuesta Butterworth (máximamente plana, sin pico). Q = 1 en un BP es un ancho de ~1,4 octavas; Q = 10 ~0,14 octavas. En una escalera de 4 polos, la autooscilación ocurre cuando la ganancia del lazo llega a 4.</p>`,
      en: `<h3>Classic filters and their sonic signature</h3>
<ul><li><b>Moog ladder (1965)</b>: four transistor stages in a "ladder", 24 dB/oct, resonance thins the bass, soft round saturation. The reference "fat" bass.</li><li><b>Oberheim SEM</b>: 12 dB state-variable with simultaneous LP/BP/HP and a continuous LP↔notch↔HP control. Open and musical.</li><li><b>Korg MS-20</b>: 12 dB Sallen-Key with aggressive dirty resonance; HP and LP in series. Screaming, "industrial".</li><li><b>Roland TB-303</b>: 4-pole diode ladder behaving like ~18 dB/oct, special interaction between accent and resonance: the acid sound.</li><li><b>Roland IR3109 (Juno/Jupiter)</b>: 24 dB OTA, clean and smooth.</li><li><b>Steiner-Parker / Synthacon</b>: 12 dB, very aggressive with resonance.</li></ul>
<h3>Digital filters: the biquad</h3>
<p>The basic digital block is the <b>biquad</b> (2 poles, 2 zeros):</p>
<span class="formula">y[n] = b0·x[n] + b1·x[n−1] + b2·x[n−2] − a1·y[n−1] − a2·y[n−2]</span>
<p>Robert Bristow-Johnson's "Audio EQ Cookbook" gives coefficients for LP, HP, BP, notch, peaking and shelving from f0, Q and gain. Problem: under fast cutoff modulation a classic biquad can click or go unstable. Vadim Zavalishin's <b>zero-delay feedback (ZDF / TPT)</b> filters solve the loop implicitly and behave like the analogue circuit even with audio-rate modulation and in-loop saturation.</p>
<h3>Q, bandwidth and resonance</h3>
<p>Q = f0 / bandwidth (at −3 dB). Q = 0.707 is the Butterworth response (maximally flat, no peak). Q = 1 in a BP is ~1.4 octaves wide; Q = 10 ~0.14 octaves. In a 4-pole ladder, self-oscillation occurs when loop gain reaches 4.</p>`,
      de: `<h3>Klassische Filter und ihre Signatur</h3>
<ul><li><b>Moog-Kaskade (1965)</b>: vier Transistorstufen als „Leiter", 24 dB/Okt, Resonanz kostet Bass, weiche runde Sättigung. Die Referenz für „fette" Bässe.</li><li><b>Oberheim SEM</b>: 12-dB-State-Variable mit gleichzeitigen LP/BP/HP und stufenlosem LP↔Notch↔HP. Offen und musikalisch.</li><li><b>Korg MS-20</b>: 12-dB-Sallen-Key mit aggressiver, schmutziger Resonanz; HP und LP in Reihe. Kreischend, „industriell".</li><li><b>Roland TB-303</b>: 4-poliges Diodenleiterfilter, wirkt wie ~18 dB/Okt, besondere Wechselwirkung zwischen Accent und Resonanz: der Acid-Sound.</li><li><b>Roland IR3109 (Juno/Jupiter)</b>: 24-dB-OTA, sauber und weich.</li><li><b>Steiner-Parker / Synthacon</b>: 12 dB, sehr aggressiv mit Resonanz.</li></ul>
<h3>Digitale Filter: das Biquad</h3>
<p>Der digitale Grundbaustein ist das <b>Biquad</b> (2 Pole, 2 Nullstellen):</p>
<span class="formula">y[n] = b0·x[n] + b1·x[n−1] + b2·x[n−2] − a1·y[n−1] − a2·y[n−2]</span>
<p>Das „Audio EQ Cookbook" von Robert Bristow-Johnson liefert Koeffizienten für LP, HP, BP, Notch, Glocke und Shelving aus f0, Q und Gain. Problem: Bei schneller Modulation kann ein klassisches Biquad knacken oder instabil werden. <b>Zero-Delay-Feedback-Filter (ZDF/TPT)</b> nach Vadim Zavalishin lösen die Schleife implizit und verhalten sich wie die Analogschaltung, selbst bei Audio-Modulation und Sättigung in der Schleife.</p>
<h3>Q, Bandbreite und Resonanz</h3>
<p>Q = f0 / Bandbreite (bei −3 dB). Q = 0,707 ist Butterworth (maximal flach). Q = 1 beim BP ≈ 1,4 Oktaven, Q = 10 ≈ 0,14 Oktaven. Beim 4-Pol-Leiterfilter setzt Selbstoszillation bei Schleifenverstärkung 4 ein.</p>`,
      ja: `<h3>名フィルターとその音の個性</h3>
<ul><li><b>Moogラダー（1965）</b>：トランジスタ4段の「はしご」、24 dB/oct、レゾナンスで低音が痩せ、丸く柔らかく歪む。「太い」ベースの基準。</li><li><b>Oberheim SEM</b>：LP/BP/HPを同時出力する12 dBステートバリアブル、LP↔ノッチ↔HPを連続可変。開放的で音楽的。</li><li><b>Korg MS-20</b>：攻撃的で汚れたレゾナンスの12 dBサレン・キー、HPとLPを直列。叫ぶような「インダストリアル」。</li><li><b>Roland TB-303</b>：約18 dB/octとして振る舞う4ポール・ダイオードラダー、アクセントとレゾナンスの特殊な相互作用＝アシッドの音。</li><li><b>Roland IR3109（Juno/Jupiter）</b>：24 dBのOTA、クリーンで滑らか。</li><li><b>Steiner-Parker／Synthacon</b>：12 dB、レゾナンスでとても攻撃的。</li></ul>
<h3>デジタル・フィルター：バイクアッド</h3>
<p>デジタルの基本ブロックは<b>バイクアッド</b>（2ポール2ゼロ）：</p>
<span class="formula">y[n] = b0·x[n] + b1·x[n−1] + b2·x[n−2] − a1·y[n−1] − a2·y[n−2]</span>
<p>ロバート・ブリストウ＝ジョンソンの「Audio EQ Cookbook」はf0・Q・ゲインからLP・HP・BP・ノッチ・ピーキング・シェルビングの係数を与えます。問題：カットオフを高速変調すると、古典的バイクアッドはクリックや不安定を起こすことがある。ヴァディム・ザヴァリシンの<b>ゼロ・ディレイ・フィードバック（ZDF／TPT）</b>フィルターはループを陰的に解き、オーディオレート変調やループ内飽和でもアナログ回路のように振る舞います。</p>
<h3>Q・帯域幅・レゾナンス</h3>
<p>Q＝f0／帯域幅（−3 dB）。Q＝0.707はバターワース特性（最大平坦、ピークなし）。BPでQ＝1は約1.4オクターブ、Q＝10は約0.14オクターブ。4ポール・ラダーではループゲインが4に達すると自己発振します。</p>`
    },
    read: ['Vadim Zavalishin — <i>The Art of VA Filter Design</i> (Native Instruments, libre en PDF)', 'Robert Bristow-Johnson — "Audio EQ Cookbook"', 'Welsh\'s Synthesizer Cookbook — sección de filtros', 'Tim Stinchcombe — análisis de filtros Moog y Korg (timstinchcombe.co.uk)'],
    quiz: [
      { q: { es: '¿Cuántos dB/oct tiene un filtro de 4 polos?', en: 'How many dB/oct does a 4-pole filter have?', de: 'Wie viele dB/Okt hat ein 4-Pol-Filter?', ja: '4ポールフィルターは何dB/oct？' }, o: { es: ['6', '12', '18', '24'], en: ['6', '12', '18', '24'], de: ['6', '12', '18', '24'], ja: ['6', '12', '18', '24'] }, c: 3, x: { es: '6 dB por polo × 4.', en: '6 dB per pole × 4.', de: '6 dB pro Pol × 4.', ja: '1ポール6 dB×4。' } },
      { q: { es: '¿Qué ocurre con resonancia máxima en muchos filtros?', en: 'What happens at maximum resonance in many filters?', de: 'Was passiert bei maximaler Resonanz in vielen Filtern?', ja: '多くのフィルターでレゾナンス最大にすると？' }, o: { es: ['Se apaga', 'Autooscila y genera una senoidal', 'Se vuelve pasa altos', 'Duplica la pendiente'], en: ['It shuts off', 'It self-oscillates producing a sine', 'It becomes high-pass', 'It doubles the slope'], de: ['Es schaltet ab', 'Es schwingt selbst und erzeugt einen Sinus', 'Es wird zum Hochpass', 'Die Steilheit verdoppelt sich'], ja: ['止まる', '自己発振してサイン波を出す', 'ハイパスになる', 'スロープが倍になる'] }, c: 1, x: { es: 'La realimentación compensa las pérdidas y el lazo oscila en el corte.', en: 'Feedback compensates losses and the loop oscillates at the cutoff.', de: 'Die Rückkopplung gleicht Verluste aus, die Schleife schwingt am Cutoff.', ja: 'フィードバックが損失を補い、ループがカットオフで発振します。' } },
      { q: { es: 'Con seguimiento de teclado 0%, las notas agudas suenan…', en: 'With 0% key tracking, high notes sound…', de: 'Mit 0 % Keytracking klingen hohe Noten…', ja: 'キートラック0%だと高音は…' }, o: { es: ['Más brillantes', 'Más opacas', 'Igual', 'Desafinadas'], en: ['Brighter', 'Duller', 'The same', 'Out of tune'], de: ['Heller', 'Dumpfer', 'Gleich', 'Verstimmt'], ja: ['明るくなる', 'こもる', '同じ', '音程が狂う'] }, c: 1, x: { es: 'El corte queda fijo mientras los armónicos suben, así que se filtran más.', en: 'The cutoff stays fixed while harmonics rise, so more get filtered.', de: 'Der Cutoff bleibt, die Obertöne steigen – mehr wird gefiltert.', ja: 'カットオフが固定のまま倍音が上がるため、より多く削られます。' } },
      { q: { es: '¿Qué filtro es el "pasa banda + pasa bajos + pasa altos simultáneo" de 12 dB?', en: 'Which is the 12 dB filter with simultaneous LP + BP + HP?', de: 'Welches 12-dB-Filter bietet LP + BP + HP gleichzeitig?', ja: 'LP＋BP＋HPを同時に持つ12 dBフィルターは？' }, o: { es: ['Moog ladder', 'State variable (SEM)', 'Comb', 'Diode ladder'], en: ['Moog ladder', 'State variable (SEM)', 'Comb', 'Diode ladder'], de: ['Moog-Kaskade', 'State Variable (SEM)', 'Kamm', 'Diodenleiter'], ja: ['Moogラダー', 'ステートバリアブル（SEM）', 'コム', 'ダイオードラダー'] }, c: 1, x: { es: 'El SVF entrega las tres salidas a la vez.', en: 'The SVF provides all three outputs at once.', de: 'Das SVF liefert alle drei Ausgänge gleichzeitig.', ja: 'SVFは3つの出力を同時に出します。' } },
      { q: { es: 'Q = 0,707 corresponde a…', en: 'Q = 0.707 corresponds to…', de: 'Q = 0,707 entspricht…', ja: 'Q＝0.707は…' }, o: { es: ['Autooscilación', 'Respuesta Butterworth sin pico', 'Un notch', 'Un pico de +12 dB'], en: ['Self-oscillation', 'Butterworth response with no peak', 'A notch', 'A +12 dB peak'], de: ['Selbstoszillation', 'Butterworth ohne Spitze', 'Einen Notch', 'Eine +12-dB-Spitze'], ja: ['自己発振', 'ピークのないバターワース特性', 'ノッチ', '+12 dBのピーク'] }, c: 1, x: { es: 'Es la respuesta máximamente plana.', en: 'It is the maximally flat response.', de: 'Die maximal flache Antwort.', ja: '最大平坦特性です。' } }
    ]
  });

  /* ===================== 6. ENVOLVENTES Y VCA ===================== */
  M({
    id: 'env', lv: 1, lab: ['env', 'synth'],
    title: { es: 'Envolventes y articulación', en: 'Envelopes and articulation', de: 'Hüllkurven und Artikulation', ja: 'エンベロープとアーティキュレーション' },
    sum: { es: 'ADSR, curvas lineales y exponenciales, velocidad, retrigger, legato y envolventes multietapa: la forma de cada nota en el tiempo.', en: 'ADSR, linear and exponential curves, velocity, retrigger, legato and multi-stage envelopes: each note\'s shape over time.', de: 'ADSR, lineare und exponentielle Kurven, Velocity, Retrigger, Legato und mehrstufige Hüllkurven: die Form jeder Note in der Zeit.', ja: 'ADSR、線形と指数カーブ、ベロシティ、リトリガー、レガート、多段エンベロープ：各音の時間的な形。' },
    key: {
      es: ['<b>A</b>taque, <b>D</b>ecay (caída), <b>S</b>ustain (nivel, no tiempo), <b>R</b>elease (liberación).', 'La envolvente de amplitud define si un sonido es percusivo, sostenido o en "fade".', 'Las curvas <b>exponenciales</b> suenan más naturales que las lineales en decay y release.', 'La <b>velocidad</b> puede escalar el nivel y la profundidad de otras envolventes.', 'Legato vs retrigger cambian radicalmente el fraseo en sintes monofónicos.'],
      en: ['<b>A</b>ttack, <b>D</b>ecay, <b>S</b>ustain (a level, not a time), <b>R</b>elease.', 'The amp envelope decides whether a sound is percussive, sustained or fading in.', '<b>Exponential</b> curves sound more natural than linear ones for decay and release.', '<b>Velocity</b> can scale the level and depth of other envelopes.', 'Legato vs retrigger radically changes phrasing on monophonic synths.'],
      de: ['<b>A</b>ttack, <b>D</b>ecay, <b>S</b>ustain (ein Pegel, keine Zeit), <b>R</b>elease.', 'Die Lautstärke-Hüllkurve entscheidet: perkussiv, gehalten oder eingeblendet.', '<b>Exponentielle</b> Kurven klingen bei Decay und Release natürlicher als lineare.', '<b>Velocity</b> kann Pegel und Tiefe anderer Hüllkurven skalieren.', 'Legato vs. Retrigger verändert die Phrasierung bei Monosynths grundlegend.'],
      ja: ['<b>A</b>ttack（立ち上がり）、<b>D</b>ecay（減衰）、<b>S</b>ustain（時間ではなくレベル）、<b>R</b>elease（余韻）。', 'アンプ・エンベロープが、打楽器的か、持続音か、フェードインかを決める。', 'ディケイとリリースでは<b>指数</b>カーブの方が線形より自然に聞こえる。', '<b>ベロシティ</b>で他のエンベロープのレベルや深さを変えられる。', 'レガートかリトリガーかで、モノシンセのフレージングは激変する。']
    },
    sec: [
      {
        h: { es: 'Las cuatro etapas', en: 'The four stages', de: 'Die vier Phasen', ja: '4つの段階' },
        b: {
          es: `<ul><li><b>Attack</b>: tiempo de 0 al máximo desde que se presiona la tecla. 1–5 ms = golpe seco; 50–200 ms = arco de violín; 1 s+ = pad que "crece".</li><li><b>Decay</b>: tiempo para bajar del máximo al nivel de sustain.</li><li><b>Sustain</b>: <b>nivel</b> que se mantiene mientras la tecla siga apretada. Sustain 0 = sonido percusivo (piano, pluck, campana).</li><li><b>Release</b>: tiempo para volver a 0 al soltar la tecla. Release largo = cola, reverberación natural.</li></ul>
<table><tr><th>Sonido</th><th>A</th><th>D</th><th>S</th><th>R</th></tr>
<tr><td>Órgano</td><td>~0</td><td>—</td><td>100%</td><td>~0</td></tr>
<tr><td>Piano / pluck</td><td>~0</td><td>0,5–3 s</td><td>0</td><td>0,2–1 s</td></tr>
<tr><td>Cuerdas</td><td>200 ms</td><td>300 ms</td><td>90%</td><td>600 ms</td></tr>
<tr><td>Metal (brass)</td><td>50 ms</td><td>200 ms</td><td>80%</td><td>200 ms</td></tr>
<tr><td>Pad</td><td>1–2 s</td><td>1 s</td><td>80%</td><td>2–3 s</td></tr>
<tr><td>Bombo</td><td>0</td><td>300 ms</td><td>0</td><td>300 ms</td></tr></table>`,
          en: `<ul><li><b>Attack</b>: time from 0 to peak after key press. 1–5 ms = sharp hit; 50–200 ms = violin bow; 1 s+ = "swelling" pad.</li><li><b>Decay</b>: time to fall from peak to the sustain level.</li><li><b>Sustain</b>: the <b>level</b> held while the key stays down. Sustain 0 = percussive sound (piano, pluck, bell).</li><li><b>Release</b>: time to return to 0 after the key is released. Long release = tail, natural reverb.</li></ul>
<table><tr><th>Sound</th><th>A</th><th>D</th><th>S</th><th>R</th></tr>
<tr><td>Organ</td><td>~0</td><td>—</td><td>100%</td><td>~0</td></tr>
<tr><td>Piano / pluck</td><td>~0</td><td>0.5–3 s</td><td>0</td><td>0.2–1 s</td></tr>
<tr><td>Strings</td><td>200 ms</td><td>300 ms</td><td>90%</td><td>600 ms</td></tr>
<tr><td>Brass</td><td>50 ms</td><td>200 ms</td><td>80%</td><td>200 ms</td></tr>
<tr><td>Pad</td><td>1–2 s</td><td>1 s</td><td>80%</td><td>2–3 s</td></tr>
<tr><td>Kick</td><td>0</td><td>300 ms</td><td>0</td><td>300 ms</td></tr></table>`,
          de: `<ul><li><b>Attack</b>: Zeit von 0 bis zum Maximum nach dem Tastendruck. 1–5 ms = harter Schlag; 50–200 ms = Geigenbogen; 1 s+ = „anschwellendes" Pad.</li><li><b>Decay</b>: Zeit vom Maximum zum Sustain-Pegel.</li><li><b>Sustain</b>: <b>Pegel</b>, der gehalten wird, solange die Taste gedrückt ist. Sustain 0 = perkussiv (Klavier, Pluck, Glocke).</li><li><b>Release</b>: Zeit bis 0 nach dem Loslassen. Langes Release = Ausklang, natürlicher Hall.</li></ul>
<table><tr><th>Klang</th><th>A</th><th>D</th><th>S</th><th>R</th></tr>
<tr><td>Orgel</td><td>~0</td><td>—</td><td>100 %</td><td>~0</td></tr>
<tr><td>Klavier / Pluck</td><td>~0</td><td>0,5–3 s</td><td>0</td><td>0,2–1 s</td></tr>
<tr><td>Streicher</td><td>200 ms</td><td>300 ms</td><td>90 %</td><td>600 ms</td></tr>
<tr><td>Bläser</td><td>50 ms</td><td>200 ms</td><td>80 %</td><td>200 ms</td></tr>
<tr><td>Pad</td><td>1–2 s</td><td>1 s</td><td>80 %</td><td>2–3 s</td></tr>
<tr><td>Kick</td><td>0</td><td>300 ms</td><td>0</td><td>300 ms</td></tr></table>`,
          ja: `<ul><li><b>アタック</b>：鍵盤を押してから0→最大までの時間。1〜5 ms＝鋭い打撃、50〜200 ms＝バイオリンの弓、1秒以上＝「膨らむ」パッド。</li><li><b>ディケイ</b>：最大からサステイン・レベルまで下がる時間。</li><li><b>サステイン</b>：鍵盤を押している間保たれる<b>レベル</b>。サステイン0＝打楽器的（ピアノ、プラック、ベル）。</li><li><b>リリース</b>：鍵盤を離してから0に戻る時間。長いリリース＝余韻、自然な残響。</li></ul>
<table><tr><th>音</th><th>A</th><th>D</th><th>S</th><th>R</th></tr>
<tr><td>オルガン</td><td>~0</td><td>—</td><td>100%</td><td>~0</td></tr>
<tr><td>ピアノ／プラック</td><td>~0</td><td>0.5〜3秒</td><td>0</td><td>0.2〜1秒</td></tr>
<tr><td>ストリングス</td><td>200 ms</td><td>300 ms</td><td>90%</td><td>600 ms</td></tr>
<tr><td>ブラス</td><td>50 ms</td><td>200 ms</td><td>80%</td><td>200 ms</td></tr>
<tr><td>パッド</td><td>1〜2秒</td><td>1秒</td><td>80%</td><td>2〜3秒</td></tr>
<tr><td>キック</td><td>0</td><td>300 ms</td><td>0</td><td>300 ms</td></tr></table>`
        }
      },
      {
        h: { es: 'Curvas, velocidad y escalado', en: 'Curves, velocity and scaling', de: 'Kurven, Velocity und Skalierung', ja: 'カーブ・ベロシティ・スケーリング' },
        b: {
          es: `<p>Los generadores analógicos cargan y descargan un capacitor, lo que produce curvas <b>exponenciales</b>. Como percibimos el volumen en dB (logarítmico), un decay exponencial suena como una bajada pareja y natural; uno lineal parece mantenerse y "caer de golpe" al final. En cambio, para el ataque muchos prefieren curvas lineales o incluso "convexas" que suenan más contundentes.</p>
<p>La <b>velocidad</b> (velocity) puede escalar: el pico de la envolvente de amplitud (dinámica), la cantidad de envolvente de filtro (brillo), el tiempo de ataque (más fuerte = más rápido). El <b>escalado por teclado</b> (key scaling) acorta los decays en notas agudas, como sucede en el piano real.</p>
<p>La regla de oro: <b>la envolvente de filtro y la de amplitud cuentan historias distintas</b>. Un sonido puede sostener volumen (S amp = 100%) mientras su brillo decae (S filtro = 20%): eso es exactamente lo que hace un metal o una cuerda frotada.</p>`,
          en: `<p>Analogue generators charge and discharge a capacitor, producing <b>exponential</b> curves. Since we perceive loudness in dB (logarithmically), an exponential decay sounds like an even, natural fade; a linear one seems to hang and then "drop off" at the end. For the attack, however, many prefer linear or even "convex" curves which sound punchier.</p>
<p><b>Velocity</b> can scale the amp envelope peak (dynamics), the filter envelope amount (brightness), the attack time (harder = faster). <b>Key scaling</b> shortens decays on high notes, as on a real piano.</p>
<p>Golden rule: <b>the filter and amp envelopes tell different stories</b>. A sound may hold its level (amp S = 100%) while its brightness decays (filter S = 20%): that's exactly what brass or a bowed string do.</p>`,
          de: `<p>Analoge Generatoren laden und entladen einen Kondensator – das ergibt <b>exponentielle</b> Kurven. Da wir Lautstärke logarithmisch (dB) wahrnehmen, klingt ein exponentieller Decay gleichmäßig und natürlich; ein linearer scheint zu verharren und am Ende „abzustürzen". Für den Attack bevorzugen viele dagegen lineare oder gar „konvexe" Kurven, die druckvoller klingen.</p>
<p><b>Velocity</b> kann skalieren: den Spitzenpegel (Dynamik), die Filterhüllkurven-Menge (Helligkeit), die Attackzeit (härter = schneller). <b>Key Scaling</b> verkürzt Decays bei hohen Noten wie beim echten Klavier.</p>
<p>Goldene Regel: <b>Filter- und Lautstärke-Hüllkurve erzählen verschiedene Geschichten</b>. Ein Klang kann den Pegel halten (Amp-S = 100 %), während seine Helligkeit abnimmt (Filter-S = 20 %) – genau so verhalten sich Blech oder gestrichene Saiten.</p>`,
          ja: `<p>アナログのエンベロープ・ジェネレーターはコンデンサーを充放電するため<b>指数</b>カーブになります。音量はdB（対数）で知覚するので、指数的なディケイは均一で自然に聞こえ、線形だと粘ってから最後に「急に落ちる」ように感じます。一方アタックには、よりパンチのある線形や「凸型」カーブを好む人が多いです。</p>
<p><b>ベロシティ</b>はアンプ・エンベロープの頂点（ダイナミクス）、フィルター・エンベロープ量（明るさ）、アタック時間（強いほど速く）を変えられます。<b>キースケーリング</b>は本物のピアノのように高音でディケイを短くします。</p>
<p>黄金律：<b>フィルターとアンプのエンベロープは別の物語を語る</b>。音量は保ちつつ（アンプS＝100%）明るさは減衰する（フィルターS＝20%）—まさにブラスや擦弦楽器の振る舞いです。</p>`
        }
      },
      {
        h: { es: 'Retrigger, legato y envolventes avanzadas', en: 'Retrigger, legato and advanced envelopes', de: 'Retrigger, Legato und erweiterte Hüllkurven', ja: 'リトリガー・レガート・高度なエンベロープ' },
        b: {
          es: `<ul><li><b>Retrigger (multi-trigger)</b>: cada nota nueva reinicia las envolventes → cada nota tiene ataque.</li><li><b>Legato (single-trigger)</b>: si tocás una nota nueva sin soltar la anterior, la envolvente <b>no</b> se reinicia; solo cambia la altura (con portamento si lo hay). Es la clave del fraseo de leads y bajos acid.</li><li><b>AD / AR</b>: envolventes simples para percusión o modulación.</li><li><b>DAHDSR</b>: agregan Delay (espera antes del ataque) y Hold (mantener el pico).</li><li><b>Multietapa / looping</b>: envolventes de 8+ segmentos (Yamaha DX7 de 4 tasas y 4 niveles, Kurzweil, Serum), que pueden repetirse como un LFO complejo.</li><li><b>Envelope follower</b>: extrae una envolvente de una señal externa (por ej. para que una batería abra un filtro).</li></ul>`,
          en: `<ul><li><b>Retrigger (multi-trigger)</b>: each new note restarts the envelopes → every note has an attack.</li><li><b>Legato (single-trigger)</b>: playing a new note without releasing the previous one does <b>not</b> restart the envelope; only pitch changes (with glide if set). Key to lead and acid-bass phrasing.</li><li><b>AD / AR</b>: simple envelopes for percussion or modulation.</li><li><b>DAHDSR</b>: add Delay (wait before attack) and Hold (stay at peak).</li><li><b>Multi-stage / looping</b>: 8+ segment envelopes (DX7's 4 rates/4 levels, Kurzweil, Serum) that can loop like a complex LFO.</li><li><b>Envelope follower</b>: extracts an envelope from an external signal (e.g. drums opening a filter).</li></ul>`,
          de: `<ul><li><b>Retrigger (Multi-Trigger)</b>: Jede neue Note startet die Hüllkurven neu → jede Note hat einen Anschlag.</li><li><b>Legato (Single-Trigger)</b>: Eine neue Note ohne Loslassen der vorherigen startet die Hüllkurve <b>nicht</b> neu; nur die Tonhöhe ändert sich (ggf. mit Glide). Schlüssel für Lead- und Acid-Phrasierung.</li><li><b>AD / AR</b>: einfache Hüllkurven für Percussion oder Modulation.</li><li><b>DAHDSR</b>: plus Delay (Warten vor Attack) und Hold (Spitze halten).</li><li><b>Mehrstufig / loopend</b>: 8+ Segmente (DX7 mit 4 Raten/4 Pegeln, Kurzweil, Serum), loopbar wie ein komplexer LFO.</li><li><b>Envelope Follower</b>: gewinnt eine Hüllkurve aus einem externen Signal (z. B. Drums öffnen ein Filter).</li></ul>`,
          ja: `<ul><li><b>リトリガー（マルチトリガー）</b>：新しい音のたびにエンベロープが再始動→全音にアタックがある。</li><li><b>レガート（シングルトリガー）</b>：前の音を離さずに次を弾くとエンベロープは再始動<b>しない</b>。音高だけが変わる（グライドがあればグライド）。リードやアシッドベースのフレージングの鍵。</li><li><b>AD／AR</b>：パーカッションや変調用の簡単なエンベロープ。</li><li><b>DAHDSR</b>：ディレイ（アタック前の待機）とホールド（頂点の保持）を追加。</li><li><b>多段／ループ</b>：8段以上（DX7の4レート4レベル、Kurzweil、Serum）、複雑なLFOのようにループ可能。</li><li><b>エンベロープ・フォロワー</b>：外部信号からエンベロープを抽出（例：ドラムでフィルターを開く）。</li></ul>`
        }
      }
    ],
    ex: {
      es: ['Lab ADSR, destino "amplitud": recreá los 6 ejemplos de la tabla y escuchalos.', 'Destino "filtro": ataque 1 ms, decay 200 ms, sustain 0. Luego subí el decay a 1,5 s. ¿Qué instrumento recuerda cada uno?', 'Destino "ambos": comprobá cómo el mismo ADSR en filtro y amplitud se refuerza. Después probá distintos valores en el sinte completo para cada envolvente.', 'Tocá con velocidad 30% y 100% con destino filtro. ¿Cuánto cambia el brillo?', 'En el sinte completo activá "Mono" y portamento 80 ms; tocá ligando notas (sin soltar) y luego separadas.'],
      en: ['ADSR lab, destination "amp": recreate the 6 examples from the table and listen.', 'Destination "filter": attack 1 ms, decay 200 ms, sustain 0. Then raise decay to 1.5 s. What instrument does each recall?', 'Destination "both": hear how the same ADSR on filter and amp reinforce each other. Then try different values per envelope in the full synth.', 'Play at 30% and 100% velocity with destination filter. How much does brightness change?', 'In the full synth enable "Mono" and 80 ms glide; play legato (overlapping) and then detached.'],
      de: ['ADSR-Labor, Ziel „Amp": die 6 Beispiele der Tabelle nachbauen und anhören.', 'Ziel „Filter": Attack 1 ms, Decay 200 ms, Sustain 0. Dann Decay 1,5 s. Woran erinnert es jeweils?', 'Ziel „beide": Wie verstärkt sich dieselbe ADSR auf Filter und Amp? Dann im Synth unterschiedliche Werte pro Hüllkurve.', 'Mit 30 % und 100 % Velocity auf Ziel Filter spielen. Wie stark ändert sich die Helligkeit?', 'Im Synth „Mono" und 80 ms Glide aktivieren; legato (überlappend) und abgesetzt spielen.'],
      ja: ['ADSRラボ、送り先「振幅」：表の6例を再現して聴こう。', '送り先「フィルター」：アタック1 ms、ディケイ200 ms、サステイン0。次にディケイを1.5秒に。それぞれ何の楽器を思わせる？', '送り先「両方」：同じADSRがフィルターと振幅で強め合うのを確認。その後フルシンセで各エンベロープに別の値を。', 'ベロシティ30%と100%で送り先フィルターを弾こう。明るさはどれだけ変わる？', 'フルシンセで「モノ」とグライド80 msを有効にし、レガート（重ねて）とスタッカートで弾き比べよう。']
    },
    deep: {
      es: `<h3>La "pegada" está en los primeros 20 ms</h3>
<p>Gran parte de la identidad de un sonido está en su <b>transitorio</b>. Experimentos clásicos (Saldanha y Corso, 1964) muestran que si se corta el ataque de instrumentos grabados, es difícil reconocerlos. En síntesis, eso significa: dedicale tanta atención al ataque como al cuerpo. Trucos: un decay muy corto en la envolvente de filtro (5–30 ms) agrega un "click" de brillo; una pequeña envolvente de altura (pitch envelope) que baja 1–12 semitonos en 10–50 ms da pegada a bombos, toms y bajos; un breve golpe de ruido filtrado imita el soplo o el martillo.</p>
<h3>Clics y desclics</h3>
<p>Un ataque o release de 0 ms puede producir un <b>clic</b> si la onda no está en cero: es una discontinuidad abrupta (espectro ancho). Los sintes suelen tener un mínimo de 1–3 ms. A veces el clic es deseado (bajos tipo "Minimoog" con ataque instantáneo).</p>
<h3>Envolventes como fuentes de modulación</h3>
<p>Una envolvente no tiene por qué ir solo a amplitud y filtro. Enviada a: <b>altura</b> (caídas de pitch, "zap" láser), <b>ancho de pulso</b>, <b>índice FM</b> (brillo de campanas y pianos eléctricos), <b>posición de wavetable</b>, <b>tiempo de delay</b>, <b>cantidad de LFO</b> (vibrato que aparece después de un tiempo, como un cantante).</p>`,
      en: `<h3>The "punch" lives in the first 20 ms</h3>
<p>Much of a sound's identity is in its <b>transient</b>. Classic experiments (Saldanha & Corso, 1964) showed that cutting off the attack of recorded instruments makes them hard to recognise. In synthesis: give the attack as much attention as the body. Tricks: a very short filter-envelope decay (5–30 ms) adds a "click" of brightness; a small pitch envelope falling 1–12 semitones in 10–50 ms gives punch to kicks, toms and basses; a brief burst of filtered noise imitates breath or hammer.</p>
<h3>Clicks</h3>
<p>A 0 ms attack or release can cause a <b>click</b> if the wave isn't at zero: an abrupt discontinuity (wide spectrum). Synths usually enforce 1–3 ms minimum. Sometimes the click is wanted (Minimoog-style basses with instant attack).</p>
<h3>Envelopes as modulation sources</h3>
<p>An envelope needn't go only to amp and filter. Send it to <b>pitch</b> (pitch drops, laser "zaps"), <b>pulse width</b>, <b>FM index</b> (bell and e-piano brightness), <b>wavetable position</b>, <b>delay time</b>, <b>LFO amount</b> (vibrato fading in after a while, like a singer).</p>`,
      de: `<h3>Der „Punch" steckt in den ersten 20 ms</h3>
<p>Viel Identität liegt im <b>Transienten</b>. Klassische Experimente (Saldanha & Corso, 1964) zeigten: Schneidet man den Anschlag aufgenommener Instrumente ab, sind sie schwer zu erkennen. Für die Synthese heißt das: Dem Anschlag so viel Aufmerksamkeit wie dem Körper schenken. Tricks: Sehr kurzer Filter-Decay (5–30 ms) fügt einen hellen „Klick" hinzu; eine kleine Tonhöhenhüllkurve, die in 10–50 ms 1–12 Halbtöne fällt, gibt Kicks, Toms und Bässen Punch; ein kurzer Stoß gefilterten Rauschens imitiert Atem oder Hammer.</p>
<h3>Klicks</h3>
<p>0 ms Attack oder Release kann <b>klicken</b>, wenn die Welle nicht bei null ist: ein abrupter Sprung (breites Spektrum). Synths erzwingen meist 1–3 ms. Manchmal ist der Klick erwünscht (Minimoog-Bässe).</p>
<h3>Hüllkurven als Modulationsquellen</h3>
<p>Schicke sie auch an <b>Tonhöhe</b> (Pitch-Drops, Laser-„Zaps"), <b>Pulsbreite</b>, <b>FM-Index</b> (Helligkeit von Glocken und E-Pianos), <b>Wavetable-Position</b>, <b>Delayzeit</b>, <b>LFO-Menge</b> (Vibrato, das später einsetzt, wie bei Sängern).</p>`,
      ja: `<h3>「パンチ」は最初の20 msにある</h3>
<p>音のアイデンティティの多くは<b>トランジェント</b>にあります。古典的な実験（Saldanha & Corso、1964）では、録音した楽器のアタックを切ると識別が難しくなることが示されました。シンセでは、アタックにも本体と同じだけ注意を払おう。技：フィルター・エンベロープのごく短いディケイ（5〜30 ms）で明るい「クリック」を加える。10〜50 msで1〜12半音下がる小さなピッチ・エンベロープでキック・タム・ベースにパンチを。短いフィルター・ノイズで息やハンマーを模倣。</p>
<h3>クリックノイズ</h3>
<p>アタックやリリースが0 msだと、波形がゼロでない位置で<b>クリック</b>が出ます。急な不連続（広い帯域）です。多くのシンセは最小1〜3 msにしています。クリックが望ましい場合もあります（即時アタックのミニモーグ風ベース）。</p>
<h3>変調ソースとしてのエンベロープ</h3>
<p>エンベロープは振幅とフィルターだけに使う必要はありません。<b>ピッチ</b>（ピッチ・ドロップ、レーザー「ザップ」）、<b>パルス幅</b>、<b>FMインデックス</b>（ベルやエレピの明るさ）、<b>ウェーブテーブル位置</b>、<b>ディレイ・タイム</b>、<b>LFO量</b>（歌手のように後から現れるビブラート）にも送ってみよう。</p>`
    },
    read: ['Welsh\'s Synthesizer Cookbook — tablas de envolventes por instrumento', 'Martin Russ — <i>Sound Synthesis and Sampling</i>, cap. sobre envolventes', 'Simon Cann — <i>How to Make a Noise</i>'],
    quiz: [
      { q: { es: '¿Cuál de los parámetros ADSR es un nivel y no un tiempo?', en: 'Which ADSR parameter is a level, not a time?', de: 'Welcher ADSR-Parameter ist ein Pegel, keine Zeit?', ja: 'ADSRのうち時間ではなくレベルなのは？' }, o: { es: ['Attack', 'Decay', 'Sustain', 'Release'], en: ['Attack', 'Decay', 'Sustain', 'Release'], de: ['Attack', 'Decay', 'Sustain', 'Release'], ja: ['アタック', 'ディケイ', 'サステイン', 'リリース'] }, c: 2, x: { es: 'Sustain es el nivel mantenido mientras la tecla está apretada.', en: 'Sustain is the level held while the key is down.', de: 'Sustain ist der gehaltene Pegel.', ja: 'サステインは押鍵中に保たれるレベルです。' } },
      { q: { es: 'Para un sonido percusivo tipo pluck, el sustain debe ser…', en: 'For a percussive pluck, sustain should be…', de: 'Für einen perkussiven Pluck sollte Sustain…', ja: '打楽器的なプラックのサステインは…' }, o: { es: ['100%', '50%', '0', 'Igual al ataque'], en: ['100%', '50%', '0', 'Equal to attack'], de: ['100 %', '50 %', '0', 'Gleich Attack'], ja: ['100%', '50%', '0', 'アタックと同じ'] }, c: 2, x: { es: 'Con sustain 0 el sonido decae aunque mantengas la tecla.', en: 'With sustain 0 the sound decays even while holding the key.', de: 'Mit Sustain 0 klingt es auch bei gehaltener Taste aus.', ja: 'サステイン0なら押し続けても減衰します。' } },
      { q: { es: 'En modo legato (single-trigger), una nota ligada…', en: 'In legato (single-trigger) mode, an overlapping note…', de: 'Im Legato-Modus (Single-Trigger) bewirkt eine überlappende Note…', ja: 'レガート（シングルトリガー）で重ねた音は…' }, o: { es: ['Reinicia la envolvente', 'Cambia la altura sin reiniciar la envolvente', 'Se ignora', 'Duplica el volumen'], en: ['Restarts the envelope', 'Changes pitch without restarting the envelope', 'Is ignored', 'Doubles the volume'], de: ['Neustart der Hüllkurve', 'Tonhöhenwechsel ohne Neustart', 'Wird ignoriert', 'Verdoppelt die Lautstärke'], ja: ['エンベロープを再始動', 'エンベロープを再始動せず音高だけ変わる', '無視される', '音量が倍になる'] }, c: 1, x: { es: 'Así se logran frases fluidas en leads y bajos.', en: 'That\'s how fluid lead and bass phrases are made.', de: 'So entstehen fließende Lead- und Basslinien.', ja: 'こうして滑らかなリードやベースのフレーズが生まれます。' } },
      { q: { es: '¿Por qué un decay exponencial suena más natural?', en: 'Why does an exponential decay sound more natural?', de: 'Warum klingt exponentieller Decay natürlicher?', ja: '指数ディケイが自然に聞こえる理由は？' }, o: { es: ['Porque es más rápido', 'Porque percibimos el volumen en escala logarítmica (dB)', 'Porque agrega armónicos', 'No suena más natural'], en: ['Because it is faster', 'Because we perceive loudness logarithmically (dB)', 'Because it adds harmonics', 'It doesn\'t'], de: ['Weil er schneller ist', 'Weil wir Lautstärke logarithmisch (dB) hören', 'Weil er Obertöne hinzufügt', 'Tut er nicht'], ja: ['速いから', '音量を対数（dB）で知覚するから', '倍音が加わるから', '自然には聞こえない'] }, c: 1, x: { es: 'Una caída exponencial es una recta en dB.', en: 'An exponential decay is a straight line in dB.', de: 'Ein exponentieller Abfall ist in dB eine Gerade.', ja: '指数減衰はdBでは直線になります。' } },
      { q: { es: 'Una envolvente de altura breve y descendente se usa típicamente en…', en: 'A short falling pitch envelope is typically used for…', de: 'Eine kurze fallende Tonhöhenhüllkurve nutzt man typisch für…', ja: '短く下降するピッチ・エンベロープの典型的な用途は…' }, o: { es: ['Pads', 'Bombos y toms', 'Órganos', 'Cuerdas'], en: ['Pads', 'Kicks and toms', 'Organs', 'Strings'], de: ['Pads', 'Kicks und Toms', 'Orgeln', 'Streicher'], ja: ['パッド', 'キックとタム', 'オルガン', 'ストリングス'] }, c: 1, x: { es: 'La caída rápida de altura da el "punch" del golpe.', en: 'The fast pitch drop gives the hit its punch.', de: 'Der schnelle Tonhöhenabfall gibt den Punch.', ja: '急速なピッチ低下が打撃のパンチを生みます。' } }
    ]
  });

  /* ===================== 7. MODULACIÓN ===================== */
  M({
    id: 'mod', lv: 2, lab: ['lfo', 'synth'],
    title: { es: 'Modulación: LFO, matriz y movimiento', en: 'Modulation: LFO, matrix and movement', de: 'Modulation: LFO, Matrix und Bewegung', ja: 'モジュレーション：LFO・マトリクス・動き' },
    sum: { es: 'Formas y velocidades de LFO, vibrato, trémolo, wah, sample & hold, sincronía al tempo, matriz de modulación, portamento y expresión.', en: 'LFO shapes and rates, vibrato, tremolo, wah, sample & hold, tempo sync, mod matrix, glide and expression.', de: 'LFO-Formen und -Raten, Vibrato, Tremolo, Wah, Sample & Hold, Temposync, Modulationsmatrix, Glide und Ausdruck.', ja: 'LFOの波形と速さ、ビブラート、トレモロ、ワウ、S&H、テンポ同期、モジュレーション・マトリクス、グライド、表現。' },
    key: {
      es: ['Un sonido sin movimiento suena "de plástico": la modulación le da vida.', 'LFO → altura = <b>vibrato</b>; → amplitud = <b>trémolo</b>; → corte = <b>wah</b>.', '<b>Sample &amp; hold</b> toma valores aleatorios a intervalos regulares: el clásico "computadora de ciencia ficción".', 'Pensá cada modulación como <b>fuente → cantidad → destino</b>.', 'Las fuentes de expresión (rueda, aftertouch, velocidad, MPE) conectan el sonido con el intérprete.'],
      en: ['A sound without movement sounds "plastic": modulation brings it to life.', 'LFO → pitch = <b>vibrato</b>; → amplitude = <b>tremolo</b>; → cutoff = <b>wah</b>.', '<b>Sample &amp; hold</b> takes random values at regular intervals: the classic "sci-fi computer".', 'Think of every modulation as <b>source → amount → destination</b>.', 'Expression sources (wheel, aftertouch, velocity, MPE) connect sound and performer.'],
      de: ['Ein Klang ohne Bewegung klingt „nach Plastik": Modulation bringt Leben.', 'LFO → Tonhöhe = <b>Vibrato</b>; → Amplitude = <b>Tremolo</b>; → Cutoff = <b>Wah</b>.', '<b>Sample &amp; Hold</b> nimmt in festen Abständen Zufallswerte: der klassische „Sci-Fi-Computer".', 'Denke jede Modulation als <b>Quelle → Menge → Ziel</b>.', 'Ausdrucksquellen (Rad, Aftertouch, Velocity, MPE) verbinden Klang und Spieler.'],
      ja: ['動きのない音は「プラスチック」のよう。モジュレーションが命を吹き込む。', 'LFO→ピッチ＝<b>ビブラート</b>、→振幅＝<b>トレモロ</b>、→カットオフ＝<b>ワウ</b>。', '<b>サンプル＆ホールド</b>は一定間隔でランダム値を取る。古典的な「SFのコンピューター」音。', 'すべての変調を<b>ソース→量→送り先</b>で考えよう。', '表現のソース（ホイール、アフタータッチ、ベロシティ、MPE）が音と奏者をつなぐ。']
    },
    sec: [
      {
        h: { es: 'El LFO', en: 'The LFO', de: 'Der LFO', ja: 'LFO' },
        b: {
          es: `<p>Un LFO es un oscilador por debajo del rango audible (≈0,01–20 Hz) usado como <b>señal de control</b>. Sus parámetros:</p>
<ul><li><b>Forma</b>: senoidal/triangular (ondulación suave), cuadrada (trino, alternancia), sierra ascendente/descendente (rampas, sirenas, "wobble" asimétrico), S&amp;H (escalones aleatorios), ruido suavizado (deriva orgánica).</li><li><b>Velocidad</b> (Hz o sincronizada al tempo: 1/4, 1/8, 1/16 con puntillo, tresillos).</li><li><b>Profundidad</b>: cuánto afecta al destino.</li><li><b>Retrigger / modo clave</b>: si el LFO reinicia su fase con cada nota (consistente) o corre libre.</li><li><b>Delay / fade-in</b>: la modulación aparece gradualmente después del ataque (vibrato natural).</li><li><b>Polaridad</b>: bipolar (−1…+1, oscila alrededor del valor) o unipolar (0…+1, solo hacia un lado).</li></ul>
<table><tr><th>Efecto</th><th>Destino</th><th>Forma</th><th>Velocidad</th><th>Profundidad</th></tr>
<tr><td>Vibrato</td><td>altura</td><td>senoidal</td><td>5–7 Hz</td><td>±10–30 cents</td></tr>
<tr><td>Trémolo</td><td>amplitud</td><td>senoidal/triang.</td><td>4–8 Hz</td><td>media</td></tr>
<tr><td>Wah lento</td><td>corte</td><td>triangular</td><td>0,2–2 Hz</td><td>1–3 oct</td></tr>
<tr><td>Trino</td><td>altura</td><td>cuadrada</td><td>6–10 Hz</td><td>1–2 semitonos</td></tr>
<tr><td>Wobble</td><td>corte</td><td>sierra/seno</td><td>1/8, 1/16</td><td>alta</td></tr>
<tr><td>Computadora</td><td>altura/corte</td><td>S&amp;H</td><td>8–15 Hz</td><td>alta</td></tr></table>`,
          en: `<p>An LFO is an oscillator below the audible range (≈0.01–20 Hz) used as a <b>control signal</b>. Its parameters:</p>
<ul><li><b>Shape</b>: sine/triangle (smooth undulation), square (trill, alternation), ramp up/down (sirens, asymmetric wobble), S&amp;H (random steps), smoothed noise (organic drift).</li><li><b>Rate</b> (Hz or tempo-synced: 1/4, 1/8, dotted 1/16, triplets).</li><li><b>Depth</b>: how much it affects the destination.</li><li><b>Retrigger / key mode</b>: whether the LFO resets its phase per note (consistent) or free-runs.</li><li><b>Delay / fade-in</b>: modulation appears gradually after the attack (natural vibrato).</li><li><b>Polarity</b>: bipolar (−1…+1, around the value) or unipolar (0…+1, one direction only).</li></ul>
<table><tr><th>Effect</th><th>Destination</th><th>Shape</th><th>Rate</th><th>Depth</th></tr>
<tr><td>Vibrato</td><td>pitch</td><td>sine</td><td>5–7 Hz</td><td>±10–30 cents</td></tr>
<tr><td>Tremolo</td><td>amplitude</td><td>sine/tri</td><td>4–8 Hz</td><td>medium</td></tr>
<tr><td>Slow wah</td><td>cutoff</td><td>triangle</td><td>0.2–2 Hz</td><td>1–3 oct</td></tr>
<tr><td>Trill</td><td>pitch</td><td>square</td><td>6–10 Hz</td><td>1–2 semitones</td></tr>
<tr><td>Wobble</td><td>cutoff</td><td>saw/sine</td><td>1/8, 1/16</td><td>high</td></tr>
<tr><td>Computer</td><td>pitch/cutoff</td><td>S&amp;H</td><td>8–15 Hz</td><td>high</td></tr></table>`,
          de: `<p>Ein LFO ist ein Oszillator unterhalb des Hörbereichs (≈0,01–20 Hz), genutzt als <b>Steuersignal</b>. Parameter:</p>
<ul><li><b>Form</b>: Sinus/Dreieck (sanft), Rechteck (Triller, Wechsel), Rampe auf/ab (Sirenen, asymmetrisches Wobble), S&amp;H (Zufallsstufen), geglättetes Rauschen (organische Drift).</li><li><b>Rate</b> (Hz oder Temposync: 1/4, 1/8, punktierte 1/16, Triolen).</li><li><b>Tiefe</b>: wie stark das Ziel beeinflusst wird.</li><li><b>Retrigger / Key-Modus</b>: Phase pro Note zurücksetzen (konsistent) oder freilaufend.</li><li><b>Delay / Fade-in</b>: Modulation setzt nach dem Anschlag allmählich ein (natürliches Vibrato).</li><li><b>Polarität</b>: bipolar (−1…+1) oder unipolar (0…+1).</li></ul>
<table><tr><th>Effekt</th><th>Ziel</th><th>Form</th><th>Rate</th><th>Tiefe</th></tr>
<tr><td>Vibrato</td><td>Tonhöhe</td><td>Sinus</td><td>5–7 Hz</td><td>±10–30 Cent</td></tr>
<tr><td>Tremolo</td><td>Amplitude</td><td>Sinus/Dreieck</td><td>4–8 Hz</td><td>mittel</td></tr>
<tr><td>Langsames Wah</td><td>Cutoff</td><td>Dreieck</td><td>0,2–2 Hz</td><td>1–3 Okt</td></tr>
<tr><td>Triller</td><td>Tonhöhe</td><td>Rechteck</td><td>6–10 Hz</td><td>1–2 Halbtöne</td></tr>
<tr><td>Wobble</td><td>Cutoff</td><td>Säge/Sinus</td><td>1/8, 1/16</td><td>hoch</td></tr>
<tr><td>Computer</td><td>Tonhöhe/Cutoff</td><td>S&amp;H</td><td>8–15 Hz</td><td>hoch</td></tr></table>`,
          ja: `<p>LFOは可聴域以下（約0.01〜20 Hz）のオシレーターで、<b>制御信号</b>として使います。パラメーター：</p>
<ul><li><b>波形</b>：サイン／三角（滑らかなうねり）、矩形（トリル、交互）、上昇／下降ランプ（サイレン、非対称ウォブル）、S&amp;H（ランダムな段差）、平滑化ノイズ（有機的なドリフト）。</li><li><b>レート</b>（Hzまたはテンポ同期：1/4、1/8、付点1/16、3連）。</li><li><b>デプス</b>：送り先への影響量。</li><li><b>リトリガー／キーモード</b>：音ごとに位相をリセット（一定）するかフリーランか。</li><li><b>ディレイ／フェードイン</b>：アタック後に徐々に変調が現れる（自然なビブラート）。</li><li><b>極性</b>：バイポーラ（−1〜+1、値の周りで揺れる）かユニポーラ（0〜+1、片側のみ）。</li></ul>
<table><tr><th>効果</th><th>送り先</th><th>波形</th><th>レート</th><th>深さ</th></tr>
<tr><td>ビブラート</td><td>ピッチ</td><td>サイン</td><td>5〜7 Hz</td><td>±10〜30セント</td></tr>
<tr><td>トレモロ</td><td>振幅</td><td>サイン／三角</td><td>4〜8 Hz</td><td>中</td></tr>
<tr><td>スロー・ワウ</td><td>カットオフ</td><td>三角</td><td>0.2〜2 Hz</td><td>1〜3 oct</td></tr>
<tr><td>トリル</td><td>ピッチ</td><td>矩形</td><td>6〜10 Hz</td><td>1〜2半音</td></tr>
<tr><td>ウォブル</td><td>カットオフ</td><td>ノコギリ／サイン</td><td>1/8、1/16</td><td>大</td></tr>
<tr><td>コンピューター</td><td>ピッチ／カットオフ</td><td>S&amp;H</td><td>8〜15 Hz</td><td>大</td></tr></table>`
        }
      },
      {
        h: { es: 'La matriz de modulación', en: 'The modulation matrix', de: 'Die Modulationsmatrix', ja: 'モジュレーション・マトリクス' },
        b: {
          es: `<p>Los sintes modernos (Oberheim Matrix-12, Serum, Vital, Pigments) generalizan las conexiones en una <b>matriz</b>: cada fila es <b>fuente → cantidad (±) → destino</b>, opcionalmente escalada por un segundo control ("via"). Ejemplos útiles:</p>
<ul><li>Rueda de modulación → profundidad del LFO de vibrato (vibrato a demanda).</li><li>Aftertouch → corte del filtro (presionar más = más brillo).</li><li>Velocidad → cantidad de envolvente de filtro y → tiempo de ataque (negativo).</li><li>Nota (key) → tiempo de decay (negativo): notas agudas más cortas.</li><li>Envolvente 3 → posición de wavetable; LFO 2 → panorama.</li><li>Aleatorio por nota → desafinación fina y corte (humanización).</li></ul>
<p>También existen los <b>moduladores de moduladores</b>: un LFO lento modulando la velocidad de otro LFO crea movimientos que nunca se repiten exactamente. Es la base de los pads "evolutivos".</p>`,
          en: `<p>Modern synths (Oberheim Matrix-12, Serum, Vital, Pigments) generalise connections into a <b>matrix</b>: each row is <b>source → amount (±) → destination</b>, optionally scaled by a second control ("via"). Useful examples:</p>
<ul><li>Mod wheel → vibrato LFO depth (vibrato on demand).</li><li>Aftertouch → filter cutoff (press harder = brighter).</li><li>Velocity → filter envelope amount and → attack time (negative).</li><li>Note (key) → decay time (negative): shorter high notes.</li><li>Envelope 3 → wavetable position; LFO 2 → pan.</li><li>Per-note random → fine detune and cutoff (humanisation).</li></ul>
<p>There are also <b>modulators of modulators</b>: a slow LFO modulating another LFO's rate creates movement that never repeats exactly. The basis of "evolving" pads.</p>`,
          de: `<p>Moderne Synths (Oberheim Matrix-12, Serum, Vital, Pigments) verallgemeinern Verbindungen in einer <b>Matrix</b>: Jede Zeile ist <b>Quelle → Menge (±) → Ziel</b>, optional skaliert durch eine zweite Quelle („via"). Nützlich:</p>
<ul><li>Modrad → Vibrato-LFO-Tiefe (Vibrato nach Bedarf).</li><li>Aftertouch → Cutoff (fester drücken = heller).</li><li>Velocity → Filterhüllkurven-Menge und → Attackzeit (negativ).</li><li>Note → Decayzeit (negativ): kürzere hohe Noten.</li><li>Hüllkurve 3 → Wavetable-Position; LFO 2 → Panorama.</li><li>Zufall pro Note → Feinverstimmung und Cutoff (Humanisierung).</li></ul>
<p>Es gibt auch <b>Modulatoren von Modulatoren</b>: Ein langsamer LFO, der die Rate eines anderen moduliert, erzeugt nie exakt wiederkehrende Bewegung – Basis „evolvierender" Pads.</p>`,
          ja: `<p>現代のシンセ（Oberheim Matrix-12、Serum、Vital、Pigments）は接続を<b>マトリクス</b>に一般化しています。各行は<b>ソース→量（±）→送り先</b>で、2つ目のコントロール（「via」）でスケールすることもできます。便利な例：</p>
<ul><li>モジュレーション・ホイール→ビブラートLFOの深さ（必要なときだけビブラート）。</li><li>アフタータッチ→カットオフ（強く押すほど明るく）。</li><li>ベロシティ→フィルター・エンベロープ量、→アタック時間（マイナス）。</li><li>ノート（キー）→ディケイ時間（マイナス）：高音ほど短く。</li><li>エンベロープ3→ウェーブテーブル位置、LFO2→パン。</li><li>ノートごとのランダム→微細なデチューンとカットオフ（ヒューマナイズ）。</li></ul>
<p><b>変調の変調</b>もあります。遅いLFOで別のLFOのレートを変調すると、決して同じに繰り返さない動きが生まれます。「進化する」パッドの基本です。</p>`
        }
      },
      {
        h: { es: 'Portamento y expresión', en: 'Glide and expression', de: 'Glide und Ausdruck', ja: 'グライドと表現' },
        b: {
          es: `<p>El <b>portamento</b> (glide) desliza la altura de una nota a la siguiente. Puede ser de <b>tiempo constante</b> (siempre tarda lo mismo) o de <b>velocidad constante</b> (más tiempo para saltos grandes, como el Minimoog). En modo "legato glide" solo actúa al ligar notas: clave en el acid de la TB-303.</p>
<p><b>MPE</b> (MIDI Polyphonic Expression) permite controlar altura, presión y un tercer eje (timbre) <b>por nota</b> con controladores como Roli Seaboard, Linnstrument u Osmose. Cambia la forma de diseñar: cada nota necesita destinos expresivos bien elegidos (presión → volumen y corte, eje Y → wavetable o FM).</p>`,
          en: `<p><b>Portamento</b> (glide) slides pitch from one note to the next. It can be <b>constant time</b> (always the same duration) or <b>constant rate</b> (longer for bigger jumps, as on the Minimoog). In "legato glide" mode it only acts on overlapping notes: key to TB-303 acid.</p>
<p><b>MPE</b> (MIDI Polyphonic Expression) lets you control pitch, pressure and a third axis (timbre) <b>per note</b> with controllers such as the Roli Seaboard, Linnstrument or Osmose. It changes how you design: every note needs well-chosen expressive targets (pressure → volume and cutoff, Y axis → wavetable or FM).</p>`,
          de: `<p><b>Portamento</b> (Glide) gleitet von einer Note zur nächsten. Mit <b>konstanter Zeit</b> (immer gleich lang) oder <b>konstanter Rate</b> (länger bei großen Sprüngen, wie beim Minimoog). Im „Legato-Glide" nur bei überlappenden Noten: Schlüssel zum TB-303-Acid.</p>
<p><b>MPE</b> (MIDI Polyphonic Expression) steuert Tonhöhe, Druck und eine dritte Achse (Timbre) <b>pro Note</b> mit Controllern wie Roli Seaboard, Linnstrument oder Osmose. Das verändert das Design: Jede Note braucht gut gewählte Ausdrucksziele (Druck → Lautstärke und Cutoff, Y-Achse → Wavetable oder FM).</p>`,
          ja: `<p><b>ポルタメント</b>（グライド）は音から音へ音高を滑らせます。<b>時間一定</b>（常に同じ所要時間）と<b>速度一定</b>（大きな跳躍ほど長い、ミニモーグ式）があります。「レガート・グライド」では重ねたときだけ働き、TB-303のアシッドの鍵です。</p>
<p><b>MPE</b>（MIDIポリフォニック・エクスプレッション）は、Roli Seaboard、Linnstrument、Osmoseなどのコントローラーで、ピッチ・圧力・第3軸（音色）を<b>音ごと</b>に操作できます。設計の考え方が変わり、各音に適切な表現先（圧力→音量とカットオフ、Y軸→ウェーブテーブルやFM）が必要です。</p>`
        }
      }
    ],
    ex: {
      es: ['Lab LFO: probá los botones rápidos (vibrato, trémolo, wah, trino, S&H, sirena) y anotá forma, velocidad y destino de cada uno.', 'Con destino "corte", subí la velocidad del LFO de 0,1 Hz a 30 Hz. ¿En qué punto deja de ser un movimiento y se vuelve un timbre?', 'Hacé un vibrato "de cantante": velocidad 5,5 Hz, profundidad pequeña. Compará con 8 Hz y profundidad alta.', 'Diseñá un "computadora de los 70" con S&H sobre el corte, resonancia alta y nota sostenida.', 'Escribí una matriz de modulación (4 filas) para un pad expresivo pensado para tocar con aftertouch.'],
      en: ['LFO lab: try the quick buttons (vibrato, tremolo, wah, trill, S&H, siren) and write down shape, rate and destination of each.', 'With destination "cutoff", raise LFO rate from 0.1 Hz to 30 Hz. At what point does movement become timbre?', 'Make a "singer" vibrato: rate 5.5 Hz, small depth. Compare with 8 Hz and large depth.', 'Design a "70s computer" with S&H on cutoff, high resonance and a held note.', 'Write a 4-row mod matrix for an expressive pad meant to be played with aftertouch.'],
      de: ['LFO-Labor: Schnellknöpfe (Vibrato, Tremolo, Wah, Triller, S&H, Sirene) testen und Form, Rate und Ziel notieren.', 'Ziel „Cutoff": LFO-Rate von 0,1 auf 30 Hz erhöhen. Wann wird Bewegung zu Klangfarbe?', '„Sänger"-Vibrato: 5,5 Hz, geringe Tiefe. Vergleiche mit 8 Hz und großer Tiefe.', 'Gestalte einen „70er-Computer" mit S&H auf Cutoff, hoher Resonanz und gehaltener Note.', 'Schreibe eine 4-zeilige Modulationsmatrix für ein ausdrucksstarkes Aftertouch-Pad.'],
      ja: ['LFOラボ：クイックボタン（ビブラート、トレモロ、ワウ、トリル、S&H、サイレン）を試し、それぞれの波形・レート・送り先を書き出そう。', '送り先「カットオフ」でLFOレートを0.1 Hzから30 Hzへ。どこで動きが音色に変わる？', '「歌手の」ビブラート：レート5.5 Hz、浅い深さ。8 Hz・深い設定と比べよう。', 'カットオフにS&H、高いレゾナンス、持続音で「70年代のコンピューター」を作ろう。', 'アフタータッチで弾く表情豊かなパッド用に、4行のモジュレーション・マトリクスを書こう。']
    },
    deep: {
      es: `<h3>Del LFO a la frecuencia de audio</h3>
<p>Si un LFO de vibrato sube por encima de ~20 Hz deja de percibirse como movimiento y aparecen <b>bandas laterales</b>: estás haciendo <b>FM</b>. Lo mismo con el trémolo, que se convierte en <b>AM</b>. Esta continuidad entre modulación lenta y síntesis es una de las ideas más poderosas: un mismo patch puede pasar de "vibrato" a "campana metálica" girando una perilla. Lo explotaremos en el módulo de FM.</p>
<h3>Sincronía al tempo: matemáticas útiles</h3>
<span class="formula">f_LFO (Hz) = BPM / 60 · (4 / división)      ej. 128 BPM, 1/8 → 128/60·2 = 4,27 Hz</span>
<p>Tresillo = ×1,5 la frecuencia del valor recto; puntillo = ×2/3.</p>
<h3>Aleatoriedad musical</h3>
<p>El ruido blanco como modulador es demasiado caótico; el S&amp;H da escalones; un S&amp;H con <b>slew</b> (suavizado) da curvas aleatorias suaves; los generadores de Buchla ("Source of Uncertainty") y Make Noise ("Wogglebug") ofrecen aleatoriedad "correlacionada" que suena más orgánica. Las cadenas de Markov y las "Turing Machines" (registro de desplazamiento con probabilidad de cambio) generan melodías que se repiten con variaciones: el punto justo entre orden y sorpresa.</p>`,
      en: `<h3>From LFO to audio rate</h3>
<p>If a vibrato LFO rises above ~20 Hz it stops being heard as movement and <b>sidebands</b> appear: you are doing <b>FM</b>. Likewise tremolo becomes <b>AM</b>. This continuity between slow modulation and synthesis is one of the most powerful ideas: the same patch can go from "vibrato" to "metallic bell" with one knob. We'll exploit it in the FM module.</p>
<h3>Tempo sync: useful maths</h3>
<span class="formula">f_LFO (Hz) = BPM / 60 · (4 / division)      e.g. 128 BPM, 1/8 → 128/60·2 = 4.27 Hz</span>
<p>Triplet = ×1.5 the straight value's frequency; dotted = ×2/3.</p>
<h3>Musical randomness</h3>
<p>White noise as a modulator is too chaotic; S&amp;H gives steps; S&amp;H with <b>slew</b> gives smooth random curves; Buchla's "Source of Uncertainty" and Make Noise's "Wogglebug" offer "correlated" randomness that sounds more organic. Markov chains and "Turing Machines" (shift registers with change probability) generate melodies that repeat with variations: the sweet spot between order and surprise.</p>`,
      de: `<h3>Vom LFO zur Audiorate</h3>
<p>Steigt ein Vibrato-LFO über ~20 Hz, hört man keine Bewegung mehr, sondern <b>Seitenbänder</b>: Das ist <b>FM</b>. Ebenso wird Tremolo zu <b>AM</b>. Dieser Übergang zwischen langsamer Modulation und Synthese ist eine der mächtigsten Ideen: Ein Patch kann mit einem Regler von „Vibrato" zu „metallischer Glocke" wechseln. Mehr im FM-Modul.</p>
<h3>Temposync: nützliche Mathematik</h3>
<span class="formula">f_LFO (Hz) = BPM / 60 · (4 / Teilung)      z. B. 128 BPM, 1/8 → 128/60·2 = 4,27 Hz</span>
<p>Triole = ×1,5 der geraden Frequenz; punktiert = ×2/3.</p>
<h3>Musikalischer Zufall</h3>
<p>Weißes Rauschen als Modulator ist zu chaotisch; S&amp;H liefert Stufen; S&amp;H mit <b>Slew</b> liefert weiche Zufallskurven; Buchlas „Source of Uncertainty" und Make Noises „Wogglebug" bieten „korrelierten" Zufall, der organischer klingt. Markov-Ketten und „Turing Machines" (Schieberegister mit Änderungswahrscheinlichkeit) erzeugen Melodien, die sich mit Variationen wiederholen.</p>`,
      ja: `<h3>LFOからオーディオレートへ</h3>
<p>ビブラートのLFOが約20 Hzを超えると、動きとしてではなく<b>側波帯</b>が聞こえ始めます。それは<b>FM</b>です。同様にトレモロは<b>AM</b>になります。遅い変調と合成のこの連続性は最も強力な発想の一つで、同じパッチがつまみ1つで「ビブラート」から「金属的なベル」へ変わります。FMのモジュールで活用します。</p>
<h3>テンポ同期：便利な計算</h3>
<span class="formula">f_LFO (Hz) = BPM / 60 · (4 / 分割)      例：128 BPM、1/8 → 128/60·2 = 4.27 Hz</span>
<p>3連符＝通常の1.5倍の周波数、付点＝2/3倍。</p>
<h3>音楽的なランダム性</h3>
<p>ホワイトノイズを変調源にすると混沌としすぎます。S&amp;Hは段差、<b>スルー</b>（平滑化）付きS&amp;Hは滑らかなランダム曲線、Buchlaの「Source of Uncertainty」やMake Noiseの「Wogglebug」はより有機的な「相関のある」ランダム性を提供します。マルコフ連鎖や「チューリング・マシン」（変化確率付きシフトレジスタ）は変化しながら繰り返すメロディを生み、秩序と驚きのちょうど中間を作ります。</p>`
    },
    read: ['Welsh\'s Synthesizer Cookbook — LFO y modulación', 'Curtis Roads — <i>Composing Electronic Music</i>', 'Manual del Oberheim Matrix-12 / Xpander (concepto de matriz)', 'Make Noise — manuales del 0-Coast y Maths (excelentes sobre CV)'],
    quiz: [
      { q: { es: 'Un LFO enviado a la amplitud produce…', en: 'An LFO sent to amplitude produces…', de: 'Ein LFO auf die Amplitude erzeugt…', ja: '振幅に送ったLFOは…' }, o: { es: ['Vibrato', 'Trémolo', 'Wah', 'Glide'], en: ['Vibrato', 'Tremolo', 'Wah', 'Glide'], de: ['Vibrato', 'Tremolo', 'Wah', 'Glide'], ja: ['ビブラート', 'トレモロ', 'ワウ', 'グライド'] }, c: 1, x: { es: 'Trémolo = variación periódica de volumen.', en: 'Tremolo = periodic volume variation.', de: 'Tremolo = periodische Lautstärkeänderung.', ja: 'トレモロ＝周期的な音量変化。' } },
      { q: { es: 'A 120 BPM, ¿qué frecuencia tiene un LFO a 1/4?', en: 'At 120 BPM, what is the frequency of a 1/4 LFO?', de: 'Welche Frequenz hat ein 1/4-LFO bei 120 BPM?', ja: '120 BPMで1/4のLFOの周波数は？' }, o: { es: ['1 Hz', '2 Hz', '4 Hz', '0,5 Hz'], en: ['1 Hz', '2 Hz', '4 Hz', '0.5 Hz'], de: ['1 Hz', '2 Hz', '4 Hz', '0,5 Hz'], ja: ['1 Hz', '2 Hz', '4 Hz', '0.5 Hz'] }, c: 1, x: { es: '120 negras por minuto = 2 por segundo.', en: '120 quarter notes per minute = 2 per second.', de: '120 Viertel pro Minute = 2 pro Sekunde.', ja: '1分に4分音符120個＝毎秒2個。' } },
      { q: { es: '¿Qué forma de LFO produce valores aleatorios escalonados?', en: 'Which LFO shape produces stepped random values?', de: 'Welche LFO-Form liefert gestufte Zufallswerte?', ja: '階段状のランダム値を生むLFO波形は？' }, o: { es: ['Senoidal', 'Sierra', 'Sample & hold', 'Triangular'], en: ['Sine', 'Saw', 'Sample & hold', 'Triangle'], de: ['Sinus', 'Säge', 'Sample & Hold', 'Dreieck'], ja: ['サイン', 'ノコギリ', 'サンプル＆ホールド', '三角'] }, c: 2, x: { es: 'S&H muestrea ruido y mantiene el valor hasta el próximo pulso.', en: 'S&H samples noise and holds the value until the next tick.', de: 'S&H tastet Rauschen ab und hält den Wert bis zum nächsten Takt.', ja: 'S&Hはノイズをサンプルし、次のクロックまで値を保持します。' } },
      { q: { es: 'Si un LFO de vibrato sube a 200 Hz, ¿qué técnica de síntesis aparece?', en: 'If a vibrato LFO rises to 200 Hz, which synthesis technique appears?', de: 'Steigt ein Vibrato-LFO auf 200 Hz, welche Technik entsteht?', ja: 'ビブラートのLFOを200 Hzに上げると現れる合成手法は？' }, o: { es: ['Granular', 'FM', 'Aditiva', 'Wavetable'], en: ['Granular', 'FM', 'Additive', 'Wavetable'], de: ['Granular', 'FM', 'Additiv', 'Wavetable'], ja: ['グラニュラー', 'FM', '加算', 'ウェーブテーブル'] }, c: 1, x: { es: 'Modular la frecuencia a tasa de audio genera bandas laterales: FM.', en: 'Audio-rate frequency modulation generates sidebands: FM.', de: 'Frequenzmodulation mit Audiorate erzeugt Seitenbänder: FM.', ja: 'オーディオレートの周波数変調は側波帯を生む：FM。' } },
      { q: { es: 'En una matriz, "Velocidad → Ataque (negativo)" hace que…', en: 'In a matrix, "Velocity → Attack (negative)" makes…', de: 'In einer Matrix bewirkt „Velocity → Attack (negativ)"…', ja: 'マトリクスで「ベロシティ→アタック（マイナス）」にすると…' }, o: { es: ['Tocar fuerte alargue el ataque', 'Tocar fuerte acorte el ataque', 'El ataque sea aleatorio', 'No cambie nada'], en: ['Hard playing lengthens the attack', 'Hard playing shortens the attack', 'The attack is random', 'Nothing changes'], de: ['Hartes Spiel verlängert den Attack', 'Hartes Spiel verkürzt den Attack', 'Der Attack ist zufällig', 'Nichts'], ja: ['強く弾くとアタックが長くなる', '強く弾くとアタックが短くなる', 'アタックがランダムになる', '何も変わらない'] }, c: 1, x: { es: 'Cantidad negativa: más velocidad, menos tiempo.', en: 'Negative amount: more velocity, less time.', de: 'Negative Menge: mehr Velocity, weniger Zeit.', ja: 'マイナス量：ベロシティが大きいほど時間が短くなります。' } }
    ]
  });

  /* ===================== 8. DISEÑO SUSTRACTIVO ===================== */
  M({
    id: 'design', lv: 2, lab: ['synth', 'match'],
    title: { es: 'Diseño sonoro sustractivo: recetas', en: 'Subtractive sound design: recipes', de: 'Subtraktives Sounddesign: Rezepte', ja: '減算式サウンドデザイン：レシピ集' },
    sum: { es: 'Método de trabajo y recetas paso a paso: bajos, leads, pads, cuerdas, metales, plucks, campanas y percusión sintética.', en: 'Workflow and step-by-step recipes: basses, leads, pads, strings, brass, plucks, bells and synthetic drums.', de: 'Arbeitsweise und Schritt-für-Schritt-Rezepte: Bässe, Leads, Pads, Streicher, Bläser, Plucks, Glocken und synthetische Drums.', ja: '作業手順とステップごとのレシピ：ベース、リード、パッド、ストリングス、ブラス、プラック、ベル、シンセ・ドラム。' },
    key: {
      es: ['Empezá siempre desde un patch <b>INIT</b>: sabés exactamente qué hace cada cambio.', 'Orden recomendado: <b>fuente → envolvente de amplitud → filtro y su envolvente → modulación → efectos</b>.', 'Escuchá referencias y descomponelas: ¿el brillo cambia? ¿la altura? ¿hay ruido en el ataque?', 'Probá cada sonido <b>en contexto</b> (con el resto de la mezcla), no solo.', 'El reto de igualación entrena el vínculo oído ↔ parámetro.'],
      en: ['Always start from an <b>INIT</b> patch: you know exactly what each change does.', 'Recommended order: <b>source → amp envelope → filter and its envelope → modulation → effects</b>.', 'Listen to references and break them down: does brightness change? pitch? is there noise in the attack?', 'Test every sound <b>in context</b> (with the rest of the mix), not solo.', 'The match challenge trains the ear ↔ parameter link.'],
      de: ['Starte immer bei einem <b>INIT</b>-Patch: Du weißt genau, was jede Änderung bewirkt.', 'Empfohlene Reihenfolge: <b>Quelle → Lautstärke-Hüllkurve → Filter und seine Hüllkurve → Modulation → Effekte</b>.', 'Referenzen anhören und zerlegen: Ändert sich die Helligkeit? Die Tonhöhe? Rauschen im Anschlag?', 'Jeden Klang <b>im Kontext</b> testen (mit dem Mix), nicht solo.', 'Die Nachbau-Challenge trainiert die Verbindung Ohr ↔ Parameter.'],
      ja: ['必ず<b>INIT</b>パッチから始めよう。各変更の効果が正確にわかる。', '推奨順序：<b>ソース→アンプ・エンベロープ→フィルターとそのエンベロープ→変調→エフェクト</b>。', 'リファレンスを聴いて分解しよう：明るさは変わる？音高は？アタックにノイズは？', '音は単独でなく<b>文脈の中で</b>（ミックスと一緒に）確認しよう。', '再現チャレンジは耳↔パラメーターの結びつきを鍛える。']
    },
    sec: [
      {
        h: { es: 'Método de trabajo', en: 'Workflow', de: 'Arbeitsweise', ja: '作業手順' },
        b: {
          es: `<ol><li><b>Definí el rol</b>: ¿bajo, lead, pad, textura, percusión? ¿Qué rango de frecuencias va a ocupar en la mezcla?</li><li><b>Fuente</b>: elegí ondas y afinación (octavas, quintas, desafinación). Un sonido "hueco" pide cuadrada; uno brillante, sierra.</li><li><b>Envolvente de amplitud</b>: define la articulación. Este paso solo ya identifica la familia de instrumento.</li><li><b>Filtro</b>: tipo, pendiente, corte; luego la <b>envolvente de filtro</b> para el movimiento de brillo; resonancia con criterio.</li><li><b>Modulación</b>: vibrato, PWM, LFO al filtro, velocidad.</li><li><b>Efectos</b>: chorus, delay, reverb, saturación. Son parte del sonido, no un parche.</li><li><b>Contexto</b>: probalo con la batería y el resto. Ajustá el ataque y el grave para que no choque.</li></ol>`,
          en: `<ol><li><b>Define the role</b>: bass, lead, pad, texture, percussion? Which frequency range will it occupy in the mix?</li><li><b>Source</b>: choose waves and tuning (octaves, fifths, detune). A "hollow" sound wants a square; a bright one, a saw.</li><li><b>Amp envelope</b>: defines articulation. This step alone already identifies the instrument family.</li><li><b>Filter</b>: type, slope, cutoff; then the <b>filter envelope</b> for brightness motion; resonance with care.</li><li><b>Modulation</b>: vibrato, PWM, LFO to filter, velocity.</li><li><b>Effects</b>: chorus, delay, reverb, saturation. They're part of the sound, not a patch-up.</li><li><b>Context</b>: test it with the drums and the rest. Adjust attack and low end so it doesn't clash.</li></ol>`,
          de: `<ol><li><b>Rolle festlegen</b>: Bass, Lead, Pad, Textur, Percussion? Welchen Frequenzbereich belegt er im Mix?</li><li><b>Quelle</b>: Wellen und Stimmung wählen (Oktaven, Quinten, Verstimmung). „Hohl" verlangt Rechteck, hell verlangt Säge.</li><li><b>Lautstärke-Hüllkurve</b>: bestimmt die Artikulation – allein dieser Schritt definiert schon die Instrumentenfamilie.</li><li><b>Filter</b>: Typ, Steilheit, Cutoff; dann die <b>Filterhüllkurve</b> für Helligkeitsbewegung; Resonanz mit Bedacht.</li><li><b>Modulation</b>: Vibrato, PWM, LFO aufs Filter, Velocity.</li><li><b>Effekte</b>: Chorus, Delay, Hall, Sättigung – Teil des Klangs, kein Flicken.</li><li><b>Kontext</b>: mit Drums und Rest testen. Attack und Bass anpassen, damit nichts kollidiert.</li></ol>`,
          ja: `<ol><li><b>役割を決める</b>：ベース、リード、パッド、テクスチャ、パーカッション？ミックスでどの帯域を占める？</li><li><b>ソース</b>：波形とチューニング（オクターブ、5度、デチューン）を選ぶ。「中空」なら矩形、明るいならノコギリ。</li><li><b>アンプ・エンベロープ</b>：アーティキュレーションを決める。これだけで楽器の種類がほぼ決まる。</li><li><b>フィルター</b>：タイプ、スロープ、カットオフ。次に明るさの動きのための<b>フィルター・エンベロープ</b>。レゾナンスは慎重に。</li><li><b>変調</b>：ビブラート、PWM、フィルターへのLFO、ベロシティ。</li><li><b>エフェクト</b>：コーラス、ディレイ、リバーブ、サチュレーション。つぎはぎではなく音の一部。</li><li><b>文脈</b>：ドラムや他のパートと合わせて確認。ぶつからないようアタックと低域を調整。</li></ol>`
        }
      },
      {
        h: { es: 'Recetas: bajos y leads', en: 'Recipes: basses and leads', de: 'Rezepte: Bässe und Leads', ja: 'レシピ：ベースとリード' },
        b: {
          es: `<table><tr><th>Sonido</th><th>Fuente</th><th>Filtro</th><th>Envolventes</th><th>Extras</th></tr>
<tr><td><b>Bajo Moog</b></td><td>2 sierras (o sierra+cuadrada) 1 oct abajo, sub</td><td>LP 24 dB, corte 150–300 Hz, res 2–4</td><td>Filtro: A 0, D 200–400 ms, S 10–30%. Amp: A 0, S 70%, R corto</td><td>mono, glide 30–60 ms</td></tr>
<tr><td><b>Acid (303)</b></td><td>1 sierra o cuadrada</td><td>LP 18–24 dB, res muy alta</td><td>Filtro: D 150–250 ms, S 0; amp casi órgano</td><td>legato + slide, accent = vel → env filtro, saturación</td></tr>
<tr><td><b>Reese</b></td><td>2 sierras desafinadas 15–30¢</td><td>LP 600–1200 Hz</td><td>Amp sostenido</td><td>LFO lento al corte, distorsión, sub aparte</td></tr>
<tr><td><b>Sub 808</b></td><td>senoidal</td><td>—</td><td>Amp D 0,5–2 s, envolvente de pitch −12 st en 30 ms</td><td>saturación suave para parlantes chicos</td></tr>
<tr><td><b>Lead clásico</b></td><td>sierra + cuadrada +5¢ o +1 oct</td><td>LP 12/24, corte 2–4 kHz</td><td>Amp A 5 ms, S 90%; filtro leve</td><td>vibrato con delay, glide, delay 1/8 punt.</td></tr>
<tr><td><b>Sync lead</b></td><td>osc2 sincronizado</td><td>LP abierto</td><td>Env → altura del esclavo</td><td>distorsión</td></tr></table>`,
          en: `<table><tr><th>Sound</th><th>Source</th><th>Filter</th><th>Envelopes</th><th>Extras</th></tr>
<tr><td><b>Moog bass</b></td><td>2 saws (or saw+square) 1 oct down, sub</td><td>LP 24 dB, cutoff 150–300 Hz, res 2–4</td><td>Filter: A 0, D 200–400 ms, S 10–30%. Amp: A 0, S 70%, short R</td><td>mono, glide 30–60 ms</td></tr>
<tr><td><b>Acid (303)</b></td><td>1 saw or square</td><td>LP 18–24 dB, very high res</td><td>Filter: D 150–250 ms, S 0; amp organ-like</td><td>legato + slide, accent = vel → filter env, saturation</td></tr>
<tr><td><b>Reese</b></td><td>2 saws detuned 15–30¢</td><td>LP 600–1200 Hz</td><td>Sustained amp</td><td>slow LFO to cutoff, distortion, separate sub</td></tr>
<tr><td><b>808 sub</b></td><td>sine</td><td>—</td><td>Amp D 0.5–2 s, pitch env −12 st in 30 ms</td><td>gentle saturation for small speakers</td></tr>
<tr><td><b>Classic lead</b></td><td>saw + square +5¢ or +1 oct</td><td>LP 12/24, cutoff 2–4 kHz</td><td>Amp A 5 ms, S 90%; light filter env</td><td>delayed vibrato, glide, dotted 1/8 delay</td></tr>
<tr><td><b>Sync lead</b></td><td>osc 2 synced</td><td>LP open</td><td>Env → slave pitch</td><td>distortion</td></tr></table>`,
          de: `<table><tr><th>Klang</th><th>Quelle</th><th>Filter</th><th>Hüllkurven</th><th>Extras</th></tr>
<tr><td><b>Moog-Bass</b></td><td>2 Sägen (oder Säge+Rechteck) 1 Okt tiefer, Sub</td><td>LP 24 dB, Cutoff 150–300 Hz, Res 2–4</td><td>Filter: A 0, D 200–400 ms, S 10–30 %. Amp: A 0, S 70 %, kurzes R</td><td>Mono, Glide 30–60 ms</td></tr>
<tr><td><b>Acid (303)</b></td><td>1 Säge oder Rechteck</td><td>LP 18–24 dB, sehr hohe Res</td><td>Filter: D 150–250 ms, S 0; Amp orgelartig</td><td>Legato + Slide, Accent = Vel → Filter-Hk, Sättigung</td></tr>
<tr><td><b>Reese</b></td><td>2 Sägen, 15–30¢ verstimmt</td><td>LP 600–1200 Hz</td><td>Amp gehalten</td><td>Langsamer LFO auf Cutoff, Verzerrung, separater Sub</td></tr>
<tr><td><b>808-Sub</b></td><td>Sinus</td><td>—</td><td>Amp D 0,5–2 s, Pitch-Hk −12 HT in 30 ms</td><td>sanfte Sättigung für kleine Lautsprecher</td></tr>
<tr><td><b>Klassischer Lead</b></td><td>Säge + Rechteck +5¢ oder +1 Okt</td><td>LP 12/24, Cutoff 2–4 kHz</td><td>Amp A 5 ms, S 90 %; leichte Filter-Hk</td><td>verzögertes Vibrato, Glide, punktiertes 1/8-Delay</td></tr>
<tr><td><b>Sync-Lead</b></td><td>Osz 2 gesynct</td><td>LP offen</td><td>Hk → Slave-Tonhöhe</td><td>Verzerrung</td></tr></table>`,
          ja: `<table><tr><th>音</th><th>ソース</th><th>フィルター</th><th>エンベロープ</th><th>その他</th></tr>
<tr><td><b>Moogベース</b></td><td>ノコギリ2本（またはノコギリ＋矩形）1 oct下、サブ</td><td>LP 24 dB、カットオフ150〜300 Hz、レゾ2〜4</td><td>フィルター：A 0、D 200〜400 ms、S 10〜30%。アンプ：A 0、S 70%、短いR</td><td>モノ、グライド30〜60 ms</td></tr>
<tr><td><b>アシッド（303）</b></td><td>ノコギリか矩形1本</td><td>LP 18〜24 dB、非常に高いレゾ</td><td>フィルター：D 150〜250 ms、S 0。アンプはオルガン的</td><td>レガート＋スライド、アクセント＝ベロシティ→フィルター・エンベ、歪み</td></tr>
<tr><td><b>リース</b></td><td>15〜30¢デチューンしたノコギリ2本</td><td>LP 600〜1200 Hz</td><td>アンプ持続</td><td>カットオフに遅いLFO、歪み、サブは別</td></tr>
<tr><td><b>808サブ</b></td><td>サイン</td><td>—</td><td>アンプD 0.5〜2秒、ピッチ・エンベ30 msで−12半音</td><td>小型スピーカー向けに軽い歪み</td></tr>
<tr><td><b>定番リード</b></td><td>ノコギリ＋矩形+5¢か+1 oct</td><td>LP 12/24、カットオフ2〜4 kHz</td><td>アンプA 5 ms、S 90%。軽いフィルター・エンベ</td><td>遅れて来るビブラート、グライド、付点8分ディレイ</td></tr>
<tr><td><b>シンク・リード</b></td><td>OSC2をシンク</td><td>LP全開</td><td>エンベ→スレーブのピッチ</td><td>歪み</td></tr></table>`
        }
      },
      {
        h: { es: 'Recetas: pads, cuerdas, metales, plucks y campanas', en: 'Recipes: pads, strings, brass, plucks and bells', de: 'Rezepte: Pads, Streicher, Bläser, Plucks und Glocken', ja: 'レシピ：パッド、ストリングス、ブラス、プラック、ベル' },
        b: {
          es: `<ul><li><b>Pad cálido</b>: 2 sierras ±7–12¢, LP 12 dB ~800 Hz, env de filtro lenta (A 1 s), amp A 1–2 s / R 2–3 s, LFO lento al corte, chorus + reverb larga.</li><li><b>Cuerdas analógicas (string machine)</b>: sierras o PWM, HP suave para quitar barro, LP alto (3 kHz), A 200–400 ms, vibrato leve, chorus/ensemble intenso.</li><li><b>Metales (brass)</b>: 2 sierras, LP 24 dB, <b>la envolvente de filtro con ataque 50–100 ms</b> es el secreto (el "bwaaa" que abre), sustain de filtro 50%, velocidad → env filtro.</li><li><b>Pluck</b>: sierra o pulso, LP cerrado con env de filtro muy rápida (D 100–300 ms, S 0), amp D 300–800 ms S 0, delay.</li><li><b>Campana sustractiva</b>: dos ondas en relación no entera (por ej. +2 oct +14¢, o una quinta desafinada), sin sustain, release largo; mejor aún con FM o ring mod.</li><li><b>Órgano</b>: senoidales en octavas (pies 16', 8', 4'), amp tipo compuerta, trémolo/leslie.</li></ul>`,
          en: `<ul><li><b>Warm pad</b>: 2 saws ±7–12¢, LP 12 dB ~800 Hz, slow filter env (A 1 s), amp A 1–2 s / R 2–3 s, slow LFO to cutoff, chorus + long reverb.</li><li><b>Analogue strings (string machine)</b>: saws or PWM, gentle HP to remove mud, high LP (3 kHz), A 200–400 ms, light vibrato, heavy chorus/ensemble.</li><li><b>Brass</b>: 2 saws, LP 24 dB, <b>a filter envelope with 50–100 ms attack</b> is the secret (the opening "bwaaa"), filter sustain 50%, velocity → filter env.</li><li><b>Pluck</b>: saw or pulse, closed LP with very fast filter env (D 100–300 ms, S 0), amp D 300–800 ms S 0, delay.</li><li><b>Subtractive bell</b>: two waves at a non-integer ratio (e.g. +2 oct +14¢, or a detuned fifth), no sustain, long release; even better with FM or ring mod.</li><li><b>Organ</b>: sines in octaves (16', 8', 4' footages), gate-like amp, tremolo/leslie.</li></ul>`,
          de: `<ul><li><b>Warmes Pad</b>: 2 Sägen ±7–12¢, LP 12 dB ~800 Hz, langsame Filter-Hk (A 1 s), Amp A 1–2 s / R 2–3 s, langsamer LFO auf Cutoff, Chorus + langer Hall.</li><li><b>Analoge Streicher (String Machine)</b>: Sägen oder PWM, sanfter HP gegen Matsch, hoher LP (3 kHz), A 200–400 ms, leichtes Vibrato, starker Chorus/Ensemble.</li><li><b>Bläser</b>: 2 Sägen, LP 24 dB, <b>Filterhüllkurve mit 50–100 ms Attack</b> ist das Geheimnis (das öffnende „Bwaaa"), Filter-Sustain 50 %, Velocity → Filter-Hk.</li><li><b>Pluck</b>: Säge oder Puls, geschlossener LP mit sehr schneller Filter-Hk (D 100–300 ms, S 0), Amp D 300–800 ms S 0, Delay.</li><li><b>Subtraktive Glocke</b>: zwei Wellen im nicht-ganzzahligen Verhältnis (z. B. +2 Okt +14¢), kein Sustain, langes Release; besser noch mit FM oder Ringmod.</li><li><b>Orgel</b>: Sinus in Oktaven (16', 8', 4'), Gate-artiger Amp, Tremolo/Leslie.</li></ul>`,
          ja: `<ul><li><b>暖かいパッド</b>：ノコギリ2本±7〜12¢、LP 12 dB約800 Hz、遅いフィルター・エンベ（A 1秒）、アンプA 1〜2秒／R 2〜3秒、カットオフに遅いLFO、コーラス＋長いリバーブ。</li><li><b>アナログ・ストリングス（ストリング・マシン）</b>：ノコギリかPWM、濁りを取る軽いHP、高めのLP（3 kHz）、A 200〜400 ms、軽いビブラート、強いコーラス／アンサンブル。</li><li><b>ブラス</b>：ノコギリ2本、LP 24 dB、<b>アタック50〜100 msのフィルター・エンベロープ</b>が秘訣（開いていく「ブワー」）、フィルターS 50%、ベロシティ→フィルター・エンベ。</li><li><b>プラック</b>：ノコギリかパルス、閉じたLPに非常に速いフィルター・エンベ（D 100〜300 ms、S 0）、アンプD 300〜800 ms S 0、ディレイ。</li><li><b>減算式ベル</b>：非整数比の2波形（例：+2 oct+14¢、デチューンした5度）、サステインなし、長いリリース。FMやリング変調ならさらに良い。</li><li><b>オルガン</b>：オクターブ重ねのサイン波（16'、8'、4'）、ゲート的なアンプ、トレモロ／レスリー。</li></ul>`
        }
      },
      {
        h: { es: 'Percusión sintética', en: 'Synthetic percussion', de: 'Synthetische Percussion', ja: 'シンセ・パーカッション' },
        b: {
          es: `<ul><li><b>Bombo (808/909)</b>: senoidal con envolvente de altura (150 → 50 Hz en 50–120 ms) + decay de amplitud 200–800 ms; un "click" de ruido o un pulso corto para el ataque.</li><li><b>Redoblante</b>: tono (180–250 Hz, triangular) con decay corto + ruido filtrado pasa altos/banda con decay 150–250 ms.</li><li><b>Hi-hat</b>: ruido (o 6 cuadradas inarmónicas como en la 808) por pasa altos ~7 kHz; cerrado = decay 30–60 ms, abierto = 300–600 ms.</li><li><b>Clap</b>: ráfagas de ruido por pasa banda (1–1,5 kHz) repetidas 3–4 veces en ~30 ms, luego una cola.</li><li><b>Tom / zap</b>: senoidal o triangular con envolvente de altura más lenta.</li></ul>
<div class="tip">El secuenciador del lab usa exactamente estas recetas para su batería.</div>`,
          en: `<ul><li><b>Kick (808/909)</b>: sine with pitch envelope (150 → 50 Hz in 50–120 ms) + amp decay 200–800 ms; a noise "click" or short pulse for the attack.</li><li><b>Snare</b>: tone (180–250 Hz, triangle) with short decay + high/band-passed noise with 150–250 ms decay.</li><li><b>Hi-hat</b>: noise (or 6 inharmonic squares as in the 808) through HP ~7 kHz; closed = 30–60 ms decay, open = 300–600 ms.</li><li><b>Clap</b>: band-passed noise bursts (1–1.5 kHz) repeated 3–4 times within ~30 ms, then a tail.</li><li><b>Tom / zap</b>: sine or triangle with a slower pitch envelope.</li></ul>
<div class="tip">The lab sequencer uses exactly these recipes for its drums.</div>`,
          de: `<ul><li><b>Kick (808/909)</b>: Sinus mit Tonhöhenhüllkurve (150 → 50 Hz in 50–120 ms) + Amp-Decay 200–800 ms; ein Rausch-„Klick" oder kurzer Puls für den Anschlag.</li><li><b>Snare</b>: Ton (180–250 Hz, Dreieck) mit kurzem Decay + hoch-/bandpassgefiltertes Rauschen mit 150–250 ms Decay.</li><li><b>Hi-Hat</b>: Rauschen (oder 6 unharmonische Rechtecke wie bei der 808) durch HP ~7 kHz; geschlossen = 30–60 ms, offen = 300–600 ms.</li><li><b>Clap</b>: bandpassgefilterte Rauschstöße (1–1,5 kHz), 3–4-mal innerhalb ~30 ms, dann Ausklang.</li><li><b>Tom / Zap</b>: Sinus oder Dreieck mit langsamerer Tonhöhenhüllkurve.</li></ul>
<div class="tip">Der Sequencer im Labor nutzt genau diese Rezepte.</div>`,
          ja: `<ul><li><b>キック（808/909）</b>：ピッチ・エンベロープ付きサイン波（50〜120 msで150→50 Hz）＋アンプ・ディケイ200〜800 ms。アタックにノイズの「クリック」か短いパルス。</li><li><b>スネア</b>：短いディケイのトーン（180〜250 Hz、三角）＋ディケイ150〜250 msのハイパス／バンドパス・ノイズ。</li><li><b>ハイハット</b>：ノイズ（または808のように6つの非調和な矩形波）を約7 kHzのHPに通す。クローズ＝ディケイ30〜60 ms、オープン＝300〜600 ms。</li><li><b>クラップ</b>：バンドパス（1〜1.5 kHz）したノイズのバーストを約30 ms内に3〜4回、その後テール。</li><li><b>タム／ザップ</b>：より遅いピッチ・エンベロープのサインか三角。</li></ul>
<div class="tip">ラボのシーケンサーはまさにこのレシピでドラムを鳴らしています。</div>`
        }
      }
    ],
    ex: {
      es: ['Partí de INIT en el sinte completo y recreá 4 recetas de las tablas sin mirar los presets. Luego compará con el preset equivalente.', 'Reto de igualación: lográ al menos 85% de similitud en 5 objetivos distintos. Anotá qué parámetro te cuesta más identificar.', 'Elegí un tema que te guste, aislá un sonido de synth y escribí su "receta" estimada (fuente, filtro, envolventes, efectos).', 'Diseñá un bajo y un lead que convivan: el bajo sin brillo por encima de 1 kHz, el lead sin energía por debajo de 300 Hz.', 'Hacé tres versiones de un mismo pad: oscuro, brillante y "evolutivo" (con LFO lento).'],
      en: ['Start from INIT in the full synth and recreate 4 table recipes without looking at presets. Then compare with the equivalent preset.', 'Match challenge: reach at least 85% similarity on 5 different targets. Note which parameter is hardest to identify.', 'Pick a track you like, isolate a synth sound and write its estimated "recipe" (source, filter, envelopes, effects).', 'Design a bass and a lead that coexist: bass with no brightness above 1 kHz, lead with no energy below 300 Hz.', 'Make three versions of one pad: dark, bright and "evolving" (with a slow LFO).'],
      de: ['Starte im Synth bei INIT und baue 4 Rezepte ohne Presets nach. Vergleiche danach mit dem entsprechenden Preset.', 'Nachbau-Challenge: mindestens 85 % Ähnlichkeit bei 5 Zielen. Welcher Parameter ist am schwersten zu erkennen?', 'Wähle einen Song, isoliere einen Synthklang und schreibe sein geschätztes „Rezept".', 'Gestalte Bass und Lead, die sich vertragen: Bass ohne Helligkeit über 1 kHz, Lead ohne Energie unter 300 Hz.', 'Drei Versionen eines Pads: dunkel, hell und „evolvierend" (mit langsamem LFO).'],
      ja: ['フルシンセでINITから始め、プリセットを見ずに表のレシピを4つ再現しよう。その後、対応するプリセットと比較。', '再現チャレンジ：5つの異なるターゲットで類似度85%以上を達成しよう。最も聞き分けにくいパラメーターをメモ。', '好きな曲を選び、シンセの音を1つ取り出して推定「レシピ」（ソース、フィルター、エンベロープ、エフェクト）を書こう。', '共存するベースとリードを作ろう：ベースは1 kHz以上に明るさを持たせず、リードは300 Hz以下にエネルギーを持たせない。', '同じパッドの3バージョンを作ろう：暗い、明るい、「進化する」（遅いLFO付き）。']
    },
    deep: {
      es: `<h3>Escucha analítica: cómo "leer" un sonido</h3>
<p>Ante un sonido de referencia, hacete estas preguntas en orden: (1) ¿tiene altura definida o es ruido? (2) ¿cómo es el ataque: instantáneo, con clic, con soplo, lento? (3) ¿el volumen se sostiene o decae? (4) ¿el <b>brillo</b> cambia en el tiempo? (si se oscurece mientras dura → envolvente de filtro) (5) ¿hay movimiento periódico? ¿a qué velocidad? ¿en altura, volumen o timbre? (6) ¿suena ancho/estéreo? (unísono, chorus) (7) ¿hay espacio? (reverb, delay) (8) ¿suena saturado?</p>
<h3>Capas (layering)</h3>
<p>Muchos sonidos "grandes" son capas con roles separados por frecuencia y tiempo: un <b>sub</b> limpio + un <b>cuerpo</b> medio con carácter + una capa de <b>aire/brillo</b> + un <b>transitorio</b> independiente para el ataque. Cada capa se diseña y filtra para no pisar a las otras (HP y LP complementarios).</p>
<h3>Gain staging y saturación</h3>
<p>La saturación antes del filtro (drive de entrada) produce armónicos que luego el filtro esculpe: suena "analógico" y gordo. Después del filtro, la saturación agrega armónicos por encima del corte: más agresivo. La resonancia alta + drive es la base del sonido acid moderno.</p>`,
      en: `<h3>Analytical listening: how to "read" a sound</h3>
<p>Facing a reference sound, ask in order: (1) does it have pitch or is it noise? (2) what is the attack: instant, clicky, breathy, slow? (3) does the level sustain or decay? (4) does <b>brightness</b> change over time? (darkens as it lasts → filter envelope) (5) is there periodic movement? at what rate? in pitch, level or timbre? (6) does it sound wide/stereo? (unison, chorus) (7) is there space? (reverb, delay) (8) does it sound saturated?</p>
<h3>Layering</h3>
<p>Many "big" sounds are layers with separate roles by frequency and time: a clean <b>sub</b> + a characterful mid <b>body</b> + an <b>air/brightness</b> layer + an independent <b>transient</b> for the attack. Each layer is designed and filtered not to step on the others (complementary HP and LP).</p>
<h3>Gain staging and saturation</h3>
<p>Saturation before the filter (input drive) creates harmonics that the filter then sculpts: sounds "analogue" and fat. After the filter, saturation adds harmonics above the cutoff: more aggressive. High resonance + drive is the basis of modern acid.</p>`,
      de: `<h3>Analytisches Hören: einen Klang „lesen"</h3>
<p>Fragen in dieser Reihenfolge: (1) Tonhöhe oder Rauschen? (2) Anschlag: sofort, klickend, hauchig, langsam? (3) Hält oder fällt der Pegel? (4) Ändert sich die <b>Helligkeit</b>? (dunkler werdend → Filterhüllkurve) (5) Periodische Bewegung? Wie schnell? In Tonhöhe, Pegel oder Klangfarbe? (6) Breit/stereo? (Unisono, Chorus) (7) Raum? (Hall, Delay) (8) Gesättigt?</p>
<h3>Layering</h3>
<p>Viele „große" Klänge sind Schichten mit getrennten Rollen nach Frequenz und Zeit: sauberer <b>Sub</b> + charaktervoller <b>Körper</b> in den Mitten + <b>Luft/Helligkeit</b> + eigener <b>Transient</b> für den Anschlag. Jede Schicht wird so gefiltert, dass sie die anderen nicht stört (komplementäre HP und LP).</p>
<h3>Gain-Staging und Sättigung</h3>
<p>Sättigung vor dem Filter erzeugt Obertöne, die das Filter formt: „analog" und fett. Danach fügt sie Obertöne über dem Cutoff hinzu: aggressiver. Hohe Resonanz + Drive ist die Basis modernen Acids.</p>`,
      ja: `<h3>分析的リスニング：音を「読む」方法</h3>
<p>参照音を前にしたら順に問おう：(1) 音高はある？ノイズ？ (2) アタックは：即時、クリック、息、遅い？ (3) 音量は持続？減衰？ (4) <b>明るさ</b>は時間で変わる？（鳴るほど暗くなる→フィルター・エンベロープ） (5) 周期的な動きは？速さは？音高・音量・音色のどれ？ (6) 広がり／ステレオ感は？（ユニゾン、コーラス） (7) 空間は？（リバーブ、ディレイ） (8) 歪んでいる？</p>
<h3>レイヤリング</h3>
<p>多くの「大きな」音は、周波数と時間で役割を分けたレイヤーです。クリーンな<b>サブ</b>＋個性ある中域の<b>ボディ</b>＋<b>空気感／明るさ</b>の層＋アタック用の独立した<b>トランジェント</b>。各層は互いを邪魔しないよう設計・フィルタリング（相補的なHPとLP）します。</p>
<h3>ゲインステージングとサチュレーション</h3>
<p>フィルター前の歪み（入力ドライブ）は倍音を作り、それをフィルターが削るので「アナログ的」で太い音になります。フィルター後の歪みはカットオフより上に倍音を加え、より攻撃的に。高いレゾナンス＋ドライブが現代のアシッドの基本です。</p>`
    },
    read: ['Fred Welsh — <i>Welsh\'s Synthesizer Cookbook</i> (recetas por instrumento — referencia central de este módulo)', 'Simon Cann — <i>Becoming a Synthesizer Wizard</i>', 'Rick Snoman — <i>Dance Music Manual</i>', 'Gordon Reid — serie "Synth Secrets" (Sound On Sound, 1999–2004, libre en línea)'],
    quiz: [
      { q: { es: '¿Cuál es el "secreto" de un metal (brass) sustractivo?', en: 'What is the "secret" of a subtractive brass sound?', de: 'Was ist das „Geheimnis" eines subtraktiven Bläserklangs?', ja: '減算式ブラスの「秘訣」は？' }, o: { es: ['Resonancia máxima', 'Envolvente de filtro con ataque de 50–100 ms', 'Ruido rosa', 'LFO cuadrado a la altura'], en: ['Maximum resonance', 'Filter envelope with 50–100 ms attack', 'Pink noise', 'Square LFO to pitch'], de: ['Maximale Resonanz', 'Filterhüllkurve mit 50–100 ms Attack', 'Rosa Rauschen', 'Rechteck-LFO auf Tonhöhe'], ja: ['最大レゾナンス', 'アタック50〜100 msのフィルター・エンベロープ', 'ピンクノイズ', 'ピッチに矩形LFO'] }, c: 1, x: { es: 'El brillo que "abre" al inicio caracteriza a los metales.', en: 'The brightness "opening" at the start characterises brass.', de: 'Die sich „öffnende" Helligkeit charakterisiert Blech.', ja: '冒頭で「開く」明るさがブラスの特徴です。' } },
      { q: { es: 'Un bombo sintético se basa en…', en: 'A synthetic kick is based on…', de: 'Eine synthetische Kick basiert auf…', ja: 'シンセのキックの基本は…' }, o: { es: ['Ruido blanco con HP', 'Senoidal con envolvente de altura descendente', 'Sierra con LFO', 'Cuadrada con PWM'], en: ['White noise with HP', 'Sine with a falling pitch envelope', 'Saw with LFO', 'Square with PWM'], de: ['Weißes Rauschen mit HP', 'Sinus mit fallender Tonhöhenhüllkurve', 'Säge mit LFO', 'Rechteck mit PWM'], ja: ['HPをかけたホワイトノイズ', '下降するピッチ・エンベロープ付きサイン波', 'LFO付きノコギリ', 'PWM付き矩形'] }, c: 1, x: { es: 'La caída rápida de altura da el golpe; el decay define el largo.', en: 'The fast pitch drop gives the thump; decay sets the length.', de: 'Der schnelle Tonhöhenabfall gibt den Schlag; Decay die Länge.', ja: '急なピッチ低下が打撃感を、ディケイが長さを決めます。' } },
      { q: { es: '¿Por qué se recomienda empezar desde INIT?', en: 'Why start from INIT?', de: 'Warum bei INIT beginnen?', ja: 'INITから始めるべき理由は？' }, o: { es: ['Suena mejor', 'Sabés el efecto exacto de cada cambio', 'Gasta menos CPU', 'Es obligatorio'], en: ['It sounds better', 'You know the exact effect of each change', 'It uses less CPU', 'It\'s mandatory'], de: ['Klingt besser', 'Man kennt die genaue Wirkung jeder Änderung', 'Weniger CPU', 'Pflicht'], ja: ['音が良い', '各変更の正確な効果がわかる', 'CPU負荷が低い', '必須だから'] }, c: 1, x: { es: 'Sin modulaciones ocultas, aprendés la relación causa-efecto.', en: 'With no hidden modulation you learn cause and effect.', de: 'Ohne versteckte Modulation lernt man Ursache und Wirkung.', ja: '隠れた変調がないので因果関係を学べます。' } },
      { q: { es: 'Saturar ANTES del filtro tiende a sonar…', en: 'Saturating BEFORE the filter tends to sound…', de: 'Sättigung VOR dem Filter klingt eher…', ja: 'フィルターの「前」で歪ませると…' }, o: { es: ['Más agresivo y chillón', 'Más gordo y "analógico", porque el filtro doma los armónicos nuevos', 'Igual que después', 'Sin cambios'], en: ['More aggressive and harsh', 'Fatter and "analogue", since the filter tames the new harmonics', 'Same as after', 'No change'], de: ['Aggressiver und schärfer', 'Fetter und „analoger", da das Filter die neuen Obertöne zähmt', 'Wie danach', 'Unverändert'], ja: ['より攻撃的で耳障り', 'フィルターが新しい倍音を抑えるので太く「アナログ的」', '後と同じ', '変化なし'] }, c: 1, x: { es: 'El filtro recorta los armónicos agudos generados por la saturación.', en: 'The filter trims the high harmonics created by saturation.', de: 'Das Filter beschneidet die hohen Obertöne der Sättigung.', ja: 'フィルターが歪みで生じた高次倍音を削ります。' } },
      { q: { es: 'Para un hi-hat cerrado, el decay típico es…', en: 'For a closed hi-hat, the typical decay is…', de: 'Typischer Decay einer geschlossenen Hi-Hat…', ja: 'クローズド・ハイハットの典型的なディケイは…' }, o: { es: ['30–60 ms', '300–600 ms', '2 s', '5 ms'], en: ['30–60 ms', '300–600 ms', '2 s', '5 ms'], de: ['30–60 ms', '300–600 ms', '2 s', '5 ms'], ja: ['30〜60 ms', '300〜600 ms', '2秒', '5 ms'] }, c: 0, x: { es: 'El abierto usa 300–600 ms.', en: 'Open uses 300–600 ms.', de: 'Offen: 300–600 ms.', ja: 'オープンは300〜600 msです。' } }
    ]
  });
})();
