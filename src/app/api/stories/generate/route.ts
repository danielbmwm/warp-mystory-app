import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import type { Genre } from '@/types';
import { GENRES, STORY_LENGTHS } from '@/constants';

// Initialize OpenAI (with null check)
let openai: OpenAI | null = null;

if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received request body:', JSON.stringify(body, null, 2));
    
    const { childName, childAge, genre, length, customPrompt, isInteractive } = body;
    
    // Validation
    if (!childName || typeof childName !== 'string' || childName.trim().length === 0) {
      console.log('Validation failed - invalid childName:', childName);
      return NextResponse.json(
        { error: 'Gültiger Name des Kindes ist erforderlich' },
        { status: 400 }
      );
    }
    
    if (!childAge || typeof childAge !== 'number' || isNaN(childAge) || childAge < 3 || childAge > 10) {
      console.log('Validation failed - invalid childAge:', childAge);
      return NextResponse.json(
        { error: 'Gültiges Alter (3-10 Jahre) ist erforderlich' },
        { status: 400 }
      );
    }
    
    if (!genre || typeof genre !== 'string') {
      console.log('Validation failed - invalid genre:', genre);
      return NextResponse.json(
        { error: 'Genre ist erforderlich' },
        { status: 400 }
      );
    }
    
    if (!length || typeof length !== 'string') {
      console.log('Validation failed - invalid length:', length);
      return NextResponse.json(
        { error: 'Geschichtenlänge ist erforderlich' },
        { status: 400 }
      );
    }
    
    if (!GENRES[genre as Genre]) {
      return NextResponse.json(
        { error: 'Ungültiges Genre' },
        { status: 400 }
      );
    }
    
    if (!STORY_LENGTHS[length as keyof typeof STORY_LENGTHS]) {
      return NextResponse.json(
        { error: 'Ungültige Geschichtenlänge' },
        { status: 400 }
      );
    }
    
    // Get genre and length info
    const genreInfo = GENRES[genre as Genre];
    const lengthInfo = STORY_LENGTHS[length as keyof typeof STORY_LENGTHS];
    
    // Create the prompt for OpenAI
    const prompt = createStoryPrompt({
      childName,
      childAge,
      genreInfo,
      lengthInfo,
      customPrompt,
      isInteractive
    });
    
    let story: string;
    
    if (!openai) {
      // Development fallback when OpenAI API key is not available
      console.log('OpenAI API key not found, using development fallback...');
      story = generateFallbackStory(childName, childAge, genreInfo, lengthInfo, customPrompt);
    } else {
      console.log('Generating story with OpenAI...');
      
      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Du bist ein kreativer Kinderbuchautor, der personalisierte Geschichten für Kinder schreibt. Schreibe auf Deutsch und achte darauf, dass die Geschichten altersgerecht, fantasievoll und pädagogisch wertvoll sind.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      });
      
      const generatedStory = completion.choices[0]?.message?.content;
      
      if (!generatedStory) {
        throw new Error('Keine Geschichte von OpenAI erhalten');
      }
      
      story = generatedStory;
    }
    
    console.log('Story generated successfully');
    
    // Return the generated story
    return NextResponse.json({
      success: true,
      story: {
        title: `${childName}s ${genreInfo.name}-Abenteuer`,
        content: story,
        childName,
        childAge,
        genre,
        length,
        customPrompt,
        isInteractive,
        createdAt: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Story generation error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Fehler bei der Story-Generierung: ${error.message}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Unbekannter Fehler bei der Story-Generierung' },
      { status: 500 }
    );
  }
}

function createStoryPrompt({ 
  childName, 
  childAge, 
  genreInfo, 
  lengthInfo, 
  customPrompt, 
  isInteractive 
}: {
  childName: string;
  childAge: number;
  genreInfo: {
    name: string;
    description: string;
    themes: string[];
  };
  lengthInfo: {
    name: string;
    wordCount: { min: number; max: number };
    readingTime: string;
  };
  customPrompt?: string;
  isInteractive: boolean;
}): string {
  let prompt = `Schreibe eine ${genreInfo.name}-Geschichte für ${childName}, ${childAge} Jahre alt.

GENRE: ${genreInfo.name} (${genreInfo.description})
THEMEN: ${genreInfo.themes.join(', ')}
LÄNGE: ${lengthInfo.name} (${lengthInfo.wordCount.min}-${lengthInfo.wordCount.max} Wörter)
LESEZEIT: ${lengthInfo.readingTime}

ALTERSGERECHTE ANFORDERUNGEN für ${childAge}-Jährige:
`;

  // Age-appropriate guidelines
  if (childAge <= 4) {
    prompt += `- Einfache, kurze Sätze verwenden
- Viele beschreibende Worte für Bilder
- Wiederholungen und Reime einbauen
- Positive, beruhigende Botschaften`;
  } else if (childAge <= 7) {
    prompt += `- Klare, verständliche Sprache
- Einfache Handlungsstränge
- Lehrreiche Elemente einbauen
- Ermutigende Botschaften über Mut und Freundschaft`;
  } else {
    prompt += `- Etwas komplexere Handlung erlaubt
- Charakterentwicklung zeigen
- Problemlösungsansätze integrieren
- Moralische Lektionen subtil vermitteln`;
  }

  prompt += `

GESCHICHTE ANFORDERUNGEN:
- ${childName} ist die Hauptfigur und der Held der Geschichte
- Die Geschichte soll in der Ich-Perspektive oder mit ${childName} als Protagonist erzählt werden
- Verwende den Namen ${childName} regelmäßig in der Geschichte
- Die Geschichte soll spannend aber nicht beängstigend sein
- Integriere die Themen: ${genreInfo.themes.join(', ')}
- Zielwortanzahl: ${lengthInfo.wordCount.min}-${lengthInfo.wordCount.max} Wörter`;

  if (customPrompt) {
    prompt += `\n\nBESONDERE WÜNSCHE: ${customPrompt}`;
  }

  if (isInteractive) {
    prompt += `\n\nINTERAKTIV: Baue 2-3 Entscheidungspunkte in die Geschichte ein, wo ${childName} wählen kann, wie die Geschichte weitergeht.`;
  }

  prompt += `\n\nSchreibe jetzt eine vollständige, fesselnde Geschichte mit einem klaren Anfang, Mittelteil und Ende. Die Geschichte soll ${childName} inspirieren und unterhalten.`;

  return prompt;
}

function generateFallbackStory(
  childName: string,
  childAge: number,
  genreInfo: {
    name: string;
    description: string;
    themes: string[];
  },
  lengthInfo: {
    name: string;
    wordCount: { min: number; max: number };
    readingTime: string;
  },
  customPrompt?: string
): string {
  const stories = {
    adventure: `Es war einmal ein mutiges Kind namens ${childName}. An einem sonnigen Morgen beschloss ${childName}, ein großes Abenteuer zu erleben.

${childName} packte einen kleinen Rucksack mit den wichtigsten Sachen: ein Butterbrot, eine Wasserflasche und eine Karte. "Heute werde ich etwas Neues entdecken!", sagte ${childName} voller Vorfreude.

Auf dem Weg durch den nahegelegenen Wald hörte ${childName} ein leises Wimmern. Hinter einem großen Baum fand ${childName} ein kleines, verletztes Kaninchen. "Keine Sorge, kleiner Freund, ich helfe dir!", sprach ${childName} sanft.

Mit vorsichtigen Händen versorgte ${childName} die kleine Wunde des Kaninchens mit einem sauberen Tuch. Das Kaninchen sah ${childName} dankbar an und hoppelte fröhlich davon.

"Das war mein größtes Abenteuer!", dachte ${childName} glücklich. Manchmal sind die schönsten Abenteuer die, bei denen man anderen hilft.

Und so kehrte ${childName} nach Hause zurück, mit einem warmen Gefühl im Herzen und einer wunderbaren Geschichte zum Erzählen.`,
    
    'fairy-tale': `Es war einmal ein Kind namens ${childName}, das in einem kleinen Dorf lebte. Eines Tages entdeckte ${childName} im Garten einen glitzernden, magischen Stein.

Als ${childName} den Stein berührte, begann er zu leuchten und eine freundliche Fee erschien. "Hallo ${childName}!", sagte die Fee mit einer melodischen Stimme. "Du hast einen Wunsch frei!"

${childName} dachte lange nach. Was sollte ${childName} sich wünschen? Geld? Spielzeug? Nein! ${childName} hatte eine bessere Idee.

"Ich wünsche mir, dass alle Kinder in unserem Dorf glücklich sind und immer genug zu essen haben", sagte ${childName} mit leuchtenden Augen.

Die Fee lächelte warm. "Das ist der schönste Wunsch, den ich je gehört habe!" Mit einem Zauberspruch erfüllte sie ${childName}s Wunsch.

Von diesem Tag an war das Dorf der glücklichste Ort weit und breit, und ${childName} wurde als das Kind mit dem goldenen Herzen bekannt.

Und wenn sie nicht gestorben sind, dann leben sie noch heute glücklich und zufrieden.`,
    
    space: `Astronaut ${childName} stand vor dem glänzenden Raumschiff und war bereit für das Abenteuer des Lebens. "3, 2, 1... Start!", rief die Bodenkontrolle.

Mit einem lauten Rauschen hob das Raumschiff ab und ${childName} flog hinaus ins weite Weltall. Die Sterne funkelten wie Diamanten und die Erde sah aus wie eine wunderschöne blaue Murmel.

"Wow!", staunte ${childName}. "Das Weltall ist so schön!" Plötzlich entdeckte ${childName} einen kleinen, unbekannten Planeten mit bunten Ringen.

Neugierig landete ${childName} auf dem Planeten und traf dort freundliche Alien-Kinder, die genauso gerne spielten wie ${childName}. Obwohl sie anders aussahen, verstanden sie sich sofort.

Gemeinsam spielten sie Verstecken zwischen den Sternen und bauten Sandburgen aus Weltraumstaub. ${childName} lernte, dass Freundschaft überall im Universum zu finden ist.

Nach einem wundervollen Tag verabschiedete sich ${childName} von den neuen Freunden und flog sicher zurück zur Erde, mit vielen tollen Geschichten im Gepäck.`,
    
    default: `Dies ist eine Test-Geschichte für ${childName}, ${childAge} Jahre alt. In einer wundervollen Welt voller Abenteuer erlebt ${childName} spannende Geschichten und lernt dabei wichtige Lektionen über Mut, Freundschaft und Hilfsbereitschaft.`
  };
  
  const storyKey = genreInfo.name.toLowerCase().includes('abenteuer') ? 'adventure' : 
                   genreInfo.name.toLowerCase().includes('märchen') ? 'fairy-tale' : 
                   genreInfo.name.toLowerCase().includes('weltraum') ? 'space' : 'default';
  
  let story = stories[storyKey as keyof typeof stories] || stories.default;
  
  if (customPrompt) {
    story += `\n\nBesondere Wünsche: ${customPrompt}`;
  }
  
  return story;
}
