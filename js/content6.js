/* v3 — Módulos nuevos derivados de Hewitt (How To Program Any Synthesizer), Cann (How To Make A Noise)
   y Friedman (Synthesizer Basics). Resumidos y explicados con palabras propias. */
(function () {
  const C = window.COURSE;
  const T = (es, en, de, ja) => ({ es, en, de, ja });
  const Q = (q, o, c, x) => ({ q, o, c, x });
  const after = (id, mod) => C.splice(C.findIndex(m => m.id === id) + 1, 0, mod);
  window.V3 = { T, Q, after };

  /* ===================== MÉTODO DE DISEÑO ===================== */
  after('welsh', {
    id: 'method', lv: 2, lab: ['match', 'synth', 'cookbook'],
    title: T('Método: escuchar, recrear y programar con propósito', 'Method: listen, recreate and program with a purpose', 'Methode: hören, nachbauen und zielgerichtet programmieren', 'メソッド：聴く、再現する、目的を持ってプログラムする'),
    sum: T('La forma de trabajar que comparten los cuatro libros: escucha activa, partir del patch neutro, recrear sonidos en cinco pasos, diseñar para un tema concreto y pensar en brillo y ataque.',
      'The way of working all four books share: active listening, starting from a neutral patch, recreating sounds in five steps, designing for a specific track and thinking in brightness and attack.',
      'Die Arbeitsweise, die alle vier Bücher teilen: aktives Hören, vom neutralen Patch ausgehen, Klänge in fünf Schritten nachbauen, für einen konkreten Track gestalten und in Helligkeit und Attack denken.',
      '4冊の本に共通する作業法：アクティブ・リスニング、ニュートラル・パッチからの出発、5ステップでの音の再現、特定の曲のための設計、そして明るさとアタックで考えること。'),
    key: {
      es: ['La habilidad más importante es la <b>escucha activa</b>: sin distracciones, con buena fuente y separando capas (Hewitt).', 'Empezá siempre desde un <b>patch neutro (init)</b>: una onda, filtro abierto, envolvente de órgano (Friedman, Hewitt).', 'Programá <b>con un propósito y en contexto</b>: con la parte sonando junto al resto del tema (Cann).', 'Describí el objetivo por sus "grupos alimenticios": <b>brillo</b> (4 niveles) y <b>ataque</b> (4 tipos) (Cann).', 'Dos etapas: llegar rápido a algo <b>aceptable</b> y después el ajuste fino; programar con los <b>oídos</b>, no con los ojos.'],
      en: ['The most important skill is <b>active listening</b>: no distractions, a good source, separating layers (Hewitt).', 'Always start from a <b>neutral (init) patch</b>: one wave, open filter, organ envelope (Friedman, Hewitt).', 'Program <b>with a purpose and in context</b>: with the part playing alongside the rest of the track (Cann).', 'Describe the goal by its "food groups": <b>brightness</b> (4 levels) and <b>attack</b> (4 types) (Cann).', 'Two stages: get quickly to something <b>acceptable</b>, then fine-tune; program with your <b>ears</b>, not your eyes.'],
      de: ['Die wichtigste Fähigkeit ist <b>aktives Hören</b>: ohne Ablenkung, gute Quelle, Schichten trennen (Hewitt).', 'Immer von einem <b>neutralen (Init-)Patch</b> ausgehen: eine Welle, offener Filter, Orgel-Hüllkurve (Friedman, Hewitt).', '<b>Zielgerichtet und im Kontext</b> programmieren: mit der Stimme im laufenden Track (Cann).', 'Das Ziel über seine „Nahrungsgruppen" beschreiben: <b>Helligkeit</b> (4 Stufen) und <b>Attack</b> (4 Typen) (Cann).', 'Zwei Phasen: schnell zu etwas <b>Brauchbarem</b>, dann Feinschliff; mit den <b>Ohren</b> programmieren, nicht mit den Augen.'],
      ja: ['最も重要なスキルは<b>アクティブ・リスニング</b>：気を散らさず、良い音源で、レイヤーを聴き分ける（ヒューイット）。', '必ず<b>ニュートラル（イニシャル）パッチ</b>から始める：波形1つ、フィルター全開、オルガン型エンベロープ（フリードマン、ヒューイット）。', '<b>目的を持って、文脈の中で</b>プログラムする：曲の他のパートと一緒に鳴らしながら（キャン）。', '目標を「食品群」で表す：<b>明るさ</b>（4段階）と<b>アタック</b>（4種類）（キャン）。', '2段階：まず素早く<b>使える</b>音に到達し、その後で細部を詰める。目ではなく<b>耳</b>でプログラムする。']
    },
    sec: [
      {
        h: T('Escucha activa', 'Active listening', 'Aktives Hören', 'アクティブ・リスニング'),
        b: T(`<p>Para Hewitt, escuchar de verdad es la habilidad central del productor y la base de la "ingeniería inversa" de cualquier sonido. Escuchar activamente es <b>no hacer otra cosa</b>: buenos auriculares o monitores, ojos cerrados y la mejor calidad de archivo posible.</p>
<p>Mientras escuchás, separá el tema en <b>capas</b> (bajo, batería, pads, lead, efectos) y en <b>secciones</b>. Notá cuándo cambia la textura o la "narrativa": qué entra, qué sale y qué se abre o se cierra.</p>
<p>Para cada capa hacete las preguntas del sintetista. ¿Es suave, amaderada o estridente (onda)? ¿Entra de golpe o de a poco (ataque)? ¿Se apaga sola (decay y sustain)? ¿Se oscurece dentro de la nota (envolvente de filtro)? ¿Tiene espacio alrededor (efectos)?</p>`,
          `<p>For Hewitt, truly listening is the producer's core skill and the basis for "reverse-engineering" any sound. Active listening means <b>doing nothing else</b>: good headphones or monitors, eyes closed, the best-quality file you can get.</p>
<p>As you listen, split the track into <b>layers</b> (bass, drums, pads, lead, effects) and <b>sections</b>. Notice when the texture or "narrative" changes: what comes in, what drops out, what opens or closes.</p>
<p>For each layer, ask the synthesist's questions. Is it soft, woody or strident (wave)? Does it start abruptly or gradually (attack)? Does it die away on its own (decay and sustain)? Does it darken within the note (filter envelope)? Is there space around it (effects)?</p>`,
          `<p>Für Hewitt ist echtes Zuhören die Kernkompetenz des Produzenten und die Grundlage, jeden Klang „zurückzuentwickeln". Aktiv hören heißt <b>nichts anderes tun</b>: gute Kopfhörer oder Monitore, Augen zu, die bestmögliche Dateiqualität.</p>
<p>Zerlege den Track beim Hören in <b>Schichten</b> (Bass, Drums, Pads, Lead, Effekte) und <b>Abschnitte</b>. Achte darauf, wann sich Textur oder „Erzählung" ändern: Was kommt dazu, was fällt weg, was öffnet oder schließt sich?</p>
<p>Stelle für jede Schicht die Fragen des Synthesisten. Ist sie weich, holzig oder schrill (Welle)? Setzt sie abrupt oder allmählich ein (Attack)? Verklingt sie von selbst (Decay und Sustain)? Wird sie innerhalb der Note dunkler (Filterhüllkurve)? Gibt es Raum um sie herum (Effekte)?</p>`,
          `<p>ヒューイットにとって、本当に聴くことはプロデューサーの核となるスキルであり、どんな音でも「リバース・エンジニアリング」する土台です。アクティブ・リスニングとは<b>他に何もしない</b>こと：良いヘッドホンかモニター、目を閉じ、手に入る最高音質のファイルで聴きます。</p>
<p>聴きながら曲を<b>レイヤー</b>（ベース、ドラム、パッド、リード、エフェクト）と<b>セクション</b>に分けます。テクスチャーや「物語」がいつ変わるかに注目しましょう。何が入り、何が抜け、何が開き、何が閉じるか。</p>
<p>各レイヤーにシンセシストの質問をします。柔らかいか、木質か、鋭いか（波形）？いきなり始まるか、徐々にか（アタック）？自然に消えるか（ディケイとサステイン）？音の中で暗くなるか（フィルター・エンベロープ）？周囲に空間があるか（エフェクト）？</p>`)
      },
      {
        h: T('El patch neutro', 'The neutral patch', 'Der neutrale Patch', 'ニュートラル・パッチ'),
        b: T(`<p>Friedman propone "poner el sinte en neutro" antes de cada ejercicio:</p>
<ol><li>Elegí el preset más simple, uno tipo órgano.</li><li>Poné el LFO en cero.</li><li>Apagá sync, cross-mod, chorus y portamento.</li><li>Dejá sonar un solo oscilador.</li><li>Poné la envolvente de volumen en A 0, D 0, S máximo y R 0.</li><li>Abrí el filtro del todo, con resonancia 0 y cantidad de envolvente al máximo.</li><li>Elegí una onda.</li></ol>
<p>Lo que queda es una onda desnuda. Hewitt dice lo mismo con otras palabras: guardá un <b>patch INIT</b> propio y empezá siempre desde ahí. Los presets suenan bien "de regalo" y por eso no enseñan.</p>
<p>Dos avisos prácticos de Friedman. En sintes con perillas, al cargar un patch <b>las perillas no muestran el valor real</b> hasta que las movés. Y si no guardás, perdés la edición al cambiar de patch; usá <i>edit/compare</i> para comparar antes y después.</p>`,
          `<p>Friedman suggests "putting the synth in neutral" before each exercise:</p>
<ol><li>Pick the simplest, organ-like preset.</li><li>Set the LFO to zero.</li><li>Switch off sync, cross-mod, chorus and portamento.</li><li>Let only one oscillator sound.</li><li>Set the volume envelope to A 0, D 0, S max, R 0.</li><li>Open the filter fully, with resonance 0 and envelope amount at max.</li><li>Choose a wave.</li></ol>
<p>What's left is a naked wave. Hewitt says the same in other words: save your own <b>INIT patch</b> and always start there. Presets sound good "for free", and that's exactly why they don't teach you anything.</p>
<p>Two practical warnings from Friedman. On knob-based synths, when you load a patch <b>the knobs don't show the real values</b> until you move them. And if you don't save, you lose the edit when you change patch; use <i>edit/compare</i> to hear before and after.</p>`,
          `<p>Friedman empfiehlt, den Synth vor jeder Übung „in den Leerlauf" zu bringen:</p>
<ol><li>Das einfachste, orgelartige Preset wählen.</li><li>Den LFO auf null stellen.</li><li>Sync, Cross-Mod, Chorus und Portamento ausschalten.</li><li>Nur einen Oszillator klingen lassen.</li><li>Die Lautstärkehüllkurve auf A 0, D 0, S max, R 0 stellen.</li><li>Den Filter ganz öffnen, mit Resonanz 0 und Hüllkurvenmenge auf max.</li><li>Eine Welle wählen.</li></ol>
<p>Übrig bleibt eine nackte Welle. Hewitt sagt dasselbe mit anderen Worten: Speichere einen eigenen <b>INIT-Patch</b> und beginne immer dort. Presets klingen „geschenkt" gut, und genau deshalb lehren sie nichts.</p>
<p>Zwei praktische Hinweise von Friedman. Bei Synths mit Reglern <b>zeigen die Regler nach dem Laden eines Patches nicht den echten Wert</b>, bis man sie bewegt. Und wer nicht speichert, verliert die Bearbeitung beim Patchwechsel; mit <i>Edit/Compare</i> kann man vorher und nachher vergleichen.</p>`,
          `<p>フリードマンは、各練習の前に「シンセをニュートラルにする」ことを勧めます。</p>
<ol><li>オルガンのような一番シンプルなプリセットを選ぶ。</li><li>LFOをゼロにする。</li><li>シンク、クロスモジュレーション、コーラス、ポルタメントを切る。</li><li>オシレーターを1つだけ鳴らす。</li><li>音量エンベロープをA 0、D 0、S最大、R 0にする。</li><li>フィルターを全開にし、レゾナンス0、エンベロープ量を最大にする。</li><li>波形を選ぶ。</li></ol>
<p>残るのは裸の波形です。ヒューイットも言い方を変えて同じことを述べています。自分の<b>INITパッチ</b>を保存し、常にそこから始めること。プリセットは「ただで」良く聞こえるからこそ、何も教えてくれません。</p>
<p>フリードマンからの実用的な注意が2つあります。ノブ式のシンセでは、パッチを読み込んでも<b>ノブを動かすまで実際の値を示しません</b>。また、保存しないとパッチを切り替えた時点で編集が失われます。<i>エディット／コンペア</i>で前後を比べましょう。</p>`)
      },
      {
        h: T('Recrear un sonido en cinco pasos', 'Recreating a sound in five steps', 'Einen Klang in fünf Schritten nachbauen', '5ステップで音を再現する'),
        b: T(`<ol><li><b>Onda</b>: compará el sonido con las cuatro básicas. Seno = suave, cuadrada = amaderada y hueca, sierra = estridente, triángulo = cuadrada contenida.</li>
<li><b>Envolvente de volumen</b>: si entra de golpe, el ataque es bajo. Si desaparece rápido aunque mantengas la tecla, sustain y release van bajos y el decay es la clave.</li>
<li><b>Envolvente de filtro</b>: si el brillo se apaga dentro de la nota, como en un piano, usá una envolvente de filtro.</li>
<li><b>Corte</b>: si es demasiado brillante, bajá el corte.</li>
<li><b>Efectos escondidos</b>: buscá delay o reverb "alrededor" de las notas.</li></ol>
<p>Pistas de Hewitt:</p>
<ul><li>Un <b>clic al final</b> de cada nota suele ser un release en cero: la onda se corta de golpe.</li>
<li>Para el <b>wobble de un sub-bajo</b>, el LFO va al <b>volumen</b>. Un seno no tiene armónicos que filtrar.</li></ul>
<p>Friedman agrega la mitad que se suele olvidar: copiar el timbre es solo la mitad del trabajo. La otra mitad es <b>tocar como ese instrumento</b>: bends y slides si es guitarra, voicings cerrados si son metales, y partes idiomáticas. "No sos tecladista: sos el instrumento que suena."</p>`,
          `<ol><li><b>Wave</b>: compare the sound with the four basics. Sine = soft, square = woody and hollow, saw = strident, triangle = a restrained square.</li>
<li><b>Volume envelope</b>: if it starts abruptly, the attack is low. If it vanishes quickly even while you hold the key, sustain and release are low and decay is the key.</li>
<li><b>Filter envelope</b>: if the brightness fades within the note, like a piano, use a filter envelope.</li>
<li><b>Cutoff</b>: if it's too bright, lower the cutoff.</li>
<li><b>Hidden effects</b>: listen for delay or reverb "around" the notes.</li></ol>
<p>Hewitt's hints:</p>
<ul><li>A <b>click at the end</b> of each note is usually release at zero: the wave is cut off abruptly.</li>
<li>For a <b>sub-bass wobble</b>, the LFO goes to <b>volume</b>. A sine has no harmonics to filter.</li></ul>
<p>Friedman adds the half people forget: copying the timbre is only half the job. The other half is <b>playing like that instrument</b>: bends and slides for guitar, close voicings for brass, idiomatic parts. "You're not a keyboard player: you're whatever instrument is sounding."</p>`,
          `<ol><li><b>Welle</b>: den Klang mit den vier Grundwellen vergleichen. Sinus = weich, Rechteck = holzig und hohl, Sägezahn = schrill, Dreieck = zurückhaltendes Rechteck.</li>
<li><b>Lautstärkehüllkurve</b>: Setzt er abrupt ein, ist der Attack niedrig. Verschwindet er schnell, obwohl man die Taste hält, sind Sustain und Release niedrig und der Decay ist der Schlüssel.</li>
<li><b>Filterhüllkurve</b>: Wenn die Helligkeit innerhalb der Note abnimmt, wie beim Klavier, eine Filterhüllkurve verwenden.</li>
<li><b>Cutoff</b>: Ist er zu hell, den Cutoff senken.</li>
<li><b>Versteckte Effekte</b>: auf Delay oder Hall „um" die Noten herum achten.</li></ol>
<p>Hewitts Hinweise:</p>
<ul><li>Ein <b>Klicken am Ende</b> jeder Note ist meist ein Release von null: Die Welle wird abrupt abgeschnitten.</li>
<li>Für das <b>Wobble eines Sub-Basses</b> geht der LFO auf die <b>Lautstärke</b>. Ein Sinus hat keine Obertöne zum Filtern.</li></ul>
<p>Friedman ergänzt die oft vergessene Hälfte: Die Klangfarbe zu kopieren ist nur die halbe Arbeit. Die andere Hälfte ist, <b>wie dieses Instrument zu spielen</b>: Bendings und Slides bei Gitarre, enge Voicings bei Blech, idiomatische Stimmen. „Du bist kein Keyboarder: Du bist das Instrument, das gerade klingt."</p>`,
          `<ol><li><b>波形</b>：音を4つの基本波形と比べる。サイン＝柔らかい、矩形＝木質で空洞的、ノコギリ＝鋭い、三角＝控えめな矩形。</li>
<li><b>音量エンベロープ</b>：いきなり始まるならアタックは短い。鍵盤を押していてもすぐ消えるなら、サステインとリリースは低く、ディケイが鍵になる。</li>
<li><b>フィルター・エンベロープ</b>：ピアノのように音の中で明るさが消えていくなら、フィルター・エンベロープを使う。</li>
<li><b>カットオフ</b>：明るすぎるならカットオフを下げる。</li>
<li><b>隠れたエフェクト</b>：音の「周り」にディレイやリバーブがないか聴く。</li></ol>
<p>ヒューイットのヒント：</p>
<ul><li>各音の<b>終わりのクリック</b>はたいていリリースがゼロ。波形が急に断ち切られている。</li>
<li><b>サブベースのウォブル</b>では、LFOは<b>音量</b>へ送る。サイン波にはフィルターで削る倍音がない。</li></ul>
<p>フリードマンは忘れられがちな半分を補います。音色をコピーするのは仕事の半分にすぎません。残りの半分は<b>その楽器のように弾く</b>こと：ギターならベンドとスライド、ブラスなら密集したボイシング、そしてその楽器らしいフレーズ。「君はキーボーディストではない。今鳴っている楽器そのものだ。」</p>`)
      },
      {
        h: T('Programar con un propósito', 'Programming with a purpose', 'Zielgerichtet programmieren', '目的を持ってプログラムする'),
        b: T(`<p>La tesis de Cann: diseñá el sonido <b>para un tema concreto</b> y escuchalo <b>con el resto de la mezcla</b>, con una parte MIDI sonando. Su primer ejemplo son tres patches "mediocres" por separado (bajo, arpegio y lead) que encajan perfecto juntos. Funcionan porque cada uno ocupa su zona: graves, agudos y medios.</p>
<p>Otras ideas del autor:</p>
<ul><li>No hay una <b>perilla mágica</b>. Cambiar el brillo puede requerir tocar la cantidad de envolvente del filtro y no el corte; todo patch es un equilibrio.</li>
<li><b>Simplicidad</b>: el mismo oscilador y el mismo filtro dan sonidos muy distintos con solo cambiar las envolventes.</li>
<li><b>Presets</b>: ahorran tiempo e inspiran, pero no se hicieron para tu tema. Los comerciales suelen venir ahogados en efectos y sin respuesta a la velocidad. Aun así, <b>mejor un buen preset que una mala programación propia</b>.</li>
<li>Critica el "experimentá y listo" cuando reemplaza aprender la herramienta. <b>Elegí un instrumento y dominalo</b> antes de comprar otro.</li>
<li>Probá tus sonidos en otro contexto: muchos bajos son excelentes stabs.</li></ul>`,
          `<p>Cann's thesis: design the sound <b>for a specific track</b> and listen to it <b>with the rest of the mix</b>, with a MIDI part playing. His first example is three "mediocre" patches on their own (bass, arpeggio and lead) that fit perfectly together. They work because each owns its zone: lows, highs and mids.</p>
<p>Other ideas from the author:</p>
<ul><li>There's no <b>magic knob</b>. Changing brightness may mean adjusting filter envelope amount rather than cutoff; every patch is a balance.</li>
<li><b>Simplicity</b>: the same oscillator and filter give very different sounds just by changing envelopes.</li>
<li><b>Presets</b> save time and inspire, but weren't made for your track. Commercial ones often come drenched in effects and don't respond to velocity. Even so, <b>a good preset beats your own bad programming</b>.</li>
<li>He criticises "just experiment" when it replaces learning the tool. <b>Pick one instrument and master it</b> before buying another.</li>
<li>Try your sounds in another context: many basses make great stabs.</li></ul>`,
          `<p>Canns These: Gestalte den Klang <b>für einen konkreten Track</b> und höre ihn <b>mit dem restlichen Mix</b>, während eine MIDI-Stimme läuft. Sein erstes Beispiel sind drei für sich „mittelmäßige" Patches (Bass, Arpeggio, Lead), die zusammen perfekt passen. Sie funktionieren, weil jeder seine Zone besetzt: Tiefen, Höhen und Mitten.</p>
<p>Weitere Ideen des Autors:</p>
<ul><li>Es gibt keinen <b>Zauberregler</b>. Mehr oder weniger Helligkeit kann bedeuten, die Filterhüllkurvenmenge statt des Cutoffs zu ändern; jeder Patch ist ein Gleichgewicht.</li>
<li><b>Einfachheit</b>: Derselbe Oszillator und Filter ergeben sehr verschiedene Klänge, nur durch andere Hüllkurven.</li>
<li><b>Presets</b> sparen Zeit und inspirieren, wurden aber nicht für deinen Track gemacht. Kommerzielle Bänke sind oft in Effekten ertränkt und reagieren nicht auf Velocity. Trotzdem gilt: <b>Ein gutes Preset schlägt schlechte eigene Programmierung</b>.</li>
<li>Er kritisiert „einfach experimentieren", wenn es das Lernen des Werkzeugs ersetzt. <b>Wähle ein Instrument und beherrsche es</b>, bevor du ein weiteres kaufst.</li>
<li>Probiere deine Klänge in anderem Kontext: Viele Bässe sind tolle Stabs.</li></ul>`,
          `<p>キャンの主張は、音を<b>特定の曲のために</b>設計し、MIDIパートを鳴らしながら<b>ミックス全体と一緒に</b>聴くことです。最初の例は、単体では「平凡」な3つのパッチ（ベース、アルペジオ、リード）が一緒だと完璧に噛み合うというもの。それぞれが自分の帯域、つまり低域・高域・中域を占めているから機能するのです。</p>
<p>著者のその他の考え：</p>
<ul><li><b>魔法のノブ</b>はない。明るさを変えるにはカットオフではなくフィルター・エンベロープ量を調整すべきこともある。どのパッチもバランスで成り立つ。</li>
<li><b>シンプルさ</b>：同じオシレーターとフィルターでも、エンベロープを変えるだけでまったく違う音になる。</li>
<li><b>プリセット</b>は時間を節約し刺激をくれるが、あなたの曲のために作られてはいない。市販バンクはエフェクト漬けでベロシティに反応しないことも多い。それでも<b>下手な自作より良いプリセットのほうがいい</b>。</li>
<li>道具を学ぶ代わりの「とにかく実験しろ」を彼は批判する。別の楽器を買う前に<b>1台を選んで極める</b>こと。</li>
<li>音を別の文脈でも試すこと。多くのベースは優れたスタブになる。</li></ul>`)
      },
      {
        h: T('Grupos alimenticios: brillo y ataque', 'Food groups: brightness and attack', 'Nahrungsgruppen: Helligkeit und Attack', '食品群：明るさとアタック'),
        b: T(`<p>Cann reduce casi cualquier sonido a dos rasgos. El <b>brillo</b> tiene cuatro niveles: muy brillante, brillante, opaco y muy opaco. El <b>ataque</b> tiene cuatro tipos: rápido percusivo (xilofón, púa), rápido no percusivo (órgano), medio y lento. Subdividir más no sirve. Después, cada cualidad se arma así:</p>
<table class="cm"><tr><th>Cualidad</th><th>Cómo lograrla</th></tr>
<tr><td>Brillo</td><td>Oscilador y filtro que se complementen. Una cuadrada con 12 dB; los 24/36 dB le roban el carácter.</td></tr>
<tr><td>Riqueza</td><td>Movimiento: osciladores levemente desafinados y un sub sutil, mejor que chorus a lo bestia.</td></tr>
<tr><td>Ataque</td><td>Envolvente rápida con decay corto. Además, la onda: la <b>cuadrada parece atacar antes que la sierra</b>, y lo brillante o distorsionado se percibe con más ataque.</td></tr>
<tr><td>Calidez</td><td>Ataque y release lentos, grosor por desafinación y un tono que cambia (otro oscilador con envolvente más lenta). También funciona por contraste: algo frío seguido de algo cálido.</td></tr>
<tr><td>Punch</td><td>Fuente gorda, ataque rápido y un filtro "pesado" modulado por la envolvente, con el brillo controlado.</td></tr></table>`,
          `<p>Cann boils almost any sound down to two traits. <b>Brightness</b> has four levels: very bright, bright, dull and very dull. <b>Attack</b> has four types: fast percussive (xylophone, plectrum), fast non-percussive (organ), medium and slow. Subdividing further doesn't help. Then each quality is built like this:</p>
<table class="cm"><tr><th>Quality</th><th>How to get it</th></tr>
<tr><td>Brightness</td><td>An oscillator and filter that complement each other. A square with 12 dB; 24/36 dB rob its character.</td></tr>
<tr><td>Richness</td><td>Movement: slightly detuned oscillators and a subtle sub, rather than chorus slapped on.</td></tr>
<tr><td>Attack</td><td>A fast envelope with a short decay. The wave matters too: <b>a square seems to attack sooner than a saw</b>, and bright or distorted sounds are perceived as having more attack.</td></tr>
<tr><td>Warmth</td><td>Slow attack and release, thickness from detuning and a changing tone (another oscillator with a slower envelope). Contrast works too: something cold followed by something warm.</td></tr>
<tr><td>Punch</td><td>A fat source, fast attack and a "heavy" filter modulated by the envelope, with brightness kept in check.</td></tr></table>`,
          `<p>Cann reduziert fast jeden Klang auf zwei Merkmale. Die <b>Helligkeit</b> hat vier Stufen: sehr hell, hell, dumpf und sehr dumpf. Der <b>Attack</b> hat vier Typen: schnell perkussiv (Xylofon, Plektrum), schnell nicht perkussiv (Orgel), mittel und langsam. Feiner zu unterteilen bringt nichts. Danach baut man jede Qualität so:</p>
<table class="cm"><tr><th>Qualität</th><th>So erreicht man sie</th></tr>
<tr><td>Helligkeit</td><td>Oszillator und Filter, die sich ergänzen. Ein Rechteck mit 12 dB; 24/36 dB rauben ihm den Charakter.</td></tr>
<tr><td>Fülle</td><td>Bewegung: leicht verstimmte Oszillatoren und ein dezenter Sub, statt Chorus draufzuklatschen.</td></tr>
<tr><td>Attack</td><td>Schnelle Hüllkurve mit kurzem Decay. Auch die Welle zählt: <b>Ein Rechteck wirkt früher als ein Sägezahn</b>, und helle oder verzerrte Klänge wirken attackreicher.</td></tr>
<tr><td>Wärme</td><td>Langsamer Attack und Release, Dicke durch Verstimmung und ein sich ändernder Ton (ein weiterer Oszillator mit langsamerer Hüllkurve). Auch Kontrast wirkt: etwas Kaltes, gefolgt von etwas Warmem.</td></tr>
<tr><td>Punch</td><td>Fette Quelle, schneller Attack und ein „schwerer" Filter, den die Hüllkurve moduliert, mit kontrollierter Helligkeit.</td></tr></table>`,
          `<p>キャンはほとんどの音を2つの特徴に還元します。<b>明るさ</b>は4段階：とても明るい、明るい、暗い、とても暗い。<b>アタック</b>は4種類：速く打楽器的（木琴、ピック）、速いが非打楽器的（オルガン）、中くらい、遅い。それ以上細かく分けても役に立ちません。そのうえで、各特性は次のように作ります。</p>
<table class="cm"><tr><th>特性</th><th>作り方</th></tr>
<tr><td>明るさ</td><td>互いを補い合うオシレーターとフィルター。矩形波なら12 dB。24/36 dBでは個性が失われる。</td></tr>
<tr><td>豊かさ</td><td>動き：わずかにデチューンしたオシレーターと控えめなサブ。コーラスを乱暴にかけるよりよい。</td></tr>
<tr><td>アタック</td><td>短いディケイを持つ速いエンベロープ。波形も重要で、<b>矩形波はノコギリ波より速く立ち上がるように聞こえ</b>、明るい音や歪んだ音ほどアタックが強く感じられる。</td></tr>
<tr><td>温かさ</td><td>遅いアタックとリリース、デチューンによる厚み、そして変化する音色（より遅いエンベロープの別オシレーター）。対比も効く：冷たい音のあとに温かい音。</td></tr>
<tr><td>パンチ</td><td>太い音源、速いアタック、エンベロープで動かす「重い」フィルター。明るさは抑えたまま。</td></tr></table>`)
      },
      {
        h: T('Jugabilidad y las dos envolventes', 'Playability and the two envelopes', 'Spielbarkeit und die zwei Hüllkurven', '演奏性と2つのエンベロープ'),
        b: T(`<p>Para Cann, la <b>jugabilidad</b> separa un sonido aficionado de uno profesional. Pensá quién lo va a tocar:</p>
<ul><li>Si es un <b>músico</b>: velocidad que cambie brillo y volumen, y una rueda y un pedal con recorrido útil.</li>
<li>Si es una <b>parte secuenciada</b>: controles pensados para automatizar, por ejemplo un filtro extra que casi no actúa salvo que lo muevas.</li></ul>
<p>Hewitt marca el error más típico del principiante: <b>la nota que suena dos veces</b>. Pasa cuando la envolvente de volumen sostiene alto pero la de filtro tiene sustain y release bajos: la nota se oscurece, "se apaga" y sigue sonando. Hay que imaginar las <b>dos envolventes a la vez</b>.</p>
<p>Friedman lo explica desde el otro lado: lo que la envolvente de filtro hace <b>fuera</b> del tiempo de la de volumen no se oye. Y si el volumen tiene release pero el filtro no, los armónicos caen de golpe al soltar.</p>`,
          `<p>For Cann, <b>playability</b> separates an amateur sound from a professional one. Think about who will play it:</p>
<ul><li>A <b>musician</b>: velocity that changes brightness and volume, plus a wheel and pedal with a useful range.</li>
<li>A <b>sequenced part</b>: controls designed for automation, such as an extra filter that barely acts unless you move it.</li></ul>
<p>Hewitt flags the classic beginner mistake: <b>the note that sounds twice</b>. It happens when the volume envelope sustains high but the filter envelope has low sustain and release: the note darkens, "goes out" and keeps sounding. You have to picture <b>both envelopes at once</b>.</p>
<p>Friedman explains it from the other side: whatever the filter envelope does <b>outside</b> the volume envelope's time is never heard. And if the volume has release but the filter doesn't, the harmonics drop out suddenly on key release.</p>`,
          `<p>Für Cann trennt die <b>Spielbarkeit</b> einen Amateurklang von einem professionellen. Überlege, wer ihn spielt:</p>
<ul><li>Ein <b>Musiker</b>: Velocity, die Helligkeit und Lautstärke ändert, dazu Modrad und Pedal mit nützlichem Regelweg.</li>
<li>Eine <b>sequenzierte Stimme</b>: Regler für Automation, etwa ein zusätzlicher Filter, der kaum wirkt, solange man ihn nicht bewegt.</li></ul>
<p>Hewitt nennt den typischen Anfängerfehler: <b>die Note, die zweimal klingt</b>. Er entsteht, wenn die Lautstärkehüllkurve hoch hält, die Filterhüllkurve aber niedriges Sustain und Release hat: Die Note wird dunkel, „geht aus" und klingt weiter. Man muss sich <b>beide Hüllkurven gleichzeitig</b> vorstellen.</p>
<p>Friedman erklärt es von der anderen Seite: Was die Filterhüllkurve <b>außerhalb</b> der Zeit der Lautstärkehüllkurve tut, hört man nie. Und hat die Lautstärke ein Release, der Filter aber nicht, fallen die Obertöne beim Loslassen schlagartig weg.</p>`,
          `<p>キャンにとって、<b>演奏性</b>がアマチュアの音とプロの音を分けます。誰が弾くかを考えましょう。</p>
<ul><li><b>演奏者</b>なら：明るさと音量を変えるベロシティ、使える可動域のホイールとペダル。</li>
<li><b>シーケンスされたパート</b>なら：オートメーション向けのコントロール。例えば動かさない限りほとんど効かない追加フィルター。</li></ul>
<p>ヒューイットは初心者の典型的なミスを指摘します。<b>2回鳴るように聞こえる音</b>です。音量エンベロープは高く保たれているのに、フィルター・エンベロープのサステインとリリースが低いと起こります。音が暗くなって「消えた」ようで、まだ鳴り続けるのです。<b>2つのエンベロープを同時に</b>思い描く必要があります。</p>
<p>フリードマンは反対側から説明します。フィルター・エンベロープが音量エンベロープの時間<b>外</b>でしていることは聞こえません。また、音量にリリースがあるのにフィルターにないと、鍵盤を離した瞬間に倍音が急に消えます。</p>`)
      }
    ],
    ex: {
      es: ['<b>Escucha activa</b>: elegí un tema que conozcas bien, auriculares y ojos cerrados. Listá todas las capas y, para cada una, adiviná onda, ataque, si el filtro se mueve y qué efectos tiene.', 'Lab Sinte: cargá INIT y llevalo al "neutro" de Friedman (S al máximo, filtro abierto, sin LFO). Desde ahí construí un bajo, un pad y un lead cambiando lo mínimo posible.', 'Lab "Igualá el sonido": aplicá los cinco pasos <b>en orden</b> y anotá en tus notas cuántos intentos necesitaste.', 'Grupos alimenticios: en el Lab Sinte armá cuatro sonidos que crucen muy brillante o muy opaco con ataque percusivo o lento. Después compará sierra y cuadrada con la misma envolvente: ¿cuál parece atacar antes?', 'Recetario de Welsh: elegí un patch sin mirar la ficha y describilo con los grupos de Cann (brillo y ataque) y con los cinco pasos de Hewitt. Después mirá la ficha y comprobá.', 'Error de las dos envolventes: en el Lab Sinte poné S de volumen 100% y la envolvente de filtro con S 0 y R corto. Escuchá cómo la nota "se apaga y sigue" y corregilo.'],
      en: ['<b>Active listening</b>: pick a track you know well, headphones on, eyes closed. List every layer and, for each one, guess the wave, the attack, whether the filter moves and what effects it has.', 'Synth lab: load INIT and bring it to Friedman\'s "neutral" (S at max, filter open, no LFO). From there build a bass, a pad and a lead changing as little as possible.', '"Match the sound" lab: apply the five steps <b>in order</b> and write down in your notes how many attempts you needed.', 'Food groups: in the Synth lab build four sounds crossing very bright or very dull with a percussive or slow attack. Then compare saw and square with the same envelope: which seems to attack sooner?', 'Welsh cookbook: pick a patch without looking at its sheet and describe it with Cann\'s food groups (brightness and attack) and Hewitt\'s five steps. Then look at the sheet and check.', 'Two-envelope mistake: in the Synth lab set volume S to 100% and the filter envelope to S 0 with a short R. Hear the note "go out and keep going", then fix it.'],
      de: ['<b>Aktives Hören</b>: Wähle einen gut bekannten Track, Kopfhörer, Augen zu. Liste alle Schichten auf und rate für jede die Welle, den Attack, ob sich der Filter bewegt und welche Effekte sie hat.', 'Synth-Labor: INIT laden und auf Friedmans „Leerlauf" bringen (S max, Filter offen, kein LFO). Von dort mit minimalen Änderungen einen Bass, ein Pad und einen Lead bauen.', 'Labor „Klang angleichen": die fünf Schritte <b>der Reihe nach</b> anwenden und in den Notizen festhalten, wie viele Versuche du gebraucht hast.', 'Nahrungsgruppen: Im Synth-Labor vier Klänge bauen, die sehr hell oder sehr dumpf mit perkussivem oder langsamem Attack kombinieren. Dann Sägezahn und Rechteck mit derselben Hüllkurve vergleichen: Welcher wirkt früher?', 'Welsh-Kochbuch: Einen Patch wählen, ohne aufs Blatt zu schauen, und ihn mit Canns Nahrungsgruppen (Helligkeit und Attack) und Hewitts fünf Schritten beschreiben. Dann das Blatt ansehen und prüfen.', 'Zwei-Hüllkurven-Fehler: Im Synth-Labor das Lautstärke-S auf 100 % und die Filterhüllkurve auf S 0 mit kurzem R stellen. Hören, wie die Note „ausgeht und weiterklingt", dann korrigieren.'],
      ja: ['<b>アクティブ・リスニング</b>：よく知っている曲を選び、ヘッドホンで目を閉じて聴く。すべてのレイヤーを書き出し、それぞれの波形、アタック、フィルターが動くかどうか、どんなエフェクトがあるかを推測する。', 'シンセ・ラボ：INITを読み込み、フリードマンの「ニュートラル」（S最大、フィルター全開、LFOなし）にする。そこから変更を最小限にしてベース、パッド、リードを作る。', '「音を合わせる」ラボ：5ステップを<b>順番どおりに</b>適用し、何回で合ったかをノートに記録する。', '食品群：シンセ・ラボで「とても明るい／とても暗い」×「打楽器的／遅いアタック」の4つの音を作る。次に同じエンベロープでノコギリ波と矩形波を比べ、どちらが速く立ち上がるように聞こえるか確かめる。', 'ウェルシュのレシピ集：シートを見ずにパッチを選び、キャンの食品群（明るさとアタック）とヒューイットの5ステップで説明する。その後シートを見て答え合わせをする。', '2つのエンベロープのミス：シンセ・ラボで音量のSを100%、フィルター・エンベロープをS 0と短いRにする。音が「消えたのに続く」のを聴いてから修正する。']
    },
    deep: {
      es: `<h3>Por qué funciona escuchar en contexto</h3>
<p>El oído agrupa frecuencias en <b>bandas críticas</b>. Cuando dos sonidos comparten banda, el más fuerte <b>enmascara</b> al otro. Por eso un pad que suena hermoso solo puede tapar la voz en la mezcla. Programar en contexto es, en el fondo, gestionar el enmascaramiento: brillo, ataque y zona de frecuencias decididos en función de lo que ya suena.</p>
<h3>Imaginar, calcular y probar</h3>
<p>Friedman cierra su libro con una fórmula útil: <b>imaginá</b> el sonido, <b>calculá</b> qué ajustes necesita y <b>andá a buscarlo</b>, combinando cálculo con intuición. La teoría de este curso sirve para el "calcular"; los labs y la escucha activa, para todo lo demás.</p>
<h3>Notación y registro</h3>
<p>Hewitt nombra las perillas como las <b>horas de un reloj</b>: 7 = mínimo, 12 = centro, 5 = máximo. Sirve para anotar patches de sintes sin números y para describir un ajuste a otra persona. Usá el cuaderno de cada módulo para registrar tus patches y tus hallazgos de escucha.</p>
<h3>Temas de referencia citados por Hewitt</h3>
<ul><li>Faithless, "Drifting Away": seno con reverb.</li><li>Three Drives, "Greece 2000": sierra con decay, envolvente de filtro y delay.</li><li>Mala, "Anti-War Dub": wobble de sub-bajo.</li><li>Moony, "Poundcake": cuadrada con un LP resonante muy modulado.</li></ul>
<p>Escuchalos con el método de cinco pasos.</p>`,
      en: `<h3>Why listening in context works</h3>
<p>The ear groups frequencies into <b>critical bands</b>. When two sounds share a band, the louder one <b>masks</b> the other. That's why a pad that sounds gorgeous alone can bury the vocal in the mix. Programming in context is, at heart, managing masking: brightness, attack and frequency zone chosen according to what's already playing.</p>
<h3>Imagine, calculate, try</h3>
<p>Friedman ends his book with a useful formula: <b>imagine</b> the sound, <b>calculate</b> which settings it needs and <b>go for it</b>, combining calculation with intuition. The theory in this course serves the "calculate" part; the labs and active listening serve everything else.</p>
<h3>Notation and record-keeping</h3>
<p>Hewitt names knob positions like the <b>hours on a clock</b>: 7 = minimum, 12 = centre, 5 = maximum. It's handy for noting patches on synths without numbers and for describing a setting to someone else. Use each module's notebook to log your patches and listening findings.</p>
<h3>Reference tracks cited by Hewitt</h3>
<ul><li>Faithless, "Drifting Away": sine with reverb.</li><li>Three Drives, "Greece 2000": saw with decay, filter envelope and delay.</li><li>Mala, "Anti-War Dub": sub-bass wobble.</li><li>Moony, "Poundcake": square through a heavily modulated resonant LP.</li></ul>
<p>Listen to them with the five-step method.</p>`,
      de: `<h3>Warum Hören im Kontext funktioniert</h3>
<p>Das Ohr fasst Frequenzen in <b>kritische Bänder</b> zusammen. Teilen sich zwei Klänge ein Band, <b>verdeckt</b> der lautere den anderen. Deshalb kann ein Pad, das allein wunderschön klingt, im Mix den Gesang begraben. Im Kontext zu programmieren heißt im Kern, Verdeckung zu steuern: Helligkeit, Attack und Frequenzbereich richten sich nach dem, was schon klingt.</p>
<h3>Vorstellen, berechnen, ausprobieren</h3>
<p>Friedman schließt sein Buch mit einer nützlichen Formel: den Klang <b>vorstellen</b>, <b>berechnen</b>, welche Einstellungen er braucht, und <b>losgehen</b>, wobei Rechnen und Intuition zusammenwirken. Die Theorie dieses Kurses dient dem „Berechnen"; die Labore und das aktive Hören allem anderen.</p>
<h3>Notation und Protokoll</h3>
<p>Hewitt benennt Reglerstellungen wie die <b>Stunden einer Uhr</b>: 7 = Minimum, 12 = Mitte, 5 = Maximum. Das hilft, Patches auf Synths ohne Zahlen zu notieren und jemand anderem eine Einstellung zu beschreiben. Nutze das Notizbuch jedes Moduls für deine Patches und Hörerkenntnisse.</p>
<h3>Von Hewitt genannte Referenztracks</h3>
<ul><li>Faithless, „Drifting Away": Sinus mit Hall.</li><li>Three Drives, „Greece 2000": Sägezahn mit Decay, Filterhüllkurve und Delay.</li><li>Mala, „Anti-War Dub": Sub-Bass-Wobble.</li><li>Moony, „Poundcake": Rechteck durch einen stark modulierten resonanten Tiefpass.</li></ul>
<p>Höre sie mit der Fünf-Schritte-Methode.</p>`,
      ja: `<h3>文脈の中で聴くとうまくいく理由</h3>
<p>耳は周波数を<b>臨界帯域</b>にまとめて捉えます。2つの音が同じ帯域を共有すると、大きいほうがもう一方を<b>マスキング</b>します。単体では美しいパッドがミックスの中ではボーカルを埋もれさせることがあるのはそのためです。文脈の中でプログラムするとは、本質的にはマスキングを管理することです。明るさ、アタック、周波数帯を、すでに鳴っている音に応じて決めます。</p>
<h3>想像し、計算し、試す</h3>
<p>フリードマンは本の最後に役立つ公式を示しています。音を<b>想像</b>し、必要な設定を<b>計算</b>し、そして<b>取りに行く</b>。計算と直感を組み合わせることです。このコースの理論は「計算」の部分に、ラボとアクティブ・リスニングはそれ以外のすべてに役立ちます。</p>
<h3>表記と記録</h3>
<p>ヒューイットはノブの位置を<b>時計の時刻</b>で呼びます。7時＝最小、12時＝中央、5時＝最大。数値のないシンセでパッチを記録したり、設定を人に伝えたりするのに便利です。各モジュールのノートにパッチと聴き取りの発見を記録しましょう。</p>
<h3>ヒューイットが挙げる参考曲</h3>
<ul><li>Faithless「Drifting Away」：サイン波＋リバーブ。</li><li>Three Drives「Greece 2000」：ディケイのあるノコギリ波、フィルター・エンベロープ、ディレイ。</li><li>Mala「Anti-War Dub」：サブベースのウォブル。</li><li>Moony「Poundcake」：強く変調したレゾナンス付きLPを通した矩形波。</li></ul>
<p>5ステップの方法で聴いてみましょう。</p>`
    },
    read: ['Ashley Hewitt — <i>How To Program Any Synthesizer</i>', 'Simon Cann — <i>How To Make A Noise</i>', 'Dean Friedman — <i>Synthesizer Basics</i>', 'Bob Katz — <i>Mastering Audio</i> (escucha crítica)'],
    quiz: [
      Q(T('Según Hewitt, ¿cuál es la habilidad más importante del productor?', 'According to Hewitt, what is the producer\'s most important skill?', 'Was ist laut Hewitt die wichtigste Fähigkeit eines Produzenten?', 'ヒューイットによれば、プロデューサーにとって最も重要なスキルは？'),
        T(['Tocar rápido', 'La escucha activa', 'Saber matemática', 'Tener muchos sintes'], ['Playing fast', 'Active listening', 'Knowing maths', 'Owning many synths'], ['Schnell spielen', 'Aktives Hören', 'Mathe können', 'Viele Synths besitzen'], ['速く弾くこと', 'アクティブ・リスニング', '数学の知識', 'シンセをたくさん持つこと']), 1,
        T('Escuchar sin distracciones y separando capas es la base de la ingeniería inversa del sonido.', 'Listening without distractions and separating layers is the basis of sound reverse-engineering.', 'Ablenkungsfreies Hören mit Trennung der Schichten ist die Basis des Klang-Reverse-Engineerings.', '気を散らさずにレイヤーを聴き分けることが、音のリバース・エンジニアリングの土台。')),
      Q(T('En el "neutro" de Friedman, ¿cómo queda la ADSR de volumen?', 'In Friedman\'s "neutral", how is the volume ADSR set?', 'Wie steht im Friedman-„Leerlauf" die Lautstärke-ADSR?', 'フリードマンの「ニュートラル」では音量ADSRはどうなる？'),
        T(['A 0, D 0, S máx., R 0', 'A máx., D máx., S 0, R máx.', 'Todo a la mitad', 'A 0, D 5, S 0, R 5'], ['A 0, D 0, S max, R 0', 'A max, D max, S 0, R max', 'Everything halfway', 'A 0, D 5, S 0, R 5'], ['A 0, D 0, S max, R 0', 'A max, D max, S 0, R max', 'Alles auf halb', 'A 0, D 5, S 0, R 5'], ['A 0、D 0、S最大、R 0', 'A最大、D最大、S 0、R最大', 'すべて半分', 'A 0、D 5、S 0、R 5']), 0,
        T('Una envolvente de órgano: la onda suena tal cual mientras apretás la tecla.', 'An organ envelope: the wave sounds as-is while you hold the key.', 'Eine Orgelhüllkurve: Die Welle klingt unverändert, solange die Taste gehalten wird.', 'オルガン型エンベロープ：鍵盤を押している間、波形がそのまま鳴る。')),
      Q(T('Oís un clic al final de cada nota. ¿Causa más probable?', 'You hear a click at the end of every note. Most likely cause?', 'Am Ende jeder Note klickt es. Wahrscheinlichste Ursache?', '各音の終わりにクリックが聞こえる。最も可能性の高い原因は？'),
        T(['Release en cero', 'Demasiada resonancia', 'Un LFO rápido', 'Corte demasiado bajo'], ['Release at zero', 'Too much resonance', 'A fast LFO', 'Cutoff too low'], ['Release auf null', 'Zu viel Resonanz', 'Ein schneller LFO', 'Cutoff zu niedrig'], ['リリースがゼロ', 'レゾナンスが強すぎる', '速いLFO', 'カットオフが低すぎる']), 0,
        T('La onda se corta de golpe; un poco de release lo suaviza.', 'The wave is cut off abruptly; a little release smooths it.', 'Die Welle wird abrupt abgeschnitten; etwas Release glättet das.', '波形が急に切れている。少しリリースを足せば滑らかになる。')),
      Q(T('Querés un wobble en un sub-bajo de seno. ¿A dónde mandás el LFO?', 'You want a wobble on a sine sub-bass. Where do you send the LFO?', 'Du willst ein Wobble auf einem Sinus-Sub-Bass. Wohin schickst du den LFO?', 'サイン波のサブベースにウォブルを付けたい。LFOの送り先は？'),
        T(['Al corte del filtro', 'Al volumen', 'A la resonancia', 'Al paneo'], ['Filter cutoff', 'Volume', 'Resonance', 'Pan'], ['Filter-Cutoff', 'Lautstärke', 'Resonanz', 'Panorama'], ['フィルターのカットオフ', '音量', 'レゾナンス', 'パン']), 1,
        T('Un seno no tiene armónicos que el filtro pueda quitar; hay que mover el volumen.', 'A sine has no harmonics for the filter to remove; you have to move the volume.', 'Ein Sinus hat keine Obertöne, die der Filter entfernen könnte; man muss die Lautstärke bewegen.', 'サイン波にはフィルターで削れる倍音がない。音量を動かす必要がある。')),
      Q(T('Según Cann, con la misma envolvente, ¿qué onda parece atacar antes?', 'According to Cann, with the same envelope, which wave seems to attack sooner?', 'Welche Welle wirkt laut Cann bei gleicher Hüllkurve schneller?', 'キャンによれば、同じエンベロープでより速く立ち上がるように聞こえる波形は？'),
        T(['Sierra', 'Cuadrada', 'Seno', 'Triángulo'], ['Saw', 'Square', 'Sine', 'Triangle'], ['Sägezahn', 'Rechteck', 'Sinus', 'Dreieck'], ['ノコギリ波', '矩形波', 'サイン波', '三角波']), 1,
        T('La percepción del ataque depende también de la onda; lo brillante o distorsionado se percibe más rápido.', 'Perceived attack also depends on the wave; bright or distorted sounds feel faster.', 'Der wahrgenommene Attack hängt auch von der Welle ab; Helles oder Verzerrtes wirkt schneller.', '知覚されるアタックは波形にも左右される。明るい音や歪んだ音ほど速く感じる。')),
      Q(T('¿Qué conviene si un buen preset compite con tu propia programación mediocre?', 'What should you do if a good preset competes with your own mediocre programming?', 'Was tun, wenn ein gutes Preset mit deiner mittelmäßigen Programmierung konkurriert?', '良いプリセットと自分の平凡なプログラミングが競合したら？'),
        T(['Programar el tuyo igual', 'Usar el buen preset', 'Agregar más efectos', 'Usar los dos al 50%'], ['Program your own anyway', 'Use the good preset', 'Add more effects', 'Use both at 50%'], ['Trotzdem selbst programmieren', 'Das gute Preset nehmen', 'Mehr Effekte hinzufügen', 'Beide zu 50 % nutzen'], ['それでも自作する', '良いプリセットを使う', 'エフェクトを増やす', '両方を50%ずつ使う']), 1,
        T('Para Cann, el diseño de sonido nunca debe ir en contra de la música.', 'For Cann, sound design should never get in the way of the music.', 'Für Cann darf Sounddesign nie der Musik im Weg stehen.', 'キャンにとって、サウンドデザインが音楽の邪魔をしてはならない。'))
    ]
  });

  /* ===================== FM EN LA PRÁCTICA ===================== */
  after('fm', {
    id: 'fm2', lv: 3, lab: ['fmcm', 'fm'],
    title: T('FM en la práctica: relaciones C:M, algoritmos y recetas', 'FM in practice: C:M ratios, algorithms and recipes', 'FM in der Praxis: C:M-Verhältnisse, Algorithmen und Rezepte', '実践FM：C:M比、アルゴリズム、レシピ'),
    sum: T('Qué suena con cada relación portadora:modulador, cómo se combinan los operadores, qué envolventes dan vida a la FM y cómo se arman la campana DX, los metales, el piano eléctrico y el bajo.',
      'What each carrier:modulator ratio sounds like, how operators combine, which envelopes bring FM to life, and how the DX bell, brass, electric piano and bass are built.',
      'Wie jedes Träger:Modulator-Verhältnis klingt, wie sich Operatoren kombinieren, welche Hüllkurven FM lebendig machen und wie DX-Glocke, Blech, E-Piano und Bass gebaut werden.',
      'キャリア：モジュレーター比ごとの音、オペレーターの組み合わせ方、FMに命を吹き込むエンベロープ、DXベル、ブラス、エレピ、ベースの作り方。'),
    key: {
      es: ['El timbre FM depende de la <b>relación C:M</b> y del <b>índice</b> (nivel del modulador); la magia está en cómo cambian en el tiempo.', 'Modulador <b>debajo</b> de la portadora = más grave y oscuro (bajos). <b>Arriba</b> = más brillante. Relaciones <b>no enteras</b> = metal y campanas.', 'Si el modulador está a <b>menos del doble</b> de la portadora, define la altura percibida: tu patch puede sonar en otra nota.', 'Cuatro arquitecturas: simple, portadoras paralelas, moduladores paralelos y cascada.', 'Envolventes por operador: decay rápido = transitorio; <b>hold</b> = impacto; modulador <b>apenas más lento</b> = "spit" de metales; <b>key scaling</b> para todo el teclado.'],
      en: ['FM timbre depends on the <b>C:M ratio</b> and the <b>index</b> (modulator level); the magic lies in how they change over time.', 'Modulator <b>below</b> the carrier = lower and darker (basses). <b>Above</b> = brighter. <b>Non-integer</b> ratios = metal and bells.', 'If the modulator is <b>below twice</b> the carrier, it sets the perceived pitch: your patch may play in another key.', 'Four architectures: simple, parallel carriers, parallel modulators and cascade.', 'Per-operator envelopes: fast decay = transient; <b>hold</b> = impact; a <b>slightly slower</b> modulator = brass "spit"; <b>key scaling</b> for the whole keyboard.'],
      de: ['Der FM-Klang hängt vom <b>C:M-Verhältnis</b> und vom <b>Index</b> (Modulatorpegel) ab; die Magie liegt darin, wie sie sich zeitlich ändern.', 'Modulator <b>unter</b> dem Träger = tiefer und dunkler (Bässe). <b>Darüber</b> = heller. <b>Nicht ganzzahlige</b> Verhältnisse = Metall und Glocken.', 'Liegt der Modulator <b>unter dem Doppelten</b> des Trägers, bestimmt er die wahrgenommene Tonhöhe: Dein Patch kann in einer anderen Tonart klingen.', 'Vier Architekturen: einfach, parallele Träger, parallele Modulatoren und Kaskade.', 'Hüllkurven pro Operator: schneller Decay = Transiente; <b>Hold</b> = Wucht; ein <b>etwas langsamerer</b> Modulator = Blech-„Spit"; <b>Key Scaling</b> für die ganze Tastatur.'],
      ja: ['FMの音色は<b>C:M比</b>と<b>インデックス</b>（モジュレーターのレベル）で決まる。魔法はそれらが時間とともにどう変わるかにある。', 'モジュレーターがキャリアより<b>下</b>＝低く暗い（ベース）。<b>上</b>＝明るい。<b>非整数比</b>＝金属音とベル。', 'モジュレーターがキャリアの<b>2倍未満</b>なら、知覚される音高を決める。パッチが別の音に聞こえることがある。', '4つの構成：シンプル、並列キャリア、並列モジュレーター、カスケード。', 'オペレーターごとのエンベロープ：速いディケイ＝トランジェント、<b>ホールド</b>＝インパクト、<b>わずかに遅い</b>モジュレーター＝ブラスの「スピット」、鍵盤全体のための<b>キー・スケーリング</b>。']
    },
    sec: [
      {
        h: T('Operadores, algoritmos y el DX7', 'Operators, algorithms and the DX7', 'Operatoren, Algorithmen und der DX7', 'オペレーター、アルゴリズム、DX7'),
        b: T(`<p>Friedman resume la idea de John Chowning (Stanford, años 70): un seno en rango audible modula la frecuencia de otro y aparecen <b>bandas laterales</b> alrededor de la portadora. El vibrato de un LFO también es FM, pero sus bandas quedan fuera de lo audible.</p>
<p>El <b>Yamaha DX7</b> (1983) tiene 6 <b>operadores</b> sinusoidales ordenados en <b>algoritmos</b>:</p>
<ul><li>La <b>portadora</b> es siempre la última de la cadena: es la que se oye.</li>
<li>Los algoritmos con varias portadoras mezclan FM y síntesis aditiva.</li>
<li>Cada operador tiene su <b>envolvente de 8 etapas</b> (4 tiempos y 4 niveles). En un modulador, esa envolvente es en realidad una <b>envolvente de armónicos</b>.</li>
<li>Un operador por algoritmo admite <b>feedback</b> ("entre resonancia y ruido").</li>
<li>El <b>escalado de tiempos y niveles por tecla</b> adapta el sonido a cada zona del teclado.</li></ul>
<p>Su veredicto: la FM suena natural, limpia y casi transparente (piano eléctrico, metales, maderas, percusión). El analógico suena crudo, potente y cálido. "Tené uno de cada y conectalos por MIDI."</p>
<p>El <b>Casio CZ-101</b> logra algo parecido con <i>phase distortion</i>: una forma de onda controlada digitalmente (DCW) deforma la fase de una onda. Es más fácil de programar y se parece más a un analógico.</p>`,
          `<p>Friedman sums up John Chowning's idea (Stanford, 1970s): one sine in the audio range modulates another's frequency, and <b>sidebands</b> appear around the carrier. An LFO's vibrato is FM too, but its sidebands fall outside hearing.</p>
<p>The <b>Yamaha DX7</b> (1983) has 6 sine <b>operators</b> arranged in <b>algorithms</b>:</p>
<ul><li>The <b>carrier</b> is always last in the chain: it's the one you hear.</li>
<li>Algorithms with several carriers mix FM and additive synthesis.</li>
<li>Each operator has its own <b>8-stage envelope</b> (4 rates and 4 levels). On a modulator, that envelope is really a <b>harmonic envelope</b>.</li>
<li>One operator per algorithm allows <b>feedback</b> ("between resonance and noise").</li>
<li><b>Keyboard rate and level scaling</b> adapt the sound to each part of the keyboard.</li></ul>
<p>His verdict: FM sounds natural, clean, almost transparent (electric piano, brass, woodwinds, percussion). Analogue sounds raw, powerful and warm. "Get one of each and connect them via MIDI."</p>
<p>The <b>Casio CZ-101</b> achieves something similar with <i>phase distortion</i>: a digitally controlled waveform (DCW) warps the phase of a wave. It's easier to program and closer to an analogue synth.</p>`,
          `<p>Friedman fasst die Idee von John Chowning (Stanford, 1970er) zusammen: Ein hörbarer Sinus moduliert die Frequenz eines anderen, und um den Träger entstehen <b>Seitenbänder</b>. Auch das LFO-Vibrato ist FM, nur liegen seine Seitenbänder außerhalb des Hörbaren.</p>
<p>Der <b>Yamaha DX7</b> (1983) hat 6 Sinus-<b>Operatoren</b>, angeordnet in <b>Algorithmen</b>:</p>
<ul><li>Der <b>Träger</b> ist immer der letzte der Kette: Er ist zu hören.</li>
<li>Algorithmen mit mehreren Trägern verbinden FM und additive Synthese.</li>
<li>Jeder Operator hat seine <b>8-stufige Hüllkurve</b> (4 Raten und 4 Pegel). Bei einem Modulator ist sie in Wahrheit eine <b>Obertonhüllkurve</b>.</li>
<li>Ein Operator pro Algorithmus erlaubt <b>Feedback</b> („zwischen Resonanz und Rauschen").</li>
<li><b>Keyboard Rate und Level Scaling</b> passen den Klang an jede Tastaturzone an.</li></ul>
<p>Sein Urteil: FM klingt natürlich, sauber, fast transparent (E-Piano, Blech, Holz, Perkussion). Analog klingt roh, kraftvoll und warm. „Besorge dir von beiden einen und verbinde sie per MIDI."</p>
<p>Der <b>Casio CZ-101</b> erreicht Ähnliches mit <i>Phase Distortion</i>: Eine digital gesteuerte Wellenform (DCW) verbiegt die Phase einer Welle. Er ist leichter zu programmieren und näher an einem Analogsynth.</p>`,
          `<p>フリードマンはジョン・チョウニング（スタンフォード大学、1970年代）のアイデアをこうまとめます。可聴域のサイン波が別のサイン波の周波数を変調すると、キャリアの周りに<b>サイドバンド</b>が現れる。LFOのビブラートもFMですが、そのサイドバンドは可聴域の外にあります。</p>
<p><b>ヤマハDX7</b>（1983年）は6つのサイン波<b>オペレーター</b>を<b>アルゴリズム</b>で組み合わせます。</p>
<ul><li><b>キャリア</b>は常にチェーンの最後で、聞こえるのはそれ。</li>
<li>キャリアが複数あるアルゴリズムはFMと加算合成の組み合わせ。</li>
<li>各オペレーターに<b>8段エンベロープ</b>（4つのレートと4つのレベル）がある。モジュレーターでは、そのエンベロープが実際には<b>倍音のエンベロープ</b>になる。</li>
<li>アルゴリズムごとに1つのオペレーターが<b>フィードバック</b>を持つ（「レゾナンスとノイズの中間」）。</li>
<li><b>キーボード・レート／レベル・スケーリング</b>で、鍵盤の各ゾーンに合わせて音を調整できる。</li></ul>
<p>彼の評価：FMは自然でクリーン、ほとんど透明（エレピ、ブラス、木管、打楽器）。アナログは荒々しく力強く温かい。「両方を1台ずつ持ってMIDIでつなげ」。</p>
<p><b>カシオCZ-101</b>は<i>フェイズ・ディストーション</i>で似た結果を得ます。デジタル制御波形（DCW）が波形の位相を歪めるのです。プログラムしやすく、アナログに近い感覚です。</p>`)
      },
      {
        h: T('Mapa de relaciones C:M', 'A map of C:M ratios', 'Karte der C:M-Verhältnisse', 'C:M比のマップ'),
        b: T(`<p>Resumen de las escuchas de Cann con FM simple (seno → seno). El intervalo indica a cuántos semitonos está el modulador respecto de la portadora:</p>
<table class="cm"><tr><th>Modulador</th><th>C:M</th><th>Resultado</th></tr>
<tr><td>−48</td><td>16:1</td><td>Vibrato rápido: el modulador actúa como LFO.</td></tr>
<tr><td>−36</td><td>8:1</td><td>Motor en los graves, casi vocal en los agudos.</td></tr>
<tr><td>−24 / −19</td><td>4:1 / 3:1</td><td>Rico y con peso: <b>bajos</b>.</td></tr>
<tr><td>−12</td><td>2:1</td><td>Más fino, pero más grueso que 1:1.</td></tr>
<tr><td>0</td><td>1:1</td><td>Caña o madera, algo de órgano.</td></tr>
<tr><td>+5 / +7</td><td>3:4 / 2:3</td><td>Metálico pero cohesivo.</td></tr>
<tr><td>+12</td><td>1:2</td><td>Cuadrada opaca: limpio.</td></tr>
<tr><td>+16 / +17</td><td>2:5 / 3:8</td><td><b>Muy metálico</b>.</td></tr>
<tr><td>+19</td><td>1:3</td><td>Limpio y filoso.</td></tr>
<tr><td>+21</td><td>3:10</td><td>Primer tono de <b>campana</b>.</td></tr>
<tr><td>+24 / +31</td><td>1:4 / 1:6</td><td>Brillante y cada vez más penetrante.</td></tr>
<tr><td>+34</td><td>1:7</td><td>Campana brillante (la favorita de Cann).</td></tr>
<tr><td>+36 / +48</td><td>1:8 / 1:16</td><td>Metálico intenso, aunque sean relaciones enteras.</td></tr></table>
<p>Dos reglas:</p>
<ul><li>Las relaciones <b>1:entero</b> dan tonos limpios, sin metal.</li>
<li>Si el modulador está a <b>menos del doble</b> de la portadora, él define la altura. Un bajo con modulador −19 "suena en otra nota": Cann lo corrige subiendo todo 7 semitonos.</li></ul>`,
          `<p>A summary of Cann's listening tests with simple FM (sine → sine). The interval is how many semitones the modulator sits from the carrier:</p>
<table class="cm"><tr><th>Modulator</th><th>C:M</th><th>Result</th></tr>
<tr><td>−48</td><td>16:1</td><td>Fast vibrato: the modulator acts as an LFO.</td></tr>
<tr><td>−36</td><td>8:1</td><td>Engine-like in the bass, almost vocal up high.</td></tr>
<tr><td>−24 / −19</td><td>4:1 / 3:1</td><td>Rich and weighty: <b>basses</b>.</td></tr>
<tr><td>−12</td><td>2:1</td><td>Thinner, but thicker than 1:1.</td></tr>
<tr><td>0</td><td>1:1</td><td>Reedy or woody, somewhat organ-like.</td></tr>
<tr><td>+5 / +7</td><td>3:4 / 2:3</td><td>Metallic yet cohesive.</td></tr>
<tr><td>+12</td><td>1:2</td><td>Dull square: clean.</td></tr>
<tr><td>+16 / +17</td><td>2:5 / 3:8</td><td><b>Very metallic</b>.</td></tr>
<tr><td>+19</td><td>1:3</td><td>Clean and sharp.</td></tr>
<tr><td>+21</td><td>3:10</td><td>First <b>bell</b> tone.</td></tr>
<tr><td>+24 / +31</td><td>1:4 / 1:6</td><td>Bright and increasingly piercing.</td></tr>
<tr><td>+34</td><td>1:7</td><td>Bright bell (Cann's favourite).</td></tr>
<tr><td>+36 / +48</td><td>1:8 / 1:16</td><td>Intensely metallic, even though the ratios are integer.</td></tr></table>
<p>Two rules:</p>
<ul><li><b>1:integer</b> ratios give clean tones without metal.</li>
<li>If the modulator is <b>below twice</b> the carrier, it sets the pitch. A bass with a −19 modulator "plays in another key": Cann fixes it by raising everything 7 semitones.</li></ul>`,
          `<p>Zusammenfassung von Canns Hörtests mit einfacher FM (Sinus → Sinus). Das Intervall gibt an, wie viele Halbtöne der Modulator vom Träger entfernt ist:</p>
<table class="cm"><tr><th>Modulator</th><th>C:M</th><th>Ergebnis</th></tr>
<tr><td>−48</td><td>16:1</td><td>Schnelles Vibrato: Der Modulator wirkt wie ein LFO.</td></tr>
<tr><td>−36</td><td>8:1</td><td>Motorartig im Bass, oben fast vokal.</td></tr>
<tr><td>−24 / −19</td><td>4:1 / 3:1</td><td>Reich und gewichtig: <b>Bässe</b>.</td></tr>
<tr><td>−12</td><td>2:1</td><td>Dünner, aber dicker als 1:1.</td></tr>
<tr><td>0</td><td>1:1</td><td>Rohrblatt oder Holz, etwas Orgel.</td></tr>
<tr><td>+5 / +7</td><td>3:4 / 2:3</td><td>Metallisch, aber geschlossen.</td></tr>
<tr><td>+12</td><td>1:2</td><td>Dumpfes Rechteck: sauber.</td></tr>
<tr><td>+16 / +17</td><td>2:5 / 3:8</td><td><b>Sehr metallisch</b>.</td></tr>
<tr><td>+19</td><td>1:3</td><td>Sauber und scharf.</td></tr>
<tr><td>+21</td><td>3:10</td><td>Erster <b>Glocken</b>ton.</td></tr>
<tr><td>+24 / +31</td><td>1:4 / 1:6</td><td>Hell und zunehmend durchdringend.</td></tr>
<tr><td>+34</td><td>1:7</td><td>Helle Glocke (Canns Favorit).</td></tr>
<tr><td>+36 / +48</td><td>1:8 / 1:16</td><td>Intensiv metallisch, obwohl die Verhältnisse ganzzahlig sind.</td></tr></table>
<p>Zwei Regeln:</p>
<ul><li>Verhältnisse <b>1:ganzzahlig</b> ergeben saubere Töne ohne Metall.</li>
<li>Liegt der Modulator <b>unter dem Doppelten</b> des Trägers, bestimmt er die Tonhöhe. Ein Bass mit Modulator −19 „klingt in einer anderen Tonart": Cann korrigiert das, indem er alles um 7 Halbtöne anhebt.</li></ul>`,
          `<p>シンプルなFM（サイン→サイン）でのキャンの試聴結果のまとめです。音程は、モジュレーターがキャリアから何半音離れているかを示します。</p>
<table class="cm"><tr><th>モジュレーター</th><th>C:M</th><th>結果</th></tr>
<tr><td>−48</td><td>16:1</td><td>速いビブラート：モジュレーターがLFOのように働く。</td></tr>
<tr><td>−36</td><td>8:1</td><td>低音ではエンジン音、高音ではほとんど声のよう。</td></tr>
<tr><td>−24 / −19</td><td>4:1 / 3:1</td><td>豊かで重みがある：<b>ベース</b>向き。</td></tr>
<tr><td>−12</td><td>2:1</td><td>やや細いが1:1より太い。</td></tr>
<tr><td>0</td><td>1:1</td><td>リードや木の質感、少しオルガン風。</td></tr>
<tr><td>+5 / +7</td><td>3:4 / 2:3</td><td>金属的だがまとまりがある。</td></tr>
<tr><td>+12</td><td>1:2</td><td>こもった矩形波：クリーン。</td></tr>
<tr><td>+16 / +17</td><td>2:5 / 3:8</td><td><b>とても金属的</b>。</td></tr>
<tr><td>+19</td><td>1:3</td><td>クリーンで鋭い。</td></tr>
<tr><td>+21</td><td>3:10</td><td>最初の<b>ベル</b>の音色。</td></tr>
<tr><td>+24 / +31</td><td>1:4 / 1:6</td><td>明るく、次第に刺さる音に。</td></tr>
<tr><td>+34</td><td>1:7</td><td>明るいベル（キャンのお気に入り）。</td></tr>
<tr><td>+36 / +48</td><td>1:8 / 1:16</td><td>整数比でも強烈に金属的。</td></tr></table>
<p>2つのルール：</p>
<ul><li><b>1:整数</b>の比は、金属感のないクリーンな音になる。</li>
<li>モジュレーターがキャリアの<b>2倍未満</b>なら、音高はモジュレーターが決める。−19のモジュレーターを使ったベースが「別の音で鳴る」場合、キャンは全体を7半音上げて直します。</li></ul>`)
      },
      {
        h: T('Qué ondas usar como operadores', 'Which waves to use as operators', 'Welche Wellen als Operatoren', 'オペレーターに使う波形'),
        b: T(`<p>Cann probó otras formas de onda en relación 1:1.</p>
<ul><li><b>Seno → seno</b>: caña o madera, cohesivo.</li>
<li><b>Triángulo → seno</b>: más brillante.</li>
<li><b>Cuadrada → seno</b> y <b>sierra → seno</b>: más brillantes. Con mucha modulación se <b>adelgazan, bajan de volumen</b> y tienden a ruido; a nivel medio dan un tono cálido tipo overdrive.</li>
<li>Un <b>seno modulando</b> otras ondas cambia poco: la sierra apenas se afila.</li>
<li>Misma onda en ambos lados: triángulo → triángulo suena parecido a PWM y es útil; sierra → sierra es ruido sin interés.</li></ul>
<p>La conclusión práctica: con el seno como modulador oís <b>un solo sonido</b>. Con el seno como portadora de otras ondas suele oírse "seno + distorsión aparte". Por eso Cann trabaja casi siempre con senos.</p>
<p>Dos curiosidades: un seno con <b>feedback</b> se parece a una sierra, y un modulador a +12 con modulación máxima y algo de feedback se parece a una cuadrada.</p>`,
          `<p>Cann tried other waveforms at a 1:1 ratio.</p>
<ul><li><b>Sine → sine</b>: reedy or woody, cohesive.</li>
<li><b>Triangle → sine</b>: brighter.</li>
<li><b>Square → sine</b> and <b>saw → sine</b>: brighter still. With heavy modulation they <b>thin out, drop in level</b> and tend to noise; at medium levels they give a warm, overdrive-like tone.</li>
<li>A <b>sine modulating</b> other waves changes little: the saw just gets slightly sharper.</li>
<li>Same wave on both sides: triangle → triangle sounds PWM-like and is useful; saw → saw is uninteresting noise.</li></ul>
<p>The practical conclusion: with a sine as the modulator you hear <b>one single sound</b>. With a sine as the carrier for other waves you often hear "sine + separate distortion". That's why Cann works almost exclusively with sines.</p>
<p>Two curiosities: a sine with <b>feedback</b> resembles a saw, and a modulator at +12 with full modulation and some feedback resembles a square.</p>`,
          `<p>Cann probierte andere Wellenformen im Verhältnis 1:1.</p>
<ul><li><b>Sinus → Sinus</b>: Rohrblatt oder Holz, geschlossen.</li>
<li><b>Dreieck → Sinus</b>: heller.</li>
<li><b>Rechteck → Sinus</b> und <b>Sägezahn → Sinus</b>: noch heller. Bei starker Modulation werden sie <b>dünner, leiser</b> und rauschen; bei mittlerem Pegel klingen sie warm wie Overdrive.</li>
<li>Ein <b>modulierender Sinus</b> verändert andere Wellen kaum: Der Sägezahn wird nur etwas schärfer.</li>
<li>Gleiche Welle auf beiden Seiten: Dreieck → Dreieck klingt PWM-artig und ist brauchbar; Sägezahn → Sägezahn ist uninteressantes Rauschen.</li></ul>
<p>Die praktische Schlussfolgerung: Mit Sinus als Modulator hört man <b>einen einzigen Klang</b>. Mit Sinus als Träger anderer Wellen hört man oft „Sinus + separate Verzerrung". Deshalb arbeitet Cann fast nur mit Sinuswellen.</p>
<p>Zwei Kuriositäten: Ein Sinus mit <b>Feedback</b> ähnelt einem Sägezahn, und ein Modulator bei +12 mit voller Modulation und etwas Feedback ähnelt einem Rechteck.</p>`,
          `<p>キャンは1:1の比で他の波形も試しました。</p>
<ul><li><b>サイン→サイン</b>：リードや木の質感で、まとまりがある。</li>
<li><b>三角→サイン</b>：より明るい。</li>
<li><b>矩形→サイン</b>と<b>ノコギリ→サイン</b>：さらに明るい。変調を深くすると<b>細く小さく</b>なり、ノイズに近づく。中程度ではオーバードライブのような温かい音。</li>
<li><b>サインで他の波形を変調</b>しても変化は少なく、ノコギリ波がわずかに鋭くなる程度。</li>
<li>両側が同じ波形の場合：三角→三角はPWMのように聞こえて使える。ノコギリ→ノコギリはつまらないノイズ。</li></ul>
<p>実践的な結論として、サインをモジュレーターにすると<b>ひとつの音</b>として聞こえます。サインを他の波形のキャリアにすると「サイン＋別の歪み」に聞こえがちです。だからキャンはほぼサイン波だけで作業します。</p>
<p>興味深い点が2つあります。<b>フィードバック</b>をかけたサインはノコギリ波に似ており、+12のモジュレーターに最大の変調と少しのフィードバックを加えると矩形波に似ます。</p>`)
      },
      {
        h: T('Cuatro arquitecturas', 'Four architectures', 'Vier Architekturen', '4つの構成'),
        b: T(`<ul><li><b>FM simple</b> (un modulador sobre una portadora): la base de casi todo. Una sola pila suele sonar débil, como un oscilador solo; se apilan varias en capas.</li>
<li><b>Portadoras paralelas</b> (un modulador sobre varias portadoras): ahorra operadores. Si desafinás una portadora aparecen <b>batidos de volumen</b>; suena mejor usar dos pilas completas desafinadas. Con portadoras a una quinta (+7) obtenés la base de un piano tipo Wurlitzer o de percusión de madera.</li>
<li><b>Moduladores paralelos</b> (varios moduladores sobre una portadora): más rico. Dos moduladores iguales al 50% equivalen a uno al 100%. La gracia está en darles <b>afinaciones y envolventes distintas</b>: uno agudo y rápido (campana) más uno grave y lento (cuerpo) dan un piano eléctrico natural.</li>
<li><b>Cascada</b> (un modulador modula a otro modulador): da los timbres más ricos, porque el segundo modulador ya no es un seno. Con más de tres operadores tiende a ruido. Cann muestra además que <b>fijar el nivel</b> de un eslabón (que no responda a la velocidad) da tonos intermedios imposibles en la versión "todo sensible".</li></ul>`,
          `<ul><li><b>Simple FM</b> (one modulator on one carrier): the basis of almost everything. A single stack usually sounds weak, like a lone oscillator; you layer several.</li>
<li><b>Parallel carriers</b> (one modulator on several carriers): saves operators. Detuning one carrier causes <b>volume beating</b>; two complete detuned stacks sound better. With carriers a fifth apart (+7) you get the basis of a Wurlitzer-type piano or wooden percussion.</li>
<li><b>Parallel modulators</b> (several modulators on one carrier): richer. Two equal modulators at 50% equal one at 100%. The trick is to give them <b>different tunings and envelopes</b>: a high, fast one (bell) plus a low, slow one (body) give a natural electric piano.</li>
<li><b>Cascade</b> (one modulator modulates another modulator): gives the richest timbres, because the second modulator is no longer a sine. With more than three operators it tends to noise. Cann also shows that <b>fixing the level</b> of one link (not velocity-sensitive) gives in-between tones impossible in the "all sensitive" version.</li></ul>`,
          `<ul><li><b>Einfache FM</b> (ein Modulator auf einem Träger): die Basis fast aller Klänge. Ein einzelner Stack klingt oft schwach, wie ein einzelner Oszillator; man schichtet mehrere.</li>
<li><b>Parallele Träger</b> (ein Modulator auf mehreren Trägern): spart Operatoren. Wird ein Träger verstimmt, entstehen <b>Lautstärkeschwebungen</b>; zwei komplette verstimmte Stacks klingen besser. Mit Trägern im Quintabstand (+7) erhält man die Basis eines Wurlitzer-artigen Pianos oder von Holzperkussion.</li>
<li><b>Parallele Modulatoren</b> (mehrere Modulatoren auf einem Träger): reicher. Zwei gleiche Modulatoren bei 50 % entsprechen einem bei 100 %. Der Trick: <b>verschiedene Stimmungen und Hüllkurven</b> – ein hoher, schneller (Glocke) plus ein tiefer, langsamer (Körper) ergeben ein natürliches E-Piano.</li>
<li><b>Kaskade</b> (ein Modulator moduliert einen anderen Modulator): ergibt die reichsten Klänge, weil der zweite Modulator kein Sinus mehr ist. Mit mehr als drei Operatoren tendiert sie zu Rauschen. Cann zeigt außerdem: Wird der Pegel eines Glieds <b>fixiert</b> (nicht velocityabhängig), entstehen Zwischentöne, die in der „alles sensiblen" Version unmöglich sind.</li></ul>`,
          `<ul><li><b>シンプルFM</b>（1つのモジュレーターが1つのキャリアを変調）：ほぼすべての基礎。単独のスタックは単独のオシレーターのように弱く聞こえがちなので、いくつも重ねる。</li>
<li><b>並列キャリア</b>（1つのモジュレーターが複数のキャリアを変調）：オペレーターを節約できる。キャリアの1つをデチューンすると<b>音量のうなり</b>が出るので、デチューンした完全なスタックを2つ使うほうが良い。キャリアを5度（+7）離すと、ウーリッツァー風ピアノや木製打楽器の土台になる。</li>
<li><b>並列モジュレーター</b>（複数のモジュレーターが1つのキャリアを変調）：より豊か。同じモジュレーター2つを50%ずつにすると、1つを100%にしたのと同じ。コツは<b>異なるチューニングとエンベロープ</b>を与えること。高く速いもの（ベル）と低く遅いもの（ボディ）で自然なエレピになる。</li>
<li><b>カスケード</b>（モジュレーターが別のモジュレーターを変調）：2つ目のモジュレーターがもはやサイン波ではないため、最も豊かな音色になる。4つ以上のオペレーターではノイズに近づく。キャンはさらに、ある段の<b>レベルを固定</b>（ベロシティに反応させない）すると、「すべて反応」版では出せない中間の音色が得られることを示している。</li></ul>`)
      },
      {
        h: T('Envolventes que dan vida', 'Envelopes that bring it to life', 'Hüllkurven, die Leben einhauchen', '命を吹き込むエンベロープ'),
        b: T(`<p>Con los niveles fijos, la FM suena áspera y aburrida. Lo que funciona, según Cann:</p>
<ul><li><b>Level drop</b>: el modulador cae a cero en unos 10 s y el sonido pasa de brillante a seno, como un instrumento real cuyos armónicos se apagan.</li>
<li><b>Pitch drop</b>: bajar el pitch del modulador da efectos locos, útiles para efectos de sonido.</li>
<li><b>Modulador +17 con envolvente exponencial</b> = una campana simple.</li>
<li><b>Modulador +21 con 15 ms de hold</b> antes del decay = la <b>campana DX de los 80</b>. El hold da impacto.</li>
<li><b>Metales</b>: relación 1:1 con el ataque del modulador <b>apenas más lento</b> (unos 5 ms) que el de la portadora. Así aparece el "spit" del bronce; si lo hacés más lento, se pierde.</li>
<li><b>Escalado por velocidad</b>: no tiene que ir de cero a máximo; elegí el rango entre "opaco" y "brillante" que necesites.</li>
<li><b>Key scaling</b>: si suena áspero en una zona del teclado, bajá el nivel del operador <i>en esa zona</i> en lugar de quitar modulación a todo el sonido.</li></ul>`,
          `<p>With fixed levels, FM sounds harsh and boring. What works, according to Cann:</p>
<ul><li><b>Level drop</b>: the modulator falls to zero over about 10 s and the sound goes from bright to sine, like a real instrument whose harmonics fade.</li>
<li><b>Pitch drop</b>: lowering the modulator's pitch gives crazy effects, useful for sound effects.</li>
<li>A <b>+17 modulator with an exponential envelope</b> = a simple bell.</li>
<li>A <b>+21 modulator with a 15 ms hold</b> before decay = the <b>1980s DX bell</b>. The hold adds impact.</li>
<li><b>Brass</b>: a 1:1 ratio with the modulator's attack <b>just slightly slower</b> (about 5 ms) than the carrier's. That creates the brass "spit"; make it slower and it's lost.</li>
<li><b>Velocity scaling</b>: it doesn't have to run from zero to max; choose the range between "dull" and "bright" you need.</li>
<li><b>Key scaling</b>: if it sounds harsh in one region of the keyboard, lower the operator's level <i>in that region</i> instead of removing modulation from the whole sound.</li></ul>`,
          `<p>Mit festen Pegeln klingt FM rau und langweilig. Was laut Cann funktioniert:</p>
<ul><li><b>Level Drop</b>: Der Modulator fällt in etwa 10 s auf null, und der Klang geht von hell zu Sinus über, wie ein echtes Instrument, dessen Obertöne verklingen.</li>
<li><b>Pitch Drop</b>: Die Tonhöhe des Modulators zu senken, ergibt verrückte Effekte, nützlich für Soundeffekte.</li>
<li>Ein <b>Modulator bei +17 mit exponentieller Hüllkurve</b> = eine einfache Glocke.</li>
<li>Ein <b>Modulator bei +21 mit 15 ms Hold</b> vor dem Decay = die <b>DX-Glocke der 80er</b>. Das Hold gibt Wucht.</li>
<li><b>Blech</b>: Verhältnis 1:1 mit einem Modulator-Attack, der <b>nur wenig langsamer</b> (etwa 5 ms) ist als der des Trägers. So entsteht der Blech-„Spit"; noch langsamer, und er geht verloren.</li>
<li><b>Velocity Scaling</b>: Es muss nicht von null bis Maximum reichen; wähle den Bereich zwischen „dumpf" und „hell", den du brauchst.</li>
<li><b>Key Scaling</b>: Klingt es in einem Tastaturbereich rau, senke den Pegel des Operators <i>in diesem Bereich</i>, statt dem ganzen Klang Modulation wegzunehmen.</li></ul>`,
          `<p>レベルが固定されたFMは粗く退屈に聞こえます。キャンによれば、効果的なのは次のとおりです。</p>
<ul><li><b>レベル・ドロップ</b>：モジュレーターが約10秒でゼロまで下がり、音は明るい状態からサイン波へ移る。倍音が消えていく本物の楽器のよう。</li>
<li><b>ピッチ・ドロップ</b>：モジュレーターの音高を下げるとおかしな効果になる。効果音向き。</li>
<li><b>+17のモジュレーターに指数カーブのエンベロープ</b>＝シンプルなベル。</li>
<li><b>+21のモジュレーターに、ディケイ前の15 msホールド</b>＝<b>80年代のDXベル</b>。ホールドがインパクトを生む。</li>
<li><b>ブラス</b>：1:1の比で、モジュレーターのアタックをキャリアより<b>ほんの少し遅く</b>（約5 ms）する。これでブラスの「スピット」が生まれる。もっと遅くすると消えてしまう。</li>
<li><b>ベロシティ・スケーリング</b>：ゼロから最大まで振る必要はない。必要な「暗い」から「明るい」までの範囲を選ぶ。</li>
<li><b>キー・スケーリング</b>：鍵盤のある範囲で荒く聞こえるなら、音全体の変調を減らすのではなく、<i>その範囲で</i>オペレーターのレベルを下げる。</li></ul>`)
      },
      {
        h: T('Recetas completas de Cann', 'Cann\'s complete recipes', 'Canns komplette Rezepte', 'キャンの完全なレシピ'),
        b: T(`<ul><li><b>Piano eléctrico</b>: tres elementos: (1) una campana, con modulador a ~1:11, sensible a la velocidad y más suave en los agudos; (2) un sustain metálico, con modulador 1:2 y feedback; (3) un sustain de madera, 1:1 con feedback. Le suma chorus. Su consejo: para un EP FM conviene partir de un buen preset y ajustarlo a tu forma de tocar.</li>
<li><b>Órgano</b>: cinco portadoras paralelas en los armónicos 1 a 5 (una apenas desafinada), todas moduladas por un mismo operador con distinta cantidad, más un simulador de parlante rotativo.</li>
<li><b>Instrumento de viento</b>: ruido blanco en un <b>pulso de 5 ms</b> para el soplo inicial, ruido marrón como modulador para la aspereza de la madera y key scaling que deja pasar el "chiff".</li>
<li><b>Metales híbridos</b>: la FM pone el <b>cuerpo</b> y una sustractiva de dos sierras pone el <b>brillo</b>, con un seno para el peso. La paradoja: en este patch lo gordo sale de la FM y lo brillante de la sustractiva.</li>
<li><b>Campana "clangy"</b>: un operador triangular usado como LFO a relación 3:1, cuya velocidad sigue la nota para que dos notas no laten igual. Portadoras paralelas a 1:9 y key scaling en ambos extremos.</li>
<li><b>Bajo FM</b>: un modulador grave de decay corto (el grave está en el ataque y no llena el espectro) más un modulador paralelo 1:7 que da el brillo de campana del ataque.</li></ul>
<p>Lo aprendido: C:M 2:1 o 3:1 = bajo usable; los moduladores paralelos dan profundidad y brillo cohesivos; los senos redondean; más índice = más brillo; la cascada da detalle.</p>`,
          `<ul><li><b>Electric piano</b>: three elements: (1) a bell, with a modulator at ~1:11, velocity-sensitive and softer up high; (2) a metallic sustain, with a 1:2 modulator and feedback; (3) a wooden sustain, 1:1 with feedback. Chorus is added. His advice: for an FM EP, start from a good preset and adapt it to your playing.</li>
<li><b>Organ</b>: five parallel carriers on harmonics 1 to 5 (one slightly detuned), all modulated by the same operator in different amounts, plus a rotary speaker simulator.</li>
<li><b>Wind instrument</b>: white noise in a <b>5 ms pulse</b> for the initial breath, brown noise as a modulator for the woody roughness, and key scaling that lets the "chiff" through.</li>
<li><b>Hybrid brass</b>: FM provides the <b>body</b> and a two-saw subtractive layer provides the <b>brightness</b>, with a sine for weight. The paradox: in this patch the fatness comes from FM and the brightness from subtractive.</li>
<li><b>Clangy bell</b>: a triangle operator used as an LFO at a 3:1 ratio, whose speed follows the note so two notes don't beat in sync. Parallel carriers at 1:9 and key scaling at both ends.</li>
<li><b>FM bass</b>: a low modulator with a short decay (the low end lives in the attack and doesn't fill the spectrum) plus a parallel 1:7 modulator that gives the attack its bell-like brightness.</li></ul>
<p>Lessons: C:M 2:1 or 3:1 = usable bass; parallel modulators give cohesive depth and sparkle; sines round things out; more index = more brightness; cascade adds detail.</p>`,
          `<ul><li><b>E-Piano</b>: drei Elemente: (1) eine Glocke, mit Modulator bei ~1:11, velocityabhängig und oben weicher; (2) ein metallisches Sustain, mit 1:2-Modulator und Feedback; (3) ein hölzernes Sustain, 1:1 mit Feedback. Dazu Chorus. Sein Rat: Für ein FM-E-Piano lieber von einem guten Preset ausgehen und es an die eigene Spielweise anpassen.</li>
<li><b>Orgel</b>: fünf parallele Träger auf den Obertönen 1 bis 5 (einer leicht verstimmt), alle vom selben Operator unterschiedlich stark moduliert, plus Rotorlautsprecher-Simulation.</li>
<li><b>Blasinstrument</b>: weißes Rauschen als <b>5-ms-Impuls</b> für den Anblasimpuls, braunes Rauschen als Modulator für die holzige Rauheit und Key Scaling, das den „Chiff" durchlässt.</li>
<li><b>Hybrides Blech</b>: FM liefert den <b>Körper</b>, eine subtraktive Schicht aus zwei Sägezähnen die <b>Helligkeit</b>, dazu ein Sinus für Gewicht. Das Paradox: In diesem Patch kommt das Fette aus der FM und das Helle aus der Subtraktiven.</li>
<li><b>„Clangy" Glocke</b>: ein Dreieck-Operator als LFO im Verhältnis 3:1, dessen Tempo der Note folgt, damit zwei Noten nicht synchron schweben. Parallele Träger bei 1:9 und Key Scaling an beiden Enden.</li>
<li><b>FM-Bass</b>: ein tiefer Modulator mit kurzem Decay (der Tiefgang steckt im Attack und füllt das Spektrum nicht) plus ein paralleler 1:7-Modulator, der dem Attack Glockenglanz gibt.</li></ul>
<p>Gelernt: C:M 2:1 oder 3:1 = brauchbarer Bass; parallele Modulatoren geben geschlossene Tiefe und Glanz; Sinuswellen runden ab; mehr Index = mehr Helligkeit; Kaskade bringt Detail.</p>`,
          `<ul><li><b>エレクトリック・ピアノ</b>：3つの要素からなる。(1) ベル：約1:11のモジュレーター、ベロシティ感度あり、高音域では控えめ。(2) 金属的なサステイン：1:2のモジュレーターとフィードバック。(3) 木の質感のサステイン：1:1とフィードバック。これにコーラスを加える。彼の助言：FMエレピは良いプリセットから始め、自分の弾き方に合わせて調整するほうがよい。</li>
<li><b>オルガン</b>：倍音1〜5に置いた5つの並列キャリア（1つはわずかにデチューン）を、同じオペレーターが異なる量で変調する。これにロータリー・スピーカーのシミュレーターを加える。</li>
<li><b>管楽器</b>：最初の息は<b>5 msのパルス</b>状のホワイトノイズ、木のざらつきはモジュレーターとしてのブラウンノイズ。キー・スケーリングで「チフ」を通す。</li>
<li><b>ハイブリッド・ブラス</b>：FMが<b>ボディ</b>を、2つのノコギリ波による減算合成が<b>明るさ</b>を担い、サイン波で重みを加える。逆説的だが、このパッチでは太さがFMから、明るさが減算合成から来る。</li>
<li><b>「クランギー」なベル</b>：三角波のオペレーターを3:1の比でLFOとして使い、その速さを音程に追従させて2つの音が同じようにうならないようにする。並列キャリアは1:9、両端にキー・スケーリング。</li>
<li><b>FMベース</b>：短いディケイの低いモジュレーター（低音はアタックにだけあり、スペクトルを埋め尽くさない）に、アタックにベルのような明るさを与える1:7の並列モジュレーターを加える。</li></ul>
<p>学んだこと：C:M 2:1か3:1＝使えるベース。並列モジュレーター＝まとまった深みと輝き。サイン波で丸みを出す。インデックスを上げれば明るくなる。カスケードで細部が増す。</p>`)
      }
    ],
    ex: {
      es: ['Lab FM práctica: recorré los presets en orden. Para cada uno anotá si suena limpio, metálico o a campana, y comparalo con lo que muestra el lab sobre la relación C:M.', 'Con "Seno → seno", barré los semitonos de M1 de −24 a +36 con índice 3. ¿Dónde aparece la primera campana? Cann la ubica en +21.', 'Preset "Bajo −19": tocá la misma tecla en el Lab Sinte. ¿Suena en otra nota? Probá el consejo de Cann: transponé todo 7 semitonos.', 'Preset "Metales": llevá el "ataque más lento que P" de 0 a 60 ms. ¿En qué rango aparece el spit y cuándo se pierde?', 'Preset "Campana DX": compará hold de 0, 15 y 60 ms. ¿Qué cambia en el impacto?', 'Algoritmos: poné M1 = 0 y M2 = +12 con índices iguales y compará paralelo con cascada. ¿Cuál es más rico? ¿Cuál tiende antes al ruido?'],
      en: ['Practical FM lab: go through the presets in order. For each one note whether it sounds clean, metallic or bell-like, and compare with what the lab says about the C:M ratio.', 'With "Sine → sine", sweep M1 from −24 to +36 semitones at index 3. Where does the first bell appear? Cann places it at +21.', '"Bass −19" preset: play the same key in the Synth lab. Does it sound in another key? Try Cann\'s fix: transpose everything 7 semitones.', '"Brass" preset: take the "attack lag behind C" from 0 to 60 ms. In what range does the spit appear, and when is it lost?', '"DX bell" preset: compare a hold of 0, 15 and 60 ms. What changes in the impact?', 'Algorithms: set M1 = 0 and M2 = +12 with equal indices and compare parallel with cascade. Which is richer? Which turns to noise first?'],
      de: ['Labor FM-Praxis: Gehe die Presets der Reihe nach durch. Notiere bei jedem, ob es sauber, metallisch oder glockenartig klingt, und vergleiche mit der Anzeige des Labors zum C:M-Verhältnis.', 'Mit „Sinus → Sinus" M1 von −24 bis +36 Halbtöne bei Index 3 durchfahren. Wo erscheint die erste Glocke? Cann setzt sie bei +21 an.', 'Preset „Bass −19": Dieselbe Taste im Synth-Labor spielen. Klingt er in einer anderen Tonart? Probiere Canns Lösung: alles um 7 Halbtöne transponieren.', 'Preset „Blech": Den „Attack später als T" von 0 bis 60 ms verändern. In welchem Bereich erscheint der Spit, und wann geht er verloren?', 'Preset „DX-Glocke": Hold von 0, 15 und 60 ms vergleichen. Was ändert sich an der Wucht?', 'Algorithmen: M1 = 0 und M2 = +12 mit gleichen Indizes einstellen und parallel mit Kaskade vergleichen. Was ist reicher? Was rauscht zuerst?'],
      ja: ['実践FMラボ：プリセットを順番に試す。それぞれがクリーンか、金属的か、ベルのようかを記録し、ラボが表示するC:M比の説明と比べる。', '「サイン→サイン」で、インデックス3のままM1を−24から+36半音まで動かす。最初のベルはどこで現れる？キャンは+21としている。', 'プリセット「ベース−19」：シンセ・ラボで同じ鍵盤を弾く。別の音に聞こえる？キャンの解決策を試す：全体を7半音移調する。', 'プリセット「ブラス」：「Cより遅いアタック」を0から60 msまで動かす。スピットが現れるのはどの範囲で、いつ消える？', 'プリセット「DXベル」：ホールドを0、15、60 msで比べる。インパクトはどう変わる？', 'アルゴリズム：M1＝0、M2＝+12、インデックスを同じにして、並列とカスケードを比べる。どちらが豊か？どちらが先にノイズになる？']
    },
    deep: {
      es: `<h3>Bandas laterales y funciones de Bessel</h3>
<p>Con una portadora fc y un modulador fm de índice I, el espectro tiene componentes en <b>fc ± k·fm</b> (k = 0, 1, 2…), con amplitudes dadas por las funciones de Bessel J<sub>k</sub>(I). La regla de Carson estima el ancho de banda útil en <b>2(I+1)·fm</b>. Las bandas "negativas" se reflejan sobre 0 Hz con la fase invertida y pueden reforzar o cancelar a otras: por eso el brillo no sube siempre de forma pareja al subir el índice.</p>
<h3>Por qué el modulador puede definir la altura</h3>
<p>Todas las componentes son combinaciones de fc y fm, así que el espectro es armónico de una fundamental implícita igual al <b>máximo común divisor</b> de ambas frecuencias.</p>
<ul><li>Modulador a −19 (fm ≈ fc/3): la fundamental es fc/3, una octava y una quinta por debajo, que coincide con la nota del modulador. Por eso "suena en otra nota".</li>
<li>Modulador a +7 (fm = 1,5·fc): el máximo común divisor es fc/2, una octava abajo.</li>
<li>Con relaciones no racionales no hay fundamental común: el resultado es inarmónico, metálico o de campana.</li></ul>
<h3>FM, PM y feedback</h3>
<p>El DX7 implementa en realidad <b>modulación de fase</b>, equivalente a FM con el modulador derivado. Esto mantiene estable la afinación de la portadora. El feedback de un operador sobre sí mismo genera una serie que tiende a la sierra, que es lo que Cann oyó como "seno con feedback ≈ sierra".</p>
<h3>Escalado y expresión</h3>
<p>Como el brillo depende del índice, conectar la velocidad al <b>nivel de los moduladores</b> (y no solo al de las portadoras) es lo que hace expresiva a la FM: tocar fuerte es literalmente agregar bandas laterales.</p>`,
      en: `<h3>Sidebands and Bessel functions</h3>
<p>With a carrier fc and a modulator fm at index I, the spectrum has components at <b>fc ± k·fm</b> (k = 0, 1, 2…), with amplitudes given by Bessel functions J<sub>k</sub>(I). Carson's rule estimates the useful bandwidth as <b>2(I+1)·fm</b>. "Negative" sidebands reflect around 0 Hz with inverted phase and can reinforce or cancel others: that's why brightness doesn't always rise evenly as the index increases.</p>
<h3>Why the modulator can set the pitch</h3>
<p>Every component is a combination of fc and fm, so the spectrum is harmonic to an implied fundamental equal to the <b>greatest common divisor</b> of the two frequencies.</p>
<ul><li>Modulator at −19 (fm ≈ fc/3): the fundamental is fc/3, an octave and a fifth below, matching the modulator's note. That's why it "plays in another key".</li>
<li>Modulator at +7 (fm = 1.5·fc): the GCD is fc/2, an octave below.</li>
<li>Non-rational ratios have no common fundamental: the result is inharmonic, metallic or bell-like.</li></ul>
<h3>FM, PM and feedback</h3>
<p>The DX7 actually implements <b>phase modulation</b>, equivalent to FM with a differentiated modulator. This keeps the carrier's tuning stable. An operator's feedback on itself generates a series that tends towards a saw, which is what Cann heard as "sine with feedback ≈ saw".</p>
<h3>Scaling and expression</h3>
<p>Because brightness depends on the index, routing velocity to the <b>modulators' level</b> (not just the carriers') is what makes FM expressive: playing harder literally adds sidebands.</p>`,
      de: `<h3>Seitenbänder und Bessel-Funktionen</h3>
<p>Mit Träger fc und Modulator fm bei Index I hat das Spektrum Komponenten bei <b>fc ± k·fm</b> (k = 0, 1, 2…), mit Amplituden nach den Bessel-Funktionen J<sub>k</sub>(I). Die Carson-Regel schätzt die nutzbare Bandbreite auf <b>2(I+1)·fm</b>. „Negative" Seitenbänder spiegeln sich mit invertierter Phase um 0 Hz und können andere verstärken oder auslöschen: Deshalb steigt die Helligkeit mit dem Index nicht immer gleichmäßig.</p>
<h3>Warum der Modulator die Tonhöhe bestimmen kann</h3>
<p>Jede Komponente ist eine Kombination aus fc und fm, also ist das Spektrum harmonisch zu einem impliziten Grundton gleich dem <b>größten gemeinsamen Teiler</b> beider Frequenzen.</p>
<ul><li>Modulator bei −19 (fm ≈ fc/3): Der Grundton ist fc/3, eine Oktave plus Quinte tiefer, also der Ton des Modulators. Darum „klingt er in einer anderen Tonart".</li>
<li>Modulator bei +7 (fm = 1,5·fc): Der ggT ist fc/2, eine Oktave tiefer.</li>
<li>Nicht rationale Verhältnisse haben keinen gemeinsamen Grundton: Das Ergebnis ist unharmonisch, metallisch oder glockenartig.</li></ul>
<h3>FM, PM und Feedback</h3>
<p>Der DX7 nutzt eigentlich <b>Phasenmodulation</b>, äquivalent zu FM mit abgeleitetem Modulator. So bleibt die Stimmung des Trägers stabil. Das Feedback eines Operators auf sich selbst erzeugt eine Reihe, die zum Sägezahn tendiert – das, was Cann als „Sinus mit Feedback ≈ Sägezahn" hörte.</p>
<h3>Scaling und Ausdruck</h3>
<p>Weil die Helligkeit vom Index abhängt, macht erst die Velocity auf den <b>Pegel der Modulatoren</b> (nicht nur der Träger) FM ausdrucksstark: Härteres Spiel fügt buchstäblich Seitenbänder hinzu.</p>`,
      ja: `<h3>サイドバンドとベッセル関数</h3>
<p>キャリアfc、モジュレーターfm、インデックスIのとき、スペクトルは<b>fc ± k·fm</b>（k＝0、1、2…）に成分を持ち、その振幅はベッセル関数J<sub>k</sub>(I)で与えられます。カーソンの法則は有効帯域幅を<b>2(I+1)·fm</b>と見積もります。「負の」サイドバンドは0 Hzで位相反転して折り返し、他の成分を強めたり打ち消したりします。インデックスを上げても明るさが均等に増えるとは限らないのはそのためです。</p>
<h3>モジュレーターが音高を決めることがある理由</h3>
<p>すべての成分はfcとfmの組み合わせなので、スペクトルは両周波数の<b>最大公約数</b>に等しい暗黙の基音の倍音列になります。</p>
<ul><li>モジュレーターが−19（fm ≈ fc/3）：基音はfc/3、つまり1オクターブと5度下で、モジュレーターの音と一致する。だから「別の音で鳴る」。</li>
<li>モジュレーターが+7（fm＝1.5·fc）：最大公約数はfc/2で、1オクターブ下。</li>
<li>有理数でない比には共通の基音がなく、結果は非調和で金属的、またはベルのようになる。</li></ul>
<h3>FM、PM、フィードバック</h3>
<p>DX7は実際には<b>位相変調</b>を使っています。これはモジュレーターを微分したFMと等価で、キャリアのチューニングを安定させます。オペレーターの自己フィードバックはノコギリ波に近づく級数を生み、キャンが「フィードバック付きサイン≈ノコギリ」と聞いたのはこれです。</p>
<h3>スケーリングと表現</h3>
<p>明るさはインデックスで決まるため、ベロシティをキャリアだけでなく<b>モジュレーターのレベル</b>にも送ることがFMを表情豊かにします。強く弾くことは、文字どおりサイドバンドを加えることなのです。</p>`
    },
    read: ['Simon Cann — <i>How To Make A Noise</i>, cap. 7 y suplemento', 'Dean Friedman — <i>Synthesizer Basics</i>, cap. "FM Synthesis and the DX7"', 'John Chowning — "The Synthesis of Complex Audio Spectra by Means of Frequency Modulation" (JAES, 1973)', 'John Chowning & David Bristow — <i>FM Theory and Applications: By Musicians for Musicians</i> (1986)'],
    quiz: [
      Q(T('Modulador +12 sobre la portadora (1:2). ¿Cómo suena?', 'Modulator +12 above the carrier (1:2). How does it sound?', 'Modulator +12 über dem Träger (1:2). Wie klingt es?', 'キャリアの+12上のモジュレーター（1:2）。どう聞こえる？'),
        T(['Muy metálico', 'Limpio, tipo cuadrada opaca', 'Ruido', 'Vibrato'], ['Very metallic', 'Clean, like a dull square', 'Noise', 'Vibrato'], ['Sehr metallisch', 'Sauber, wie ein dumpfes Rechteck', 'Rauschen', 'Vibrato'], ['とても金属的', 'クリーンで、こもった矩形波のよう', 'ノイズ', 'ビブラート']), 1,
        T('Las relaciones 1:entero son limpias; 1:2 se parece a una cuadrada.', '1:integer ratios are clean; 1:2 resembles a square.', '1:ganzzahlige Verhältnisse sind sauber; 1:2 ähnelt einem Rechteck.', '1:整数比はクリーン。1:2は矩形波に似る。')),
      Q(T('¿Con qué intervalo de modulador ubica Cann el primer tono de campana?', 'At which modulator interval does Cann place the first bell tone?', 'Bei welchem Modulatorintervall verortet Cann den ersten Glockenton?', 'キャンが最初のベルの音色とするモジュレーターの音程は？'),
        T(['+12', '+19', '+21 (3:10)', '−12'], ['+12', '+19', '+21 (3:10)', '−12'], ['+12', '+19', '+21 (3:10)', '−12'], ['+12', '+19', '+21（3:10）', '−12']), 2,
        T('Una relación no entera con separación grande da campana; con envolvente y hold, la campana DX.', 'A widely spaced non-integer ratio gives a bell; with envelope and hold, the DX bell.', 'Ein weit gespreiztes, nicht ganzzahliges Verhältnis ergibt eine Glocke; mit Hüllkurve und Hold die DX-Glocke.', '大きく離れた非整数比がベルを生む。エンベロープとホールドを加えるとDXベルになる。')),
      Q(T('¿Cómo se consigue el "spit" de los metales en FM?', 'How do you get the brass "spit" in FM?', 'Wie erzeugt man in FM den Blech-„Spit"?', 'FMでブラスの「スピット」を得るには？'),
        T(['Modulador con ataque apenas más lento que la portadora', 'Mucho feedback en la portadora', 'Un LFO rápido', 'Un filtro con resonancia'], ['A modulator with a slightly slower attack than the carrier', 'Lots of feedback on the carrier', 'A fast LFO', 'A resonant filter'], ['Modulator mit etwas langsamerem Attack als der Träger', 'Viel Feedback am Träger', 'Ein schneller LFO', 'Ein resonanter Filter'], ['キャリアよりわずかに遅いアタックのモジュレーター', 'キャリアに強いフィードバック', '速いLFO', 'レゾナンス付きフィルター']), 0,
        T('Unos 5 ms de diferencia bastan; si es más lento, el spit desaparece.', 'About 5 ms of difference is enough; any slower and the spit disappears.', 'Etwa 5 ms Unterschied genügen; langsamer, und der Spit verschwindet.', '約5 msの差で十分。それ以上遅いとスピットは消える。')),
      Q(T('Con el modulador a −19, tu bajo suena en otra nota. ¿Por qué?', 'With the modulator at −19, your bass plays in another key. Why?', 'Mit Modulator bei −19 klingt dein Bass in einer anderen Tonart. Warum?', 'モジュレーターが−19のとき、ベースが別の音で鳴る。なぜ？'),
        T(['El modulador, a menos del doble de la portadora, define la altura', 'Un error de afinación del sinte', 'Aliasing', 'Falta key scaling'], ['The modulator, below twice the carrier, sets the pitch', 'A tuning fault in the synth', 'Aliasing', 'Missing key scaling'], ['Der Modulator unter dem Doppelten des Trägers bestimmt die Tonhöhe', 'Ein Stimmfehler des Synths', 'Aliasing', 'Fehlendes Key Scaling'], ['キャリアの2倍未満のモジュレーターが音高を決めるから', 'シンセのチューニング不良', 'エイリアシング', 'キー・スケーリングがない']), 0,
        T('La fundamental implícita es el máximo común divisor de fc y fm: fc/3.', 'The implied fundamental is the GCD of fc and fm: fc/3.', 'Der implizite Grundton ist der ggT von fc und fm: fc/3.', '暗黙の基音はfcとfmの最大公約数、つまりfc/3。')),
      Q(T('Dos moduladores idénticos al 50% sobre la misma portadora equivalen a…', 'Two identical modulators at 50% on the same carrier equal…', 'Zwei identische Modulatoren bei 50 % auf demselben Träger entsprechen…', '同じキャリアに50%の同一モジュレーター2つは何と等しい？'),
        T(['Uno al 25%', 'Uno al 100%', 'Silencio', 'Una cascada'], ['One at 25%', 'One at 100%', 'Silence', 'A cascade'], ['Einem bei 25 %', 'Einem bei 100 %', 'Stille', 'Einer Kaskade'], ['25%のもの1つ', '100%のもの1つ', '無音', 'カスケード']), 1,
        T('La ventaja aparece al afinarlos distinto o darles envolventes distintas.', 'The benefit appears when you tune them differently or give them different envelopes.', 'Der Vorteil zeigt sich erst bei unterschiedlicher Stimmung oder Hüllkurve.', '利点は、異なるチューニングやエンベロープを与えたときに現れる。')),
      Q(T('¿Para qué sirve el key scaling (escalado de nivel por tecla) en FM?', 'What is key (level) scaling for in FM?', 'Wozu dient Key (Level) Scaling bei FM?', 'FMにおけるキー（レベル）スケーリングの目的は？'),
        T(['Bajar el nivel de un operador donde suena áspero', 'Cambiar la afinación', 'Generar arpegios', 'Sincronizar el LFO'], ['Lowering an operator\'s level where it sounds harsh', 'Changing the tuning', 'Generating arpeggios', 'Syncing the LFO'], ['Den Pegel eines Operators dort senken, wo es rau klingt', 'Die Stimmung ändern', 'Arpeggios erzeugen', 'Den LFO synchronisieren'], ['荒く聞こえる範囲でオペレーターのレベルを下げる', 'チューニングを変える', 'アルペジオを生成する', 'LFOを同期する']), 0,
        T('Así conservás el carácter en el registro central sin que los agudos se vuelvan ásperos.', 'That keeps the character in the middle register without the highs turning harsh.', 'So bleibt der Charakter in der Mittellage erhalten, ohne dass die Höhen rau werden.', 'こうすれば中音域の個性を保ちつつ、高音域が荒くなるのを防げる。'))
    ]
  });

  /* ===================== EL SONIDO EN LA MEZCLA ===================== */
  after('fx', {
    id: 'context', lv: 3, lab: ['groove', 'fx'],
    title: T('El sonido en la mezcla: espacio, bajo y efectos con criterio', 'Sound in the mix: space, bass and effects with judgement', 'Klang im Mix: Raum, Bass und Effekte mit Bedacht', 'ミックスの中の音：空間、ベース、エフェクトの判断'),
    sum: T('Cómo diseñar cada parte para su lugar en el espectro: el bajo como ritmo o como armonía, cómo engordarlo o hacerlo presente, y cómo usar reverb, delay, compresión y distorsión sin embarrar.',
      'How to design each part for its place in the spectrum: bass as rhythm or as harmony, how to thicken it or give it presence, and how to use reverb, delay, compression and distortion without mud.',
      'Wie man jede Stimme für ihren Platz im Spektrum gestaltet: Bass als Rhythmus oder Harmonie, wie man ihn andickt oder präsent macht und wie man Hall, Delay, Kompression und Verzerrung ohne Matsch einsetzt.',
      '各パートをスペクトルの居場所に合わせて設計する方法：リズムとしての／ハーモニーとしてのベース、太くする方法と存在感を出す方法、濁らせずにリバーブ、ディレイ、コンプ、歪みを使う方法。'),
    key: {
      es: ['Diseñá cada parte para <b>su zona del espectro</b>: si encajan, la mezcla "se hace sola" (Cann).', 'El bajo cumple dos funciones: <b>ritmo</b> (con el bombo) o <b>armonía</b> (la nota que define el acorde); se programa distinto en cada caso.', 'En un bajo rítmico, el <b>decay de la envolvente de filtro</b> define el largo aparente de la nota.', 'Graves <b>centrados y sin estéreo</b>. Para engordar: seno, sub o un <b>HP resonante que sigue la nota</b>. Para presencia: una octava arriba o distorsión dosificada.', 'Efectos con control: HP en todo menos bajo y bombo, <b>ducking</b> de reverb y delay, sidechain, ecos más opacos que el original. Un patch debe sostenerse sin efectos.'],
      en: ['Design each part for <b>its zone of the spectrum</b>: if they fit, the mix "makes itself" (Cann).', 'Bass has two jobs: <b>rhythm</b> (with the kick) or <b>harmony</b> (the note that defines the chord); you program it differently for each.', 'In a rhythmic bass, the <b>filter envelope\'s decay</b> sets the note\'s apparent length.', 'Lows <b>centred and without stereo</b>. To thicken: a sine, a sub, or a <b>key-tracked resonant HP</b>. For presence: an octave up or measured distortion.', 'Controlled effects: HP on everything except bass and kick, <b>ducking</b> on reverb and delay, sidechain, echoes duller than the source. A patch must stand up without effects.'],
      de: ['Gestalte jede Stimme für <b>ihren Bereich im Spektrum</b>: Passen sie zusammen, „mischt sich der Mix von selbst" (Cann).', 'Der Bass hat zwei Aufgaben: <b>Rhythmus</b> (mit der Bassdrum) oder <b>Harmonie</b> (der Ton, der den Akkord bestimmt); man programmiert ihn jeweils anders.', 'Beim rhythmischen Bass bestimmt der <b>Decay der Filterhüllkurve</b> die gefühlte Notenlänge.', 'Tiefen <b>mittig und ohne Stereo</b>. Zum Andicken: Sinus, Sub oder ein <b>mitlaufender resonanter Hochpass</b>. Für Präsenz: eine Oktave höher oder dosierte Verzerrung.', 'Kontrollierte Effekte: Hochpass auf allem außer Bass und Bassdrum, <b>Ducking</b> bei Hall und Delay, Sidechain, Echos dumpfer als das Original. Ein Patch muss auch ohne Effekte bestehen.'],
      ja: ['各パートを<b>スペクトルの自分の帯域</b>に合わせて設計する。噛み合えばミックスは「自然にまとまる」（キャン）。', 'ベースの役割は2つ：<b>リズム</b>（キックと一緒に）か<b>ハーモニー</b>（コードを決める音）。それぞれで作り方が違う。', 'リズム・ベースでは<b>フィルター・エンベロープのディケイ</b>が音の見かけの長さを決める。', '低音は<b>中央に置き、ステレオにしない</b>。太くするにはサイン、サブ、<b>キー追従するレゾナントHP</b>。存在感には1オクターブ上か、控えめな歪み。', 'エフェクトは管理して使う：ベースとキック以外にHP、リバーブとディレイに<b>ダッキング</b>、サイドチェイン、原音より暗いエコー。パッチはエフェクトなしでも成立すべき。']
    },
    sec: [
      {
        h: T('Cada parte en su lugar', 'Every part in its place', 'Jede Stimme an ihrem Platz', '各パートを居場所に'),
        b: T(`<p>Cann insiste en que las mezclas "barrosas" son el error más común. Si cada parte ocupa su zona, balancear niveles es fácil. Si una zona domina, hasta un compresor multibanda le quita energía a todo el tema.</p>
<p>Preguntas para hacerse con todo sonando:</p>
<ul><li>¿El bajo tapa el bombo?</li><li>¿El bajo y el stab están en registros distintos?</li><li>¿El stab choca con la voz?</li><li>¿El lead corta sin lastimar o es un preset flojo que parecía bien en solitario?</li></ul>
<p>Hewitt agrega la herramienta: un <b>EQ con ancho de banda amplio</b> para recortar los graves de todo lo que no sea bajo, y así hacerles lugar.</p>
<p>Sobre los pads, Cann es tajante: los profesionales casi no los usan, o los usan con sutileza. El aficionado rellena el tema con un pad. Si lo usás, que sea una decisión, no un parche.</p>
<p>Y pensá en la <b>automatización del timbre</b>, no solo del volumen: abrir apenas el filtro en el estribillo o acortar el decay en la estrofa.</p>`,
          `<p>Cann insists that muddy mixes are the most common mistake. If each part owns its zone, balancing levels is easy. If one zone dominates, even a multiband compressor drains energy from the whole track.</p>
<p>Questions to ask with everything playing:</p>
<ul><li>Does the bass mask the kick?</li><li>Are the bass and the stab in different registers?</li><li>Does the stab clash with the vocal?</li><li>Does the lead cut without hurting, or is it a limp preset that seemed fine soloed?</li></ul>
<p>Hewitt adds the tool: a <b>wide-bandwidth EQ</b> to cut the lows from everything that isn't bass, making room for it.</p>
<p>On pads, Cann is blunt: professionals barely use them, or use them subtly. Amateurs fill the track with a pad. If you use one, make it a decision, not a patch-up.</p>
<p>And think about <b>automating timbre</b>, not just volume: opening the filter slightly in the chorus, or shortening the decay in the verse.</p>`,
          `<p>Cann betont, dass matschige Mixe der häufigste Fehler sind. Besetzt jede Stimme ihren Bereich, ist das Pegeln leicht. Dominiert ein Bereich, raubt selbst ein Multiband-Kompressor dem ganzen Track Energie.</p>
<p>Fragen, die man sich bei laufendem Track stellen sollte:</p>
<ul><li>Verdeckt der Bass die Bassdrum?</li><li>Liegen Bass und Stab in verschiedenen Lagen?</li><li>Kollidiert der Stab mit der Stimme?</li><li>Setzt sich der Lead durch, ohne wehzutun, oder ist er ein schlappes Preset, das solo gut klang?</li></ul>
<p>Hewitt liefert das Werkzeug: ein <b>EQ mit großer Bandbreite</b>, um bei allem außer dem Bass die Tiefen zu kappen und ihm Platz zu machen.</p>
<p>Zu Pads sagt Cann deutlich: Profis nutzen sie kaum oder nur dezent. Amateure füllen den Track mit einem Pad. Wenn du eines verwendest, dann als Entscheidung, nicht als Flickwerk.</p>
<p>Und denke an <b>Automation der Klangfarbe</b>, nicht nur der Lautstärke: im Refrain den Filter etwas öffnen oder in der Strophe den Decay kürzen.</p>`,
          `<p>キャンは、濁ったミックスが最もよくある失敗だと強調します。各パートが自分の帯域を占めていればレベル調整は簡単です。ひとつの帯域が支配的だと、マルチバンド・コンプでさえ曲全体のエネルギーを奪ってしまいます。</p>
<p>全体を鳴らしながら自問すべきこと：</p>
<ul><li>ベースがキックを覆い隠していないか？</li><li>ベースとスタブは別の音域にあるか？</li><li>スタブがボーカルとぶつかっていないか？</li><li>リードは耳に痛くなくミックスを抜けているか、それともソロでは良さそうだった弱いプリセットか？</li></ul>
<p>ヒューイットは道具を加えます。<b>帯域幅の広いEQ</b>で、ベース以外のすべての低域をカットしてベースの場所を作るのです。</p>
<p>パッドについてキャンははっきり言います。プロはほとんど使わないか、使っても控えめ。アマチュアはパッドで曲を埋めてしまう。使うなら、穴埋めではなく意図的な判断として。</p>
<p>そして音量だけでなく<b>音色のオートメーション</b>も考えましょう。サビでフィルターを少し開く、Aメロでディケイを短くする、など。</p>`)
      },
      {
        h: T('El bajo: ritmo o armonía', 'Bass: rhythm or harmony', 'Bass: Rhythmus oder Harmonie', 'ベース：リズムかハーモニーか'),
        b: T(`<p><b>Bajo rítmico</b> (Cann, Refill 4): sierra en un LP de 24 dB cerrado, más una envolvente al filtro con decay corto, sustain 0 y cantidad máxima. El <b>decay del filtro define el largo aparente</b> de la nota: muy corto suena staccato, muy largo suena flojo. Su ejercicio: armá <b>solo bajo y bombo</b> y ajustá únicamente decay, sustain y cantidad.</p>
<p>Si no groovea, <b>no es el sonido: es la parte</b>. "Si un tema solo funciona porque elegiste el preset correcto, tenés un problema de fondo." A la gente le importan el groove y la melodía, no cómo se hizo el sonido.</p>
<p><b>Bajo armónico</b>: la nota grave decide el acorde. Do-Mi-Sol con La en el bajo ya no es Do mayor: es <b>La menor 7</b>. Aquí el bajo debe tener una altura clara, sin dominar:</p>
<ul><li>Ataque y release no demasiado rápidos, para que no marque ritmo.</li><li>Menos envolvente de filtro y algo más de resonancia (un poco de "twang").</li></ul>
<p><b>Variación</b>: antes de cambiar de sonido, automatizalo. Por ejemplo, un decay más corto en la estrofa (tensión) y apenas más largo en el estribillo (más gordo).</p>
<p><b>Dónde se escucha</b>:</p>
<ul><li>Los auriculares chicos no reproducen graves.</li><li>En un club los graves deben ir centrados.</li><li>En <b>vinilo</b>, un bajo desafinado entre L y R puede hacer saltar la púa.</li></ul>`,
          `<p><b>Rhythmic bass</b> (Cann, Refill 4): a saw into a closed 24 dB LP, plus a filter envelope with short decay, zero sustain and full amount. The <b>filter decay sets the note's apparent length</b>: too short sounds staccato, too long sounds flabby. His exercise: set up <b>just bass and kick</b> and adjust only decay, sustain and amount.</p>
<p>If it doesn't groove, <b>it's not the sound: it's the part</b>. "If a track only works because you picked the right preset, you have a fundamental problem." People care about the groove and the melody, not about how the sound was made.</p>
<p><b>Harmonic bass</b>: the low note decides the chord. C-E-G with A in the bass is no longer C major: it's <b>A minor 7</b>. Here the bass needs a clear pitch without dominating:</p>
<ul><li>Attack and release not too fast, so it doesn't mark the rhythm.</li><li>Less filter envelope and a touch more resonance (a bit of "twang").</li></ul>
<p><b>Variation</b>: before swapping the sound, automate it. For example, a shorter decay in the verse (tension) and a slightly longer one in the chorus (fatter).</p>
<p><b>Where it will be heard</b>:</p>
<ul><li>Small earbuds don't reproduce lows.</li><li>In a club, the lows should be centred.</li><li>On <b>vinyl</b>, a bass detuned between L and R can make the needle jump.</li></ul>`,
          `<p><b>Rhythmischer Bass</b> (Cann, Refill 4): Sägezahn in einen geschlossenen 24-dB-Tiefpass, dazu eine Filterhüllkurve mit kurzem Decay, Sustain null und voller Menge. Der <b>Filter-Decay bestimmt die gefühlte Notenlänge</b>: zu kurz klingt staccato, zu lang schlaff. Seine Übung: <b>nur Bass und Bassdrum</b> einrichten und ausschließlich Decay, Sustain und Menge einstellen.</p>
<p>Groovt es nicht, <b>liegt es nicht am Klang, sondern an der Stimme</b>. „Wenn ein Track nur funktioniert, weil du das richtige Preset gewählt hast, hast du ein grundsätzliches Problem." Die Leute interessieren sich für Groove und Melodie, nicht dafür, wie der Klang gemacht wurde.</p>
<p><b>Harmonischer Bass</b>: Der tiefe Ton entscheidet den Akkord. C-E-G mit A im Bass ist kein C-Dur mehr, sondern <b>a-Moll 7</b>. Hier braucht der Bass eine klare Tonhöhe, ohne zu dominieren:</p>
<ul><li>Attack und Release nicht zu schnell, damit er keinen Rhythmus markiert.</li><li>Weniger Filterhüllkurve und etwas mehr Resonanz (ein wenig „Twang").</li></ul>
<p><b>Variation</b>: Statt den Klang zu tauschen, ihn automatisieren. Etwa ein kürzerer Decay in der Strophe (Spannung) und ein etwas längerer im Refrain (fetter).</p>
<p><b>Wo gehört wird</b>:</p>
<ul><li>Kleine Ohrhörer geben keine Tiefen wieder.</li><li>Im Club gehören die Tiefen in die Mitte.</li><li>Bei <b>Vinyl</b> kann ein zwischen L und R verstimmter Bass die Nadel springen lassen.</li></ul>`,
          `<p><b>リズム・ベース</b>（キャン、Refill 4）：閉じた24 dBのLPに通したノコギリ波に、短いディケイ、サステイン0、量最大のフィルター・エンベロープ。<b>フィルターのディケイが音の見かけの長さを決める</b>：短すぎるとスタッカート、長すぎるとだらしなく聞こえる。彼の練習法は、<b>ベースとキックだけ</b>にして、ディケイ、サステイン、量だけを調整すること。</p>
<p>グルーヴしないなら、<b>問題は音色ではなくフレーズ</b>です。「正しいプリセットを選んだからこそ成立する曲なら、根本的な問題がある。」人が気にするのはグルーヴとメロディで、音の作り方ではありません。</p>
<p><b>ハーモニー・ベース</b>：低音がコードを決めます。C-E-GにAのベースを加えると、もうCメジャーではなく<b>Am7</b>です。ここではベースは、支配せずに音程がはっきり聞こえる必要があります。</p>
<ul><li>リズムを刻まないよう、アタックとリリースを速くしすぎない。</li><li>フィルター・エンベロープを減らし、レゾナンスを少し足す（少しの「トワング」）。</li></ul>
<p><b>変化をつける</b>：音色を替える前に、オートメーションする。例えばAメロでディケイを短く（緊張感）、サビで少しだけ長く（太く）。</p>
<p><b>どこで聴かれるか</b>：</p>
<ul><li>小さなイヤホンは低音を再生できない。</li><li>クラブでは低音は中央に置くべき。</li><li><b>レコード</b>では、LとRでデチューンしたベースが針飛びの原因になる。</li></ul>`)
      },
      {
        h: T('Engordar el grave y darle presencia', 'Thickening the low end and adding presence', 'Tiefen andicken und Präsenz geben', '低音を太くし、存在感を与える'),
        b: T(`<ul><li><b>HP resonante que sigue la nota</b> (Cann): parece absurdo usar un pasa altos en un bajo, pero la resonancia realza la zona del corte. Si el corte sigue la nota, se realza <b>solo la fundamental</b> de cada nota. Un EQ no sigue la nota: daría graves "lanudos" y no reforzaría las notas agudas.</li>
<li><b>Seno agregado</b>: suma sub-graves sin cambiar el tono. Comprobalo en monitores de rango completo.</li>
<li><b>Sub-oscilador</b> cuadrado una octava abajo y filtrado: engorda, pero <b>cambia el carácter</b>.</li>
<li><b>Sub-bajo</b> (Hewitt): seno, o dos triángulos con LP para dejar apenas armónicos que den calidez. Algo de release, EQ grave moderado y un limitador con ataque y release lentos. "Si no te vibra el pecho, no está pasando."</li></ul>
<p>Si el bajo <b>se siente pero no se oye</b>, Cann propone tres caminos:</p>
<ul><li>Abrir el filtro.</li><li>Duplicar el oscilador <b>una octava arriba</b>.</li><li>Una <b>distorsión dosificada</b> por envío: a niveles bajos solo agrega brillo.</li></ul>
<p>Los tres ocupan más espectro, así que decidí en contexto. Y la regla de Hewitt: <b>nada de estéreo en los graves</b>. Si les ponés reverb, que sea chica, con damping máximo y sin ancho.</p>`,
          `<ul><li><b>Key-tracked resonant HP</b> (Cann): a high-pass on a bass sounds absurd, but resonance boosts the cutoff region. If the cutoff follows the note, you boost <b>only each note's fundamental</b>. An EQ doesn't follow the note: it would give woolly lows and wouldn't reinforce the higher notes.</li>
<li><b>An added sine</b>: adds sub weight without changing the tone. Check it on full-range monitors.</li>
<li><b>A square sub-oscillator</b> an octave down, filtered: thickens, but <b>changes the character</b>.</li>
<li><b>Sub-bass</b> (Hewitt): a sine, or two triangles through an LP to leave just enough harmonics for warmth. Some release, moderate low EQ and a limiter with slow attack and release. "If your chest isn't vibrating, it isn't happening."</li></ul>
<p>If the bass is <b>felt but not heard</b>, Cann suggests three routes:</p>
<ul><li>Open the filter.</li><li>Double the oscillator <b>an octave up</b>.</li><li>Use <b>measured distortion</b> on a send: at low levels it only adds brightness.</li></ul>
<p>All three take up more spectrum, so decide in context. And Hewitt's rule: <b>no stereo in the lows</b>. If you add reverb, keep it small, with damping at max and no width.</p>`,
          `<ul><li><b>Mitlaufender resonanter Hochpass</b> (Cann): Ein Hochpass auf einem Bass klingt absurd, aber die Resonanz hebt den Cutoff-Bereich an. Folgt der Cutoff der Note, wird <b>nur der Grundton jeder Note</b> betont. Ein EQ folgt der Note nicht: Er gäbe wollige Tiefen und würde hohe Noten nicht stützen.</li>
<li><b>Zusätzlicher Sinus</b>: bringt Sub-Gewicht, ohne den Ton zu ändern. Auf Vollbereichsmonitoren prüfen.</li>
<li><b>Rechteck-Suboszillator</b> eine Oktave tiefer, gefiltert: dickt an, <b>verändert aber den Charakter</b>.</li>
<li><b>Sub-Bass</b> (Hewitt): Sinus, oder zwei Dreiecke durch einen Tiefpass, sodass gerade genug Obertöne für Wärme bleiben. Etwas Release, mäßiger Tiefen-EQ und ein Limiter mit langsamem Attack und Release. „Wenn deine Brust nicht vibriert, passiert nichts."</li></ul>
<p>Wird der Bass <b>gespürt, aber nicht gehört</b>, schlägt Cann drei Wege vor:</p>
<ul><li>Den Filter öffnen.</li><li>Den Oszillator <b>eine Oktave höher</b> doppeln.</li><li><b>Dosierte Verzerrung</b> über einen Send: Bei niedrigen Pegeln bringt sie nur Helligkeit.</li></ul>
<p>Alle drei belegen mehr Spektrum, also im Kontext entscheiden. Und Hewitts Regel: <b>kein Stereo in den Tiefen</b>. Falls Hall, dann klein, mit maximalem Damping und ohne Breite.</p>`,
          `<ul><li><b>キー追従するレゾナントHP</b>（キャン）：ベースにハイパスをかけるのはおかしく思えるが、レゾナンスはカットオフ付近を持ち上げる。カットオフが音程に追従すれば、<b>各音の基音だけ</b>が強調される。EQは音程に追従しないので、低音がもこもこするうえ、高い音は補強されない。</li>
<li><b>サイン波を足す</b>：音色を変えずにサブの重みを加える。フルレンジのモニターで確認すること。</li>
<li>1オクターブ下の<b>矩形波サブオシレーター</b>をフィルターに通す：太くなるが<b>キャラクターも変わる</b>。</li>
<li><b>サブベース</b>（ヒューイット）：サイン波、または三角波2つをLPに通し、温かさのための倍音だけを残す。少しのリリース、控えめな低域EQ、アタックとリリースの遅いリミッター。「胸が震えなければ、何も起きていない。」</li></ul>
<p>ベースが<b>体には感じるのに聞こえない</b>なら、キャンは3つの道を示します。</p>
<ul><li>フィルターを開く。</li><li>オシレーターを<b>1オクターブ上</b>で重ねる。</li><li>センドで<b>控えめに歪ませる</b>：低いレベルなら明るさを足すだけ。</li></ul>
<p>どれもスペクトルを多く占めるので、文脈の中で判断しましょう。そしてヒューイットのルール：<b>低音にステレオは使わない</b>。リバーブをかけるなら、小さく、ダンピング最大で、幅なしに。</p>`)
      },
      {
        h: T('Reverb y delay sin barro', 'Reverb and delay without mud', 'Hall und Delay ohne Matsch', '濁らないリバーブとディレイ'),
        b: T(`<p><b>Insert o envío</b>:</p>
<ul><li>Como <b>insert</b>, todo el audio pasa por el efecto: distorsión, EQ, compresión.</li>
<li>Como <b>envío</b>, se suma una señal procesada a la seca: chorus, delay, reverb. Una reverb externa compartida es más eficiente y suele sonar mejor que una por sinte.</li></ul>
<p><b>Ducking</b> (Cann): la reverb se escala con la velocidad y además se <b>apaga mientras la tecla está apretada</b>. Se hace con una envolvente con A y R cortos y sustain 100%, aplicada en negativo al nivel de la reverb. Al soltar queda un "halo" que no embarra.</p>
<p><b>Delay</b>: los ecos deben ser <b>más opacos</b> que el original para sonar naturales. Para domarlos:</p>
<ul><li>Bajar el feedback.</li><li>Filtrar los ecos con HP y LP.</li><li>Aplicarles ducking.</li></ul>
<p>Cann prefiere el delay a la reverb porque ocupa menos y tiene más carácter, y a veces aplica reverb <b>solo a los ecos</b> para empujarlos hacia atrás.</p>
<p>Hewitt suma tres consejos:</p>
<ul><li>Ajustá la reverb con el wet al 100% y dejá el nivel para el final.</li><li>El <b>orden importa</b>: delay → reverb no es igual que reverb → delay.</li><li>El chorus se percibe distinto según el retardo: menos de 10 ms = un solo sonido; 10–50 ms = dos sonidos fundidos; más de 50 ms = dos sonidos separados (eco).</li></ul>
<p>Todos los efectos de modulación <b>brillan y engordan</b>: cuidado en sonidos de fondo.</p>`,
          `<p><b>Insert or send</b>:</p>
<ul><li>As an <b>insert</b>, all the audio passes through the effect: distortion, EQ, compression.</li>
<li>As a <b>send</b>, a processed signal is added to the dry one: chorus, delay, reverb. One shared external reverb is more efficient and usually sounds better than one per synth.</li></ul>
<p><b>Ducking</b> (Cann): the reverb scales with velocity and is also <b>muted while the key is held</b>. It's done with an envelope with short A and R and 100% sustain, applied negatively to the reverb level. On release a "halo" remains that doesn't muddy.</p>
<p><b>Delay</b>: echoes should be <b>duller</b> than the source to sound natural. To tame them:</p>
<ul><li>Lower the feedback.</li><li>Filter the echoes with HP and LP.</li><li>Duck them.</li></ul>
<p>Cann prefers delay to reverb because it takes up less space and has more character, and he sometimes puts reverb <b>only on the echoes</b> to push them back.</p>
<p>Hewitt adds three tips:</p>
<ul><li>Set the reverb with wet at 100% and leave the level for last.</li><li><b>Order matters</b>: delay → reverb is not the same as reverb → delay.</li><li>Chorus is perceived differently by delay time: under 10 ms = one sound; 10–50 ms = two sounds fused; over 50 ms = two separate sounds (echo).</li></ul>
<p>All modulation effects <b>brighten and thicken</b>: careful on background sounds.</p>`,
          `<p><b>Insert oder Send</b>:</p>
<ul><li>Als <b>Insert</b> läuft das gesamte Audio durch den Effekt: Verzerrung, EQ, Kompression.</li>
<li>Als <b>Send</b> wird ein bearbeitetes Signal zum trockenen addiert: Chorus, Delay, Hall. Ein gemeinsamer externer Hall ist effizienter und klingt meist besser als einer pro Synth.</li></ul>
<p><b>Ducking</b> (Cann): Der Hall skaliert mit der Velocity und wird zusätzlich <b>stummgeschaltet, solange die Taste gedrückt ist</b>. Das geht mit einer Hüllkurve mit kurzem A und R und 100 % Sustain, negativ auf den Hallpegel geroutet. Beim Loslassen bleibt ein „Halo", der nicht matscht.</p>
<p><b>Delay</b>: Echos sollten <b>dumpfer</b> als das Original sein, um natürlich zu klingen. Zum Bändigen:</p>
<ul><li>Feedback senken.</li><li>Echos mit Hoch- und Tiefpass filtern.</li><li>Ducking anwenden.</li></ul>
<p>Cann zieht Delay dem Hall vor, weil es weniger Platz braucht und mehr Charakter hat, und legt manchmal Hall <b>nur auf die Echos</b>, um sie nach hinten zu schieben.</p>
<p>Hewitt ergänzt drei Tipps:</p>
<ul><li>Den Hall bei 100 % Wet einstellen und den Pegel zuletzt setzen.</li><li>Die <b>Reihenfolge zählt</b>: Delay → Hall ist nicht dasselbe wie Hall → Delay.</li><li>Chorus wird je nach Verzögerung anders wahrgenommen: unter 10 ms = ein Klang; 10–50 ms = zwei verschmolzene Klänge; über 50 ms = zwei getrennte Klänge (Echo).</li></ul>
<p>Alle Modulationseffekte <b>hellen auf und dicken an</b>: Vorsicht bei Hintergrundklängen.</p>`,
          `<p><b>インサートかセンドか</b>：</p>
<ul><li><b>インサート</b>では、すべての音声がエフェクトを通る：ディストーション、EQ、コンプ。</li>
<li><b>センド</b>では、処理した信号をドライ音に足す：コーラス、ディレイ、リバーブ。共有の外部リバーブ1台のほうが効率的で、シンセごとに1台使うより良い音になることが多い。</li></ul>
<p><b>ダッキング</b>（キャン）：リバーブ量をベロシティで変え、さらに<b>鍵盤を押している間はミュート</b>します。AとRが短くサステイン100%のエンベロープを、リバーブのレベルにマイナス方向で掛けて実現します。鍵盤を離すと、濁らない「余韻」だけが残ります。</p>
<p><b>ディレイ</b>：自然に聞こえるには、エコーは原音より<b>暗く</b>あるべきです。抑えるには：</p>
<ul><li>フィードバックを下げる。</li><li>エコーをHPとLPでフィルターする。</li><li>ダッキングする。</li></ul>
<p>キャンは場所を取らず個性も強いディレイをリバーブより好み、時にはエコー<b>だけに</b>リバーブをかけて奥へ押しやります。</p>
<p>ヒューイットの3つのヒント：</p>
<ul><li>リバーブはウェット100%で設定し、レベルは最後に決める。</li><li><b>順序が重要</b>：ディレイ→リバーブとリバーブ→ディレイは同じではない。</li><li>コーラスは遅延時間で聞こえ方が変わる：10 ms未満＝ひとつの音、10〜50 ms＝溶け合った2つの音、50 ms超＝分離した2つの音（エコー）。</li></ul>
<p>すべてのモジュレーション系エフェクトは<b>音を明るく太く</b>します。背景の音には注意しましょう。</p>`)
      },
      {
        h: T('Compresión, sidechain y distorsión', 'Compression, sidechain and distortion', 'Kompression, Sidechain und Verzerrung', 'コンプレッション、サイドチェイン、ディストーション'),
        b: T(`<p><b>Compresor</b> (Hewitt): parámetros umbral, ratio, ataque y release. Con ratio 4:1 pasa un cuarto del exceso sobre el umbral. Un ataque rápido con un umbral bajo produce un "bombeo" sucio.</p>
<ul><li>El <b>sidechain</b> desde el bombo hace "rebotar" el sinte con el beat.</li>
<li>El <b>limitador</b> fija un techo: es una herramienta bruta, clave en el mastering.</li>
<li>Cann advierte que la compresión engorda y da punch, pero aplana los matices armónicos y hace que el sonido domine la mezcla.</li>
<li>En su "Bad Guitar" usa el compresor como limitador (50:1, +12 dB) para <b>devolver la energía</b> que dos filtros le quitaron.</li></ul>
<p><b>Distorsión</b> (Cann), de menos a más:</p>
<ol><li>Calienta y comprime.</li><li>Suena "vintage" (recorta agudos).</li><li>Se rompe (útil para efectos).</li><li>Overdrive musical.</li><li>Distorsión total, difícil de controlar.</li></ol>
<p>Para guitarras, recordá que los parlantes de guitarra cortan por encima de ~<b>4 kHz</b>: filtrá o simulá gabinete. Para realismo, controlá la <b>cantidad de distorsión con la velocidad</b>, además del volumen. Y un truco: un <b>seno agudo con ataque de 5 s</b> (o en la rueda) simula el feedback de una guitarra.</p>`,
          `<p><b>Compressor</b> (Hewitt): threshold, ratio, attack and release. At 4:1, a quarter of the excess above the threshold gets through. A fast attack with a low threshold gives dirty "pumping".</p>
<ul><li><b>Sidechain</b> from the kick makes the synth "bounce" with the beat.</li>
<li>The <b>limiter</b> sets a ceiling: a blunt tool, key in mastering.</li>
<li>Cann warns that compression fattens and adds punch, but flattens harmonic nuance and makes the sound dominate the mix.</li>
<li>In his "Bad Guitar" he uses the compressor as a limiter (50:1, +12 dB) to <b>restore the energy</b> two filters took away.</li></ul>
<p><b>Distortion</b> (Cann), from least to most:</p>
<ol><li>Warms and compresses.</li><li>Sounds "vintage" (trims the highs).</li><li>Breaks up (useful for effects).</li><li>Musical overdrive.</li><li>Full distortion, hard to control.</li></ol>
<p>For guitars, remember guitar speakers cut above ~<b>4 kHz</b>: filter or simulate a cabinet. For realism, drive the <b>amount of distortion from velocity</b>, as well as the volume. And a trick: a <b>high sine with a 5 s attack</b> (or on the wheel) simulates guitar feedback.</p>`,
          `<p><b>Kompressor</b> (Hewitt): Threshold, Ratio, Attack und Release. Bei 4:1 kommt ein Viertel des Überschusses über dem Threshold durch. Schneller Attack mit niedrigem Threshold ergibt schmutziges „Pumpen".</p>
<ul><li><b>Sidechain</b> von der Bassdrum lässt den Synth mit dem Beat „federn".</li>
<li>Der <b>Limiter</b> setzt eine Decke: ein grobes Werkzeug, zentral im Mastering.</li>
<li>Cann warnt: Kompression macht fetter und gibt Punch, ebnet aber harmonische Nuancen ein und lässt den Klang den Mix dominieren.</li>
<li>In seinem „Bad Guitar" nutzt er den Kompressor als Limiter (50:1, +12 dB), um die <b>Energie zurückzugeben</b>, die zwei Filter genommen haben.</li></ul>
<p><b>Verzerrung</b> (Cann), von wenig nach viel:</p>
<ol><li>Wärmt und komprimiert.</li><li>Klingt „vintage" (beschneidet die Höhen).</li><li>Bricht auf (nützlich für Effekte).</li><li>Musikalischer Overdrive.</li><li>Volle Verzerrung, schwer zu kontrollieren.</li></ol>
<p>Bei Gitarren daran denken, dass Gitarrenlautsprecher oberhalb von ~<b>4 kHz</b> abschneiden: filtern oder ein Gehäuse simulieren. Für Realismus die <b>Verzerrungsmenge über Velocity</b> steuern, nicht nur die Lautstärke. Und ein Trick: Ein <b>hoher Sinus mit 5 s Attack</b> (oder auf dem Modrad) simuliert Gitarrenfeedback.</p>`,
          `<p><b>コンプレッサー</b>（ヒューイット）：スレッショルド、レシオ、アタック、リリース。4:1ならスレッショルドを超えた分の4分の1が通る。速いアタックと低いスレッショルドは汚い「ポンピング」を生む。</p>
<ul><li>キックからの<b>サイドチェイン</b>で、シンセがビートに合わせて「弾む」。</li>
<li><b>リミッター</b>は天井を設定する。粗い道具だが、マスタリングでは重要。</li>
<li>キャンの警告：コンプは音を太くしパンチを与えるが、倍音の微妙な変化を平らにし、音をミックスで支配的にする。</li>
<li>彼の「Bad Guitar」では、コンプをリミッター（50:1、+12 dB）として使い、2つのフィルターが奪った<b>エネルギーを取り戻して</b>いる。</li></ul>
<p><b>ディストーション</b>（キャン）、弱いものから強いものへ：</p>
<ol><li>温かくし、圧縮する。</li><li>「ヴィンテージ」に聞こえる（高域を削る）。</li><li>音が割れる（効果音向き）。</li><li>音楽的なオーバードライブ。</li><li>完全なディストーション、制御が難しい。</li></ol>
<p>ギターでは、ギター用スピーカーが約<b>4 kHz</b>以上をカットすることを思い出しましょう。フィルターをかけるか、キャビネットをシミュレートします。リアルさを出すには、音量だけでなく<b>歪みの量もベロシティで</b>制御すること。そしてコツ：<b>アタック5秒の高いサイン波</b>（またはホイールで操作）でギターのフィードバックを模倣できます。</p>`)
      }
    ],
    ex: {
      es: ['Lab Bajo en contexto, modo rítmico: tocá solo decay, sustain y cantidad hasta que groovee. Compará decay 0,05 s y 0,6 s y anotá cuál funciona a 122 BPM.', 'Modo armónico con el "Acorde C-E-G" activado: escuchá cómo el La del bajo convierte el acorde en Am7. Subí el ataque para que el bajo deje de marcar ritmo.', 'Engordar: compará el seno sub, la sub cuadrada y el realce de fundamental. ¿Cuál cambia el tono y cuál no? Repetilo en parlantes chicos o con el volumen bajo.', 'Activá el sidechain y escuchá cómo cambia la sensación de groove. ¿Qué pasa si el bajo ya tiene un decay corto?', 'Lab Efectos: poné reverb larga en un pluck y bajá el wet hasta que deje de embarrar. Después reemplazala por delay con feedback bajo. ¿Cuál se mezcla mejor?', 'Presencia: subí la distorsión de a poco y anotá el punto donde el bajo "se oye" a volumen bajo sin cambiar su carácter.'],
      en: ['Bass in context lab, rhythmic mode: touch only decay, sustain and amount until it grooves. Compare decay 0.05 s and 0.6 s and note which works at 122 BPM.', 'Harmonic mode with the "C-E-G chord" on: hear how the bass A turns the chord into Am7. Raise the attack so the bass stops marking the rhythm.', 'Thickening: compare the sine sub, the square sub and the fundamental boost. Which changes the tone and which doesn\'t? Repeat on small speakers or at low volume.', 'Enable sidechain and hear how the groove changes. What happens if the bass already has a short decay?', 'Effects lab: put a long reverb on a pluck and lower the wet until it stops muddying. Then replace it with a low-feedback delay. Which sits better?', 'Presence: raise the distortion gradually and note where the bass becomes audible at low volume without changing its character.'],
      de: ['Labor Bass im Kontext, rhythmischer Modus: Nur Decay, Sustain und Menge verändern, bis es groovt. Decay 0,05 s und 0,6 s vergleichen und notieren, was bei 122 BPM funktioniert.', 'Harmonischer Modus mit „C-E-G-Akkord": Hören, wie das A im Bass den Akkord zu a-Moll 7 macht. Attack erhöhen, damit der Bass keinen Rhythmus mehr markiert.', 'Andicken: Sinus-Sub, Rechteck-Sub und Grundton-Anhebung vergleichen. Was ändert den Ton, was nicht? Auf kleinen Lautsprechern oder leise wiederholen.', 'Sidechain aktivieren und hören, wie sich der Groove verändert. Was passiert, wenn der Bass schon einen kurzen Decay hat?', 'Effekt-Labor: Langen Hall auf einen Pluck legen und Wet senken, bis es nicht mehr matscht. Dann durch Delay mit wenig Feedback ersetzen. Was sitzt besser?', 'Präsenz: Verzerrung langsam erhöhen und notieren, ab wann der Bass leise hörbar wird, ohne seinen Charakter zu verlieren.'],
      ja: ['「文脈の中のベース」ラボ、リズム・モード：グルーヴするまでディケイ、サステイン、量だけを動かす。ディケイ0.05秒と0.6秒を比べ、122 BPMでどちらが機能するか記録する。', 'ハーモニー・モードで「C-E-Gコード」をオン：ベースのAがコードをAm7に変えるのを聴く。アタックを上げてベースがリズムを刻まないようにする。', '太くする：サイン・サブ、矩形サブ、基音ブーストを比べる。どれが音色を変え、どれが変えない？小さなスピーカーか小音量でも試す。', 'サイドチェインをオンにして、グルーヴ感がどう変わるか聴く。ベースのディケイがすでに短い場合はどうなる？', 'エフェクト・ラボ：プラックに長いリバーブをかけ、濁らなくなるまでウェットを下げる。次にフィードバックの少ないディレイに置き換える。どちらが馴染む？', '存在感：歪みを少しずつ上げ、キャラクターを変えずに小音量でベースが聞こえ始める点を記録する。']
    },
    deep: {
      es: `<h3>Enmascaramiento y bandas críticas</h3>
<p>Dos sonidos dentro de la misma banda crítica compiten, y el más fuerte oculta al otro. El enmascaramiento se extiende más hacia los agudos que hacia los graves: un bajo fuerte puede enmascarar los medios-bajos de otras partes. Por eso recortar graves "inaudibles" con un HP limpia tanto la mezcla.</p>
<h3>La fundamental ausente</h3>
<p>Si un parlante no reproduce 50 Hz pero sí 100, 150 y 200 Hz, el cerebro <b>reconstruye</b> la fundamental de 50 Hz a partir de sus armónicos. Por eso la octava superior o una distorsión leve hacen que un bajo "se oiga" en auriculares chicos: agregan armónicos que implican la nota.</p>
<h3>Curvas de igual sonoridad</h3>
<p>Fletcher–Munson y la norma ISO 226 muestran que a volumen bajo el oído pierde sensibilidad en los graves. Revisá tus bajos a varios volúmenes. Un bajo que solo funciona fuerte probablemente necesite más armónicos, no más graves.</p>
<h3>Por qué mono en los graves</h3>
<p>Dos osciladores desafinados repartidos entre L y R generan diferencias de fase que cambian en el tiempo. Al sumarse a mono (club, celular) se cancelan a ratos, y en un vinilo se traducen en movimiento vertical de la púa.</p>`,
      en: `<h3>Masking and critical bands</h3>
<p>Two sounds within the same critical band compete, and the louder hides the other. Masking spreads more upward than downward: a loud bass can mask the low-mids of other parts. That's why cutting "inaudible" lows with an HP cleans up a mix so much.</p>
<h3>The missing fundamental</h3>
<p>If a speaker can't reproduce 50 Hz but does reproduce 100, 150 and 200 Hz, the brain <b>reconstructs</b> the 50 Hz fundamental from its harmonics. That's why an octave up or mild distortion makes a bass audible on small earbuds: they add harmonics that imply the note.</p>
<h3>Equal-loudness curves</h3>
<p>Fletcher–Munson and ISO 226 show that at low volume the ear loses sensitivity in the lows. Check your basses at several volumes. A bass that only works loud probably needs more harmonics, not more lows.</p>
<h3>Why the lows stay mono</h3>
<p>Two detuned oscillators spread across L and R create phase differences that change over time. Summed to mono (club, phone) they cancel intermittently, and on vinyl they turn into vertical needle movement.</p>`,
      de: `<h3>Verdeckung und kritische Bänder</h3>
<p>Zwei Klänge im selben kritischen Band konkurrieren, und der lautere verdeckt den anderen. Verdeckung reicht stärker nach oben als nach unten: Ein lauter Bass kann die unteren Mitten anderer Stimmen verdecken. Deshalb räumt das Kappen „unhörbarer" Tiefen mit einem Hochpass den Mix so sehr auf.</p>
<h3>Der fehlende Grundton</h3>
<p>Gibt ein Lautsprecher 50 Hz nicht wieder, wohl aber 100, 150 und 200 Hz, <b>rekonstruiert</b> das Gehirn den 50-Hz-Grundton aus seinen Obertönen. Deshalb machen eine höhere Oktave oder leichte Verzerrung einen Bass auf kleinen Ohrhörern hörbar: Sie fügen Obertöne hinzu, die den Ton implizieren.</p>
<h3>Kurven gleicher Lautheit</h3>
<p>Fletcher–Munson und ISO 226 zeigen, dass das Ohr bei geringer Lautstärke in den Tiefen an Empfindlichkeit verliert. Prüfe deine Bässe bei verschiedenen Lautstärken. Ein Bass, der nur laut funktioniert, braucht wohl mehr Obertöne, nicht mehr Tiefen.</p>
<h3>Warum Mono in den Tiefen</h3>
<p>Zwei verstimmte, auf L und R verteilte Oszillatoren erzeugen sich zeitlich ändernde Phasendifferenzen. In Mono summiert (Club, Handy) löschen sie sich zeitweise aus, und auf Vinyl werden sie zu vertikaler Nadelbewegung.</p>`,
      ja: `<h3>マスキングと臨界帯域</h3>
<p>同じ臨界帯域にある2つの音は競合し、大きいほうがもう一方を隠します。マスキングは下方向より上方向に広がるため、大きなベースは他のパートの中低域をマスクすることがあります。HPで「聞こえない」低域を削るとミックスが大きく整理されるのはこのためです。</p>
<h3>ミッシング・ファンダメンタル</h3>
<p>スピーカーが50 Hzを再生できなくても100、150、200 Hzを再生できれば、脳は倍音から50 Hzの基音を<b>再構成</b>します。1オクターブ上を重ねたり軽く歪ませたりすると小さなイヤホンでもベースが聞こえるのは、その音を示す倍音が加わるからです。</p>
<h3>等ラウドネス曲線</h3>
<p>フレッチャー＝マンソン曲線とISO 226は、小音量では耳の低域感度が下がることを示しています。ベースは複数の音量で確認しましょう。大音量でしか機能しないベースに必要なのは、低域を増やすことではなく倍音を増やすことでしょう。</p>
<h3>低音をモノにする理由</h3>
<p>LとRに振り分けたデチューンの2つのオシレーターは、時間とともに変化する位相差を生みます。モノラル（クラブ、スマホ）に合算すると断続的に打ち消し合い、レコードでは針の上下動になります。</p>`
    },
    read: ['Simon Cann — <i>How To Make A Noise</i>, caps. 1, 6, 10, 11 y Refill #4', 'Ashley Hewitt — <i>How To Program Any Synthesizer</i>, caps. 13–19', 'Paul White & Matt Houghton — "What\'s The Frequency" (Sound On Sound)', 'Mike Senior — <i>Mixing Secrets for the Small Studio</i>'],
    quiz: [
      Q(T('Bajo rítmico que suena "flojo" y sin definición. ¿Qué ajustás primero?', 'A rhythmic bass sounds flabby and undefined. What do you adjust first?', 'Ein rhythmischer Bass klingt schlaff und undefiniert. Was stellst du zuerst ein?', 'リズム・ベースがだらしなく輪郭がない。最初に調整するのは？'),
        T(['El decay de la envolvente de filtro (más corto)', 'La reverb', 'El paneo', 'La afinación'], ['The filter envelope decay (shorter)', 'The reverb', 'The pan', 'The tuning'], ['Den Decay der Filterhüllkurve (kürzer)', 'Den Hall', 'Das Panorama', 'Die Stimmung'], ['フィルター・エンベロープのディケイ（短く）', 'リバーブ', 'パン', 'チューニング']), 0,
        T('Ese decay define el largo aparente de la nota.', 'That decay sets the apparent length of the note.', 'Dieser Decay bestimmt die gefühlte Notenlänge.', 'このディケイが音の見かけの長さを決める。')),
      Q(T('¿Por qué conviene un bajo centrado en un vinilo?', 'Why should the bass be centred on vinyl?', 'Warum sollte der Bass auf Vinyl mittig sein?', 'レコードでベースを中央に置くべき理由は？'),
        T(['Un bajo desfasado entre L y R puede hacer saltar la púa', 'Suena más fuerte', 'Por reglamento', 'Para que haya eco'], ['A bass out of phase between L and R can make the needle jump', 'It sounds louder', 'It\'s a regulation', 'To create an echo'], ['Ein zwischen L und R phasenverschobener Bass kann die Nadel springen lassen', 'Er klingt lauter', 'Vorschrift', 'Damit ein Echo entsteht'], ['LとRで位相がずれたベースは針飛びを起こしうる', '音が大きくなる', '規則だから', 'エコーを作るため']), 0,
        T('Las diferencias de fase se convierten en movimiento vertical del surco.', 'Phase differences turn into vertical groove movement.', 'Phasendifferenzen werden zu vertikaler Rillenbewegung.', '位相差が溝の上下動になる。')),
      Q(T('¿Qué hace un HP resonante con seguimiento de teclado en un bajo?', 'What does a key-tracked resonant HP do on a bass?', 'Was bewirkt ein mitlaufender resonanter Hochpass bei einem Bass?', 'ベースにキー追従のレゾナントHPをかけると？'),
        T(['Realza solo la fundamental de cada nota', 'Quita todos los graves', 'Agrega reverb', 'Desafina'], ['Boosts only each note\'s fundamental', 'Removes all the lows', 'Adds reverb', 'Detunes it'], ['Hebt nur den Grundton jeder Note an', 'Entfernt alle Tiefen', 'Fügt Hall hinzu', 'Verstimmt ihn'], ['各音の基音だけを強調する', '低音をすべて取り除く', 'リバーブを加える', 'デチューンする']), 0,
        T('El pico de resonancia acompaña a cada nota, algo que un EQ fijo no hace.', 'The resonant peak follows each note, which a fixed EQ can\'t do.', 'Die Resonanzspitze folgt jeder Note, was ein fester EQ nicht kann.', 'レゾナンスのピークが各音に追従する。固定EQにはできないこと。')),
      Q(T('¿Qué es el ducking de reverb que propone Cann?', 'What is the reverb ducking Cann proposes?', 'Was ist das Hall-Ducking, das Cann vorschlägt?', 'キャンが提案するリバーブのダッキングとは？'),
        T(['La reverb baja mientras suena la nota y deja un halo al soltar', 'La reverb sube con la nota', 'Se apaga para siempre', 'Se invierte la reverb'], ['The reverb drops while the note plays and leaves a halo on release', 'The reverb rises with the note', 'It switches off for good', 'The reverb is reversed'], ['Der Hall sinkt, während die Note klingt, und hinterlässt beim Loslassen einen Halo', 'Der Hall steigt mit der Note', 'Er schaltet sich dauerhaft ab', 'Der Hall wird umgekehrt'], ['音が鳴っている間はリバーブが下がり、離すと余韻が残る', '音とともにリバーブが上がる', '永久にオフになる', 'リバーブを反転する']), 0,
        T('Da espacio sin embarrar la parte mientras se toca.', 'It adds space without muddying the part while it plays.', 'Es schafft Raum, ohne die Stimme beim Spielen zu vermatschen.', '演奏中のパートを濁らせずに空間を加える。')),
      Q(T('Un chorus con más de 50 ms de retardo se percibe como…', 'A chorus with more than 50 ms of delay is perceived as…', 'Ein Chorus mit mehr als 50 ms Verzögerung wird wahrgenommen als…', '50 msを超える遅延のコーラスはどう聞こえる？'),
        T(['Un solo sonido', 'Dos sonidos separados (eco)', 'Vibrato', 'Un filtro'], ['A single sound', 'Two separate sounds (echo)', 'Vibrato', 'A filter'], ['Ein einziger Klang', 'Zwei getrennte Klänge (Echo)', 'Vibrato', 'Ein Filter'], ['ひとつの音', '分離した2つの音（エコー）', 'ビブラート', 'フィルター']), 1,
        T('Menos de 10 ms se funde en uno; entre 10 y 50 ms, dos sonidos fundidos (Hewitt).', 'Under 10 ms fuses into one; between 10 and 50 ms, two fused sounds (Hewitt).', 'Unter 10 ms verschmilzt es zu einem; 10–50 ms ergeben zwei verschmolzene Klänge (Hewitt).', '10 ms未満はひとつに溶け、10〜50 msは溶け合った2つの音になる（ヒューイット）。')),
      Q(T('Do-Mi-Sol con La en el bajo forman…', 'C-E-G with A in the bass make…', 'C-E-G mit A im Bass ergeben…', 'C-E-GにAのベースを加えると？'),
        T(['Do mayor', 'La menor 7', 'Fa mayor', 'Sol 7'], ['C major', 'A minor 7', 'F major', 'G7'], ['C-Dur', 'a-Moll 7', 'F-Dur', 'G7'], ['Cメジャー', 'Am7', 'Fメジャー', 'G7']), 1,
        T('El bajo armónico define el acorde: por eso debe tener una altura clara.', 'The harmonic bass defines the chord, so it needs a clear pitch.', 'Der harmonische Bass bestimmt den Akkord und braucht daher eine klare Tonhöhe.', 'ハーモニー・ベースがコードを決めるので、音程がはっきりしている必要がある。'))
    ]
  });
})();
