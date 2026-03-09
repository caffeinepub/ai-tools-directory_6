import Text "mo:core/Text";
import Array "mo:core/Array";
import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Char "mo:core/Char";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Order "mo:core/Order";



actor {
  type Tool = {
    id : Nat;
    name : Text;
    description : Text;
    category : Text;
    websiteUrl : Text;
    logoEmoji : Text;
    dateAdded : Int;
  };

  func sortByDateDescending(a : Tool, b : Tool) : Order.Order {
    Int.compare(b.dateAdded, a.dateAdded);
  };

  let day = 86_400_000_000_000; // 1 day in nanoseconds

  let seedTools : [Tool] = [
    // ── AI Chatbots ──────────────────────────────────────────────────────
    { id = 1; name = "ChatGPT"; description = "OpenAI's flagship conversational AI for answering questions, writing, coding, and analysis."; category = "AI Chatbots"; websiteUrl = "https://chat.openai.com"; logoEmoji = "🤖"; dateAdded = 1_740_000_000_000_000_000 - (1 * day) },
    { id = 2; name = "Claude"; description = "Anthropic's AI assistant built for nuanced, safe, and thoughtful long-form conversations."; category = "AI Chatbots"; websiteUrl = "https://claude.ai"; logoEmoji = "🧠"; dateAdded = 1_740_000_000_000_000_000 - (2 * day) },
    { id = 3; name = "Google Gemini"; description = "Google's multimodal AI that combines text, images, and search for powerful answers."; category = "AI Chatbots"; websiteUrl = "https://gemini.google.com"; logoEmoji = "✨"; dateAdded = 1_740_000_000_000_000_000 - (3 * day) },
    { id = 4; name = "Microsoft Copilot"; description = "Microsoft's AI assistant integrated into Windows, Office, and Bing for everyday productivity."; category = "AI Chatbots"; websiteUrl = "https://copilot.microsoft.com"; logoEmoji = "🪟"; dateAdded = 1_740_000_000_000_000_000 - (4 * day) },
    { id = 5; name = "Perplexity AI"; description = "AI-powered search engine that gives direct answers with cited sources in real time."; category = "AI Chatbots"; websiteUrl = "https://perplexity.ai"; logoEmoji = "🔍"; dateAdded = 1_740_000_000_000_000_000 - (5 * day) },
    { id = 6; name = "Meta AI"; description = "Meta's conversational AI assistant built into Facebook, Instagram, and WhatsApp."; category = "AI Chatbots"; websiteUrl = "https://meta.ai"; logoEmoji = "📘"; dateAdded = 1_740_000_000_000_000_000 - (6 * day) },
    { id = 7; name = "Grok"; description = "xAI's witty and real-time AI chatbot with access to live X (Twitter) data."; category = "AI Chatbots"; websiteUrl = "https://grok.x.ai"; logoEmoji = "⚡"; dateAdded = 1_740_000_000_000_000_000 - (7 * day) },
    { id = 8; name = "Pi by Inflection"; description = "A personal AI companion designed for supportive, emotionally intelligent conversations."; category = "AI Chatbots"; websiteUrl = "https://pi.ai"; logoEmoji = "🥧"; dateAdded = 1_740_000_000_000_000_000 - (8 * day) },
    { id = 9; name = "You.com"; description = "AI search and chat assistant that lets you customize your search experience with apps."; category = "AI Chatbots"; websiteUrl = "https://you.com"; logoEmoji = "🧩"; dateAdded = 1_740_000_000_000_000_000 - (9 * day) },
    { id = 10; name = "Character.AI"; description = "Create and chat with AI characters based on real or fictional personas."; category = "AI Chatbots"; websiteUrl = "https://character.ai"; logoEmoji = "🎭"; dateAdded = 1_740_000_000_000_000_000 - (10 * day) },
    { id = 11; name = "Mistral Le Chat"; description = "Mistral AI's fast and open-weight chat assistant with strong European privacy standards."; category = "AI Chatbots"; websiteUrl = "https://chat.mistral.ai"; logoEmoji = "💨"; dateAdded = 1_740_000_000_000_000_000 - (11 * day) },
    { id = 12; name = "HuggingChat"; description = "Open-source AI chat interface by Hugging Face, powered by community models."; category = "AI Chatbots"; websiteUrl = "https://huggingface.co/chat"; logoEmoji = "🤗"; dateAdded = 1_740_000_000_000_000_000 - (12 * day) },
    { id = 13; name = "Poe"; description = "Quora's platform to chat with multiple AI models including GPT-4, Claude, and Llama."; category = "AI Chatbots"; websiteUrl = "https://poe.com"; logoEmoji = "📜"; dateAdded = 1_740_000_000_000_000_000 - (13 * day) },
    { id = 14; name = "Khanmigo"; description = "Khan Academy's AI tutor that guides students through subjects with Socratic questioning."; category = "AI Chatbots"; websiteUrl = "https://khanacademy.org/khanmigo"; logoEmoji = "🎓"; dateAdded = 1_740_000_000_000_000_000 - (14 * day) },
    { id = 15; name = "DeepSeek Chat"; description = "China's powerful open-source AI model with strong reasoning and coding capabilities."; category = "AI Chatbots"; websiteUrl = "https://chat.deepseek.com"; logoEmoji = "🌊"; dateAdded = 1_740_000_000_000_000_000 - (15 * day) },

    // ── AI Image Tools ───────────────────────────────────────────────────
    { id = 16; name = "Midjourney"; description = "Industry-leading AI image generator known for stunning artistic and photorealistic outputs."; category = "AI Image Tools"; websiteUrl = "https://midjourney.com"; logoEmoji = "🎨"; dateAdded = 1_740_000_000_000_000_000 - (16 * day) },
    { id = 17; name = "DALL-E 3"; description = "OpenAI's text-to-image model integrated into ChatGPT for creative image generation."; category = "AI Image Tools"; websiteUrl = "https://openai.com/dall-e-3"; logoEmoji = "🖼️"; dateAdded = 1_740_000_000_000_000_000 - (17 * day) },
    { id = 18; name = "Leonardo AI"; description = "AI image platform for game assets, concept art, and cinematic visuals with fine-tuned models."; category = "AI Image Tools"; websiteUrl = "https://leonardo.ai"; logoEmoji = "🦁"; dateAdded = 1_740_000_000_000_000_000 - (18 * day) },
    { id = 19; name = "Canva AI"; description = "Canva's suite of AI tools for image generation, background removal, and design assistance."; category = "AI Image Tools"; websiteUrl = "https://canva.com"; logoEmoji = "🎨"; dateAdded = 1_740_000_000_000_000_000 - (19 * day) },
    { id = 20; name = "Adobe Firefly"; description = "Adobe's generative AI tools built into Creative Cloud for safe commercial image creation."; category = "AI Image Tools"; websiteUrl = "https://firefly.adobe.com"; logoEmoji = "🔥"; dateAdded = 1_740_000_000_000_000_000 - (20 * day) },
    { id = 21; name = "Stable Diffusion"; description = "Open-source AI image generator with extensive community models and local deployment support."; category = "AI Image Tools"; websiteUrl = "https://stability.ai"; logoEmoji = "🌀"; dateAdded = 1_740_000_000_000_000_000 - (21 * day) },
    { id = 22; name = "Ideogram"; description = "AI image generator that excels at embedding accurate, readable text inside generated images."; category = "AI Image Tools"; websiteUrl = "https://ideogram.ai"; logoEmoji = "💡"; dateAdded = 1_740_000_000_000_000_000 - (22 * day) },
    { id = 23; name = "Flux AI"; description = "Black Forest Labs' state-of-the-art image generation model with exceptional prompt adherence."; category = "AI Image Tools"; websiteUrl = "https://blackforestlabs.ai"; logoEmoji = "🌊"; dateAdded = 1_740_000_000_000_000_000 - (23 * day) },
    { id = 24; name = "Playground AI"; description = "Free AI image creator with a canvas editor for mixing and editing generated images."; category = "AI Image Tools"; websiteUrl = "https://playground.com"; logoEmoji = "🛝"; dateAdded = 1_740_000_000_000_000_000 - (24 * day) },
    { id = 25; name = "NightCafe"; description = "AI art generator with multiple models, daily credits, and an active creative community."; category = "AI Image Tools"; websiteUrl = "https://creator.nightcafe.studio"; logoEmoji = "🌙"; dateAdded = 1_740_000_000_000_000_000 - (25 * day) },
    { id = 26; name = "Bing Image Creator"; description = "Microsoft's free AI image generator powered by DALL-E, accessible directly in Bing."; category = "AI Image Tools"; websiteUrl = "https://bing.com/images/create"; logoEmoji = "🔷"; dateAdded = 1_740_000_000_000_000_000 - (26 * day) },
    { id = 27; name = "Runway Inpainting"; description = "Runway's image editing tools for AI-powered background removal and object replacement."; category = "AI Image Tools"; websiteUrl = "https://runwayml.com"; logoEmoji = "✏️"; dateAdded = 1_740_000_000_000_000_000 - (27 * day) },
    { id = 28; name = "Magnific AI"; description = "AI upscaler and enhancer that adds stunning detail to low-resolution images."; category = "AI Image Tools"; websiteUrl = "https://magnific.ai"; logoEmoji = "🔬"; dateAdded = 1_740_000_000_000_000_000 - (28 * day) },
    { id = 29; name = "Remove.bg"; description = "Instantly removes image backgrounds with AI in one click — free and fast."; category = "AI Image Tools"; websiteUrl = "https://remove.bg"; logoEmoji = "✂️"; dateAdded = 1_740_000_000_000_000_000 - (29 * day) },
    { id = 30; name = "Photoroom"; description = "AI photo editor for creating product photos and marketing visuals with clean backgrounds."; category = "AI Image Tools"; websiteUrl = "https://photoroom.com"; logoEmoji = "📸"; dateAdded = 1_740_000_000_000_000_000 - (30 * day) },

    // ── AI Video Tools ───────────────────────────────────────────────────
    { id = 31; name = "Runway ML"; description = "Professional AI video generation and editing platform used by top filmmakers."; category = "AI Video Tools"; websiteUrl = "https://runwayml.com"; logoEmoji = "🎬"; dateAdded = 1_740_000_000_000_000_000 - (31 * day) },
    { id = 32; name = "Synthesia"; description = "Create AI-generated videos with realistic avatars from text scripts in 120+ languages."; category = "AI Video Tools"; websiteUrl = "https://synthesia.io"; logoEmoji = "🎥"; dateAdded = 1_740_000_000_000_000_000 - (32 * day) },
    { id = 33; name = "Sora"; description = "OpenAI's groundbreaking text-to-video model that generates minute-long cinematic videos."; category = "AI Video Tools"; websiteUrl = "https://openai.com/sora"; logoEmoji = "🌅"; dateAdded = 1_740_000_000_000_000_000 - (33 * day) },
    { id = 34; name = "HeyGen"; description = "AI video platform for creating personalized, talking-avatar videos at scale."; category = "AI Video Tools"; websiteUrl = "https://heygen.com"; logoEmoji = "👤"; dateAdded = 1_740_000_000_000_000_000 - (34 * day) },
    { id = 35; name = "Pictory"; description = "Turns long-form content and blog posts into short, engaging social media videos automatically."; category = "AI Video Tools"; websiteUrl = "https://pictory.ai"; logoEmoji = "🖼️"; dateAdded = 1_740_000_000_000_000_000 - (35 * day) },
    { id = 36; name = "Pika Labs"; description = "AI video generation tool known for fast, creative clips from images and text prompts."; category = "AI Video Tools"; websiteUrl = "https://pika.art"; logoEmoji = "⚡"; dateAdded = 1_740_000_000_000_000_000 - (36 * day) },
    { id = 37; name = "Kling AI"; description = "Kuaishou's advanced video generation model producing realistic, physics-aware 2-minute clips."; category = "AI Video Tools"; websiteUrl = "https://klingai.com"; logoEmoji = "🎞️"; dateAdded = 1_740_000_000_000_000_000 - (37 * day) },
    { id = 38; name = "Luma AI Dream Machine"; description = "High-quality video generation from images and text with realistic camera movements."; category = "AI Video Tools"; websiteUrl = "https://lumalabs.ai"; logoEmoji = "🌟"; dateAdded = 1_740_000_000_000_000_000 - (38 * day) },
    { id = 39; name = "InVideo AI"; description = "AI video editor that creates marketing videos and social clips from text descriptions."; category = "AI Video Tools"; websiteUrl = "https://invideo.io"; logoEmoji = "📹"; dateAdded = 1_740_000_000_000_000_000 - (39 * day) },
    { id = 40; name = "D-ID"; description = "Create AI-powered talking avatars from a single photo for presentations and digital humans."; category = "AI Video Tools"; websiteUrl = "https://d-id.com"; logoEmoji = "🗣️"; dateAdded = 1_740_000_000_000_000_000 - (40 * day) },
    { id = 41; name = "Descript"; description = "Edit videos and podcasts by editing text transcripts — AI-powered filler word removal included."; category = "AI Video Tools"; websiteUrl = "https://descript.com"; logoEmoji = "📝"; dateAdded = 1_740_000_000_000_000_000 - (41 * day) },
    { id = 42; name = "Topaz Video AI"; description = "Upscale, stabilize, and enhance video quality using dedicated local AI models."; category = "AI Video Tools"; websiteUrl = "https://topazlabs.com/topaz-video-ai"; logoEmoji = "💎"; dateAdded = 1_740_000_000_000_000_000 - (42 * day) },
    { id = 43; name = "Veed.io"; description = "Online video editor with AI subtitles, avatars, and background removal for content creators."; category = "AI Video Tools"; websiteUrl = "https://veed.io"; logoEmoji = "🎦"; dateAdded = 1_740_000_000_000_000_000 - (43 * day) },
    { id = 44; name = "Captions AI"; description = "Auto-generates animated captions and subtitles for social media videos from speech."; category = "AI Video Tools"; websiteUrl = "https://captions.ai"; logoEmoji = "💬"; dateAdded = 1_740_000_000_000_000_000 - (44 * day) },
    { id = 45; name = "Wisecut"; description = "AI video editor that automatically cuts silences and creates jump cuts for engaging videos."; category = "AI Video Tools"; websiteUrl = "https://wisecut.video"; logoEmoji = "✂️"; dateAdded = 1_740_000_000_000_000_000 - (45 * day) },

    // ── AI Writing Tools ─────────────────────────────────────────────────
    { id = 46; name = "Jasper AI"; description = "Enterprise AI writing assistant for marketing teams to create high-converting content at scale."; category = "AI Writing Tools"; websiteUrl = "https://jasper.ai"; logoEmoji = "✍️"; dateAdded = 1_740_000_000_000_000_000 - (46 * day) },
    { id = 47; name = "Copy.ai"; description = "AI copywriting tool for generating marketing copy, blog posts, and social media content fast."; category = "AI Writing Tools"; websiteUrl = "https://copy.ai"; logoEmoji = "📋"; dateAdded = 1_740_000_000_000_000_000 - (47 * day) },
    { id = 48; name = "Grammarly"; description = "AI writing assistant that checks grammar, style, tone, and clarity in real time."; category = "AI Writing Tools"; websiteUrl = "https://grammarly.com"; logoEmoji = "✅"; dateAdded = 1_740_000_000_000_000_000 - (48 * day) },
    { id = 49; name = "Writesonic"; description = "AI content platform for SEO-optimized articles, ad copy, and landing pages."; category = "AI Writing Tools"; websiteUrl = "https://writesonic.com"; logoEmoji = "🖊️"; dateAdded = 1_740_000_000_000_000_000 - (49 * day) },
    { id = 50; name = "QuillBot"; description = "AI paraphrasing and summarization tool trusted by students and professionals worldwide."; category = "AI Writing Tools"; websiteUrl = "https://quillbot.com"; logoEmoji = "🪶"; dateAdded = 1_740_000_000_000_000_000 - (50 * day) },
    { id = 51; name = "Notion AI"; description = "Notion's built-in AI for drafting, summarizing, and improving text inside your workspace."; category = "AI Writing Tools"; websiteUrl = "https://notion.so/product/ai"; logoEmoji = "📔"; dateAdded = 1_740_000_000_000_000_000 - (51 * day) },
    { id = 52; name = "Rytr"; description = "Affordable AI writing assistant for blogs, emails, social posts, and SEO content."; category = "AI Writing Tools"; websiteUrl = "https://rytr.me"; logoEmoji = "📝"; dateAdded = 1_740_000_000_000_000_000 - (52 * day) },
    { id = 53; name = "Sudowrite"; description = "AI fiction writing tool that helps authors overcome writer's block and develop stories."; category = "AI Writing Tools"; websiteUrl = "https://sudowrite.com"; logoEmoji = "📚"; dateAdded = 1_740_000_000_000_000_000 - (53 * day) },
    { id = 54; name = "Wordtune"; description = "AI writing companion that rephrases, shortens, and rewrites sentences for better clarity."; category = "AI Writing Tools"; websiteUrl = "https://wordtune.com"; logoEmoji = "🎵"; dateAdded = 1_740_000_000_000_000_000 - (54 * day) },
    { id = 55; name = "Anyword"; description = "Performance-driven AI copywriter with predictive scoring for ads, emails, and landing pages."; category = "AI Writing Tools"; websiteUrl = "https://anyword.com"; logoEmoji = "🎯"; dateAdded = 1_740_000_000_000_000_000 - (55 * day) },
    { id = 56; name = "Hypotenuse AI"; description = "Bulk AI content generation for e-commerce product descriptions, blogs, and social posts."; category = "AI Writing Tools"; websiteUrl = "https://hypotenuse.ai"; logoEmoji = "📐"; dateAdded = 1_740_000_000_000_000_000 - (56 * day) },
    { id = 57; name = "Surfer SEO"; description = "AI content editor that optimizes articles for Google rankings based on real SERP analysis."; category = "AI Writing Tools"; websiteUrl = "https://surferseo.com"; logoEmoji = "🏄"; dateAdded = 1_740_000_000_000_000_000 - (57 * day) },
    { id = 58; name = "Lex"; description = "Distraction-free AI writing app that generates text suggestions as you write long-form content."; category = "AI Writing Tools"; websiteUrl = "https://lex.page"; logoEmoji = "🔤"; dateAdded = 1_740_000_000_000_000_000 - (58 * day) },
    { id = 59; name = "Longshot AI"; description = "AI for long-form content creation with factual grounding, citations, and SEO optimization."; category = "AI Writing Tools"; websiteUrl = "https://longshot.ai"; logoEmoji = "🎯"; dateAdded = 1_740_000_000_000_000_000 - (59 * day) },
    { id = 60; name = "Shortly AI"; description = "AI writing assistant for fiction and non-fiction that helps writers expand their drafts."; category = "AI Writing Tools"; websiteUrl = "https://shortlyai.com"; logoEmoji = "✒️"; dateAdded = 1_740_000_000_000_000_000 - (60 * day) },

    // ── AI Music Tools ───────────────────────────────────────────────────
    { id = 61; name = "ElevenLabs"; description = "Ultra-realistic AI voice synthesis and cloning for audiobooks, podcasts, and voiceovers."; category = "AI Music Tools"; websiteUrl = "https://elevenlabs.io"; logoEmoji = "🔊"; dateAdded = 1_740_000_000_000_000_000 - (61 * day) },
    { id = 62; name = "Suno AI"; description = "Generate full songs with vocals and instrumentals from a text prompt in seconds."; category = "AI Music Tools"; websiteUrl = "https://suno.ai"; logoEmoji = "🎵"; dateAdded = 1_740_000_000_000_000_000 - (62 * day) },
    { id = 63; name = "Udio"; description = "AI music generator for creating high-quality original tracks across any genre."; category = "AI Music Tools"; websiteUrl = "https://udio.com"; logoEmoji = "🎶"; dateAdded = 1_740_000_000_000_000_000 - (63 * day) },
    { id = 64; name = "Mubert"; description = "AI-generated royalty-free background music for videos, streams, and apps."; category = "AI Music Tools"; websiteUrl = "https://mubert.com"; logoEmoji = "🎧"; dateAdded = 1_740_000_000_000_000_000 - (64 * day) },
    { id = 65; name = "Aiva"; description = "AI music composer for film scores, game soundtracks, and emotional orchestral pieces."; category = "AI Music Tools"; websiteUrl = "https://aiva.ai"; logoEmoji = "🎼"; dateAdded = 1_740_000_000_000_000_000 - (65 * day) },
    { id = 66; name = "Boomy"; description = "Create and release AI-generated music to streaming platforms in minutes."; category = "AI Music Tools"; websiteUrl = "https://boomy.com"; logoEmoji = "💥"; dateAdded = 1_740_000_000_000_000_000 - (66 * day) },
    { id = 67; name = "Loudly"; description = "AI music creation platform for generating background music tailored to video mood and pace."; category = "AI Music Tools"; websiteUrl = "https://loudly.com"; logoEmoji = "📢"; dateAdded = 1_740_000_000_000_000_000 - (67 * day) },
    { id = 68; name = "Soundraw"; description = "AI music generator that lets you customize tempo, mood, and instruments for royalty-free tracks."; category = "AI Music Tools"; websiteUrl = "https://soundraw.io"; logoEmoji = "🎸"; dateAdded = 1_740_000_000_000_000_000 - (68 * day) },
    { id = 69; name = "Mureka"; description = "AI music generation platform for creating songs with full vocals from text descriptions."; category = "AI Music Tools"; websiteUrl = "https://mureka.ai"; logoEmoji = "🎤"; dateAdded = 1_740_000_000_000_000_000 - (69 * day) },
    { id = 70; name = "Adobe Podcast"; description = "AI-powered podcast recording and enhancement tool that removes noise and improves voice quality."; category = "AI Music Tools"; websiteUrl = "https://podcast.adobe.com"; logoEmoji = "🎙️"; dateAdded = 1_740_000_000_000_000_000 - (70 * day) },
    { id = 71; name = "Voicemod"; description = "Real-time AI voice changer and soundboard for gaming, streaming, and online communication."; category = "AI Music Tools"; websiteUrl = "https://voicemod.net"; logoEmoji = "🎭"; dateAdded = 1_740_000_000_000_000_000 - (71 * day) },
    { id = 72; name = "Splash Music"; description = "Create AI beats and full tracks with simple prompts, perfect for beginners."; category = "AI Music Tools"; websiteUrl = "https://splashmusic.com"; logoEmoji = "💦"; dateAdded = 1_740_000_000_000_000_000 - (72 * day) },
    { id = 73; name = "Beatoven AI"; description = "AI music tool that creates custom, mood-based soundtracks for your videos and podcasts."; category = "AI Music Tools"; websiteUrl = "https://beatoven.ai"; logoEmoji = "🥁"; dateAdded = 1_740_000_000_000_000_000 - (73 * day) },
    { id = 74; name = "Krisp"; description = "AI noise cancellation app that removes background noise from any microphone in real time."; category = "AI Music Tools"; websiteUrl = "https://krisp.ai"; logoEmoji = "🔇"; dateAdded = 1_740_000_000_000_000_000 - (74 * day) },
    { id = 75; name = "Musicfy"; description = "AI voice-to-instrument tool that turns your humming or singing into any musical instrument."; category = "AI Music Tools"; websiteUrl = "https://musicfy.lol"; logoEmoji = "🎺"; dateAdded = 1_740_000_000_000_000_000 - (75 * day) },

    // ── AI Productivity Tools ────────────────────────────────────────────
    { id = 76; name = "GitHub Copilot"; description = "AI pair programmer that suggests code completions and entire functions in real time."; category = "AI Productivity Tools"; websiteUrl = "https://github.com/features/copilot"; logoEmoji = "👾"; dateAdded = 1_740_000_000_000_000_000 - (76 * day) },
    { id = 77; name = "Cursor"; description = "AI-first code editor built on VS Code with deep codebase understanding and chat-driven coding."; category = "AI Productivity Tools"; websiteUrl = "https://cursor.sh"; logoEmoji = "⬛"; dateAdded = 1_740_000_000_000_000_000 - (77 * day) },
    { id = 78; name = "Zapier AI"; description = "AI-powered automation that connects 7,000+ apps and builds workflows from natural language."; category = "AI Productivity Tools"; websiteUrl = "https://zapier.com"; logoEmoji = "⚡"; dateAdded = 1_740_000_000_000_000_000 - (78 * day) },
    { id = 79; name = "Otter.ai"; description = "AI meeting assistant that transcribes, summarizes, and captures action items automatically."; category = "AI Productivity Tools"; websiteUrl = "https://otter.ai"; logoEmoji = "🦦"; dateAdded = 1_740_000_000_000_000_000 - (79 * day) },
    { id = 80; name = "Fireflies.ai"; description = "AI notetaker that records, transcribes, and searches your meetings across all platforms."; category = "AI Productivity Tools"; websiteUrl = "https://fireflies.ai"; logoEmoji = "🔥"; dateAdded = 1_740_000_000_000_000_000 - (80 * day) },
    { id = 81; name = "Mem AI"; description = "AI-powered note-taking app that automatically organizes your knowledge and connects ideas."; category = "AI Productivity Tools"; websiteUrl = "https://mem.ai"; logoEmoji = "🧠"; dateAdded = 1_740_000_000_000_000_000 - (81 * day) },
    { id = 82; name = "Replit AI"; description = "Collaborative online IDE with AI code generation, debugging, and deployment in the browser."; category = "AI Productivity Tools"; websiteUrl = "https://replit.com"; logoEmoji = "🔄"; dateAdded = 1_740_000_000_000_000_000 - (82 * day) },
    { id = 83; name = "Codeium"; description = "Free AI code completion and chat extension supporting 70+ languages and all major editors."; category = "AI Productivity Tools"; websiteUrl = "https://codeium.com"; logoEmoji = "💻"; dateAdded = 1_740_000_000_000_000_000 - (83 * day) },
    { id = 84; name = "Tabnine"; description = "AI code assistant for teams with privacy-focused deployment and personalized suggestions."; category = "AI Productivity Tools"; websiteUrl = "https://tabnine.com"; logoEmoji = "🔢"; dateAdded = 1_740_000_000_000_000_000 - (84 * day) },
    { id = 85; name = "Motion"; description = "AI calendar app that automatically schedules tasks, meetings, and deep work time for you."; category = "AI Productivity Tools"; websiteUrl = "https://usemotion.com"; logoEmoji = "🗓️"; dateAdded = 1_740_000_000_000_000_000 - (85 * day) },
    { id = 86; name = "Reclaim AI"; description = "Smart scheduling AI that protects time for habits, tasks, and focus blocks on your calendar."; category = "AI Productivity Tools"; websiteUrl = "https://reclaim.ai"; logoEmoji = "⏰"; dateAdded = 1_740_000_000_000_000_000 - (86 * day) },
    { id = 87; name = "Superhuman"; description = "AI-powered email client that makes inbox zero fast with AI triage and smart replies."; category = "AI Productivity Tools"; websiteUrl = "https://superhuman.com"; logoEmoji = "📧"; dateAdded = 1_740_000_000_000_000_000 - (87 * day) },
    { id = 88; name = "Sanebox"; description = "AI email management tool that filters noise, summarizes newsletters, and prioritizes your inbox."; category = "AI Productivity Tools"; websiteUrl = "https://sanebox.com"; logoEmoji = "📥"; dateAdded = 1_740_000_000_000_000_000 - (88 * day) },
    { id = 89; name = "Taskade"; description = "AI-powered project management and productivity workspace with mind maps and agent automation."; category = "AI Productivity Tools"; websiteUrl = "https://taskade.com"; logoEmoji = "✅"; dateAdded = 1_740_000_000_000_000_000 - (89 * day) },
    { id = 90; name = "Beautiful.ai"; description = "AI presentation tool that automatically designs slides and keeps decks visually consistent."; category = "AI Productivity Tools"; websiteUrl = "https://beautiful.ai"; logoEmoji = "🖥️"; dateAdded = 1_740_000_000_000_000_000 - (90 * day) },
    { id = 91; name = "Tome"; description = "AI storytelling and presentation tool that generates entire decks from a one-line prompt."; category = "AI Productivity Tools"; websiteUrl = "https://tome.app"; logoEmoji = "📖"; dateAdded = 1_740_000_000_000_000_000 - (91 * day) },
    { id = 92; name = "Gamma App"; description = "AI-powered presentations, docs, and websites created instantly from prompts or outlines."; category = "AI Productivity Tools"; websiteUrl = "https://gamma.app"; logoEmoji = "γ"; dateAdded = 1_740_000_000_000_000_000 - (92 * day) },
    { id = 93; name = "Fathom"; description = "Free AI meeting recorder and summarizer for Zoom, Google Meet, and Microsoft Teams."; category = "AI Productivity Tools"; websiteUrl = "https://fathom.video"; logoEmoji = "🎤"; dateAdded = 1_740_000_000_000_000_000 - (93 * day) },
    { id = 94; name = "Notion AI"; description = "Notion's AI writing, summarizing, and Q&A assistant embedded across your entire workspace."; category = "AI Productivity Tools"; websiteUrl = "https://notion.so"; logoEmoji = "📓"; dateAdded = 1_740_000_000_000_000_000 - (94 * day) },
    { id = 95; name = "Whimsical AI"; description = "AI-powered wireframing and diagramming tool for quick product and UX design workflows."; category = "AI Productivity Tools"; websiteUrl = "https://whimsical.com"; logoEmoji = "🌀"; dateAdded = 1_740_000_000_000_000_000 - (95 * day) },
    { id = 96; name = "Relevance AI"; description = "No-code platform to build and deploy AI agents and tools without writing code."; category = "AI Productivity Tools"; websiteUrl = "https://relevanceai.com"; logoEmoji = "🤖"; dateAdded = 1_740_000_000_000_000_000 - (96 * day) },
    { id = 97; name = "Make (Integromat)"; description = "Visual AI workflow automation platform for connecting apps and automating complex processes."; category = "AI Productivity Tools"; websiteUrl = "https://make.com"; logoEmoji = "🔗"; dateAdded = 1_740_000_000_000_000_000 - (97 * day) },
    { id = 98; name = "Bolt.new"; description = "Full-stack AI web app builder that writes and deploys code from a single prompt."; category = "AI Productivity Tools"; websiteUrl = "https://bolt.new"; logoEmoji = "⚡"; dateAdded = 1_740_000_000_000_000_000 - (98 * day) },
    { id = 99; name = "Lovable"; description = "AI software engineer that builds and iterates on full-stack apps from natural language."; category = "AI Productivity Tools"; websiteUrl = "https://lovable.dev"; logoEmoji = "❤️"; dateAdded = 1_740_000_000_000_000_000 - (99 * day) },
    { id = 100; name = "v0 by Vercel"; description = "Generates React UI components and full pages from text prompts, powered by Vercel's AI."; category = "AI Productivity Tools"; websiteUrl = "https://v0.dev"; logoEmoji = "🔲"; dateAdded = 1_740_000_000_000_000_000 - (100 * day) },
  ];

  let toolsMap = Map.empty<Nat, Tool>();
  let pendingTools = List.empty<Tool>();

  // Seed all tools on initialization
  for (tool in seedTools.vals()) {
    toolsMap.add(tool.id, tool);
  };

  public shared ({ caller }) func addTool(tool : Tool) : async () {
    toolsMap.add(tool.id, tool);
  };

  public shared ({ caller }) func addPendingTool(tool : Tool) : async () {
    pendingTools.add(tool);
  };

  func movePendingToLive() : () {
    let currentTime = Time.now();
    let dayInNanos = 24 * 60 * 60 * 1_000_000_000;

    if (pendingTools.size() > 0) {
      let oldestDayTool = pendingTools.find(
        func(t) { t.dateAdded <= (currentTime - dayInNanos) }
      );

      let newRemaining = pendingTools.filter(
        func(t) { t.dateAdded > (currentTime - dayInNanos) }
      );

      switch (oldestDayTool) {
        case (null) {};
        case (?tool) {
          toolsMap.add(tool.id, tool);
          pendingTools.clear();
          for (t in newRemaining.values()) {
            pendingTools.add(t);
          };
        };
      };
    };
  };

  public query ({ caller = _ }) func getAllTools() : async [Tool] {
    toolsMap.values().toArray();
  };

  public query ({ caller = _ }) func getToolsByCategory(category : Text) : async [Tool] {
    let filteredTools = toolsMap.values().toArray().filter(
      func(tool) { Text.equal(tool.category, category) }
    );
    filteredTools;
  };

  func toLowercase(text : Text) : Text {
    Text.fromIter(
      text.toIter().map<Char, Char>(
        func(c) {
          let code = c.toNat32();
          if (code >= 65 and code <= 90) {
            Char.fromNat32(code + 32);
          } else {
            c;
          };
        }
      )
    );
  };

  public query ({ caller = _ }) func searchTools(searchTerm : Text) : async [Tool] {
    let lowerQuery = toLowercase(searchTerm);

    let filteredTools = toolsMap.values().toArray().filter(
      func(tool) {
        let name = toLowercase(tool.name);
        let description = toLowercase(tool.description);
        name.contains(#text lowerQuery) or description.contains(#text lowerQuery);
      }
    );
    filteredTools;
  };

  public query ({ caller = _ }) func getCategories() : async [Text] {
    let categories = toolsMap.values().toArray().map(func(tool) { tool.category });

    let uniqueCategories = List.empty<Text>();
    for (category in categories.values()) {
      if (not uniqueCategories.contains(category)) {
        uniqueCategories.add(category);
      };
    };
    uniqueCategories.toArray();
  };

  public query ({ caller = _ }) func getLatestTools(limit : Nat) : async [Tool] {
    let allTools = toolsMap.values().toArray();
    let sortedTools = allTools.sort(
      func(a, b) { Int.compare(b.dateAdded, a.dateAdded) }
    );
    sortedTools.sliceToArray(0, Nat.min(limit, sortedTools.size()));
  };
};
