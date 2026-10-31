# MENTOR Currículo — como instalar

App da Escola MENTOR para gerar **ementa → apostila (4 unidades) → quizzes, podcasts, planos de aula e trabalhos finais**, com exportação para Word.

## Arquivos

| Arquivo | Para quê |
|---|---|
| `index.html` | O app inteiro |
| `sw.js`, `manifest.json`, `icone.png`, `icone-512.png` | Instalação no iPad/Mac e atualização |
| `supabase.sql` | Cria as tabelas no Supabase (rodar uma vez) |
| `worker.js` | **Opcional.** Só se quiser guardar a chave da Anthropic no Cloudflare |

## Passo 1: banco de dados (uma vez)

1. Supabase → projeto da igreja → **SQL Editor** → **New query**.
2. Cole todo o conteúdo de `supabase.sql` e clique em **Run**.
3. Em **Authentication → Users**, confira se o seu usuário já existe. Se não existir: **Add user → Create new user**, com e-mail e senha, e marque *Auto Confirm User*.

## Passo 2: publicar no GitHub

1. Na organização **igreja-vidas**, crie o repositório **mentor-curriculo** (público).
2. **Add file → Upload files**: envie `index.html`, `sw.js`, `manifest.json`, `icone.png` e `icone-512.png`.
   (O `supabase.sql`, o `worker.js` e este LEIAME podem ir junto. Não atrapalham.)
3. **Settings → Pages** → *Branch: main* / *root* → **Save**.
4. Endereço: `https://igreja-vidas.github.io/mentor-curriculo/`

## Passo 3: chave da Anthropic

1. Em **console.anthropic.com → API Keys**, crie uma chave e coloque créditos em **Billing**.
2. No app: **⚙ Ajustes** → cole a chave → **Salvar ajustes**.
   A chave fica salva só naquele aparelho (Mac e iPad: uma vez em cada).
3. Ainda nos Ajustes, cole a **Bibliografia padrão da Escola MENTOR** (uma obra por linha).

## Como usar

1. **Bibliografia**: as obras da disciplina, a ementa oficial do Ementário (se houver) e o material de apoio. PDFs com texto podem ser importados direto.
2. **Ementa**: gere com a IA, corrija o que quiser (títulos, seções, escopos, bibliografia) e **aprove**. Ela passa a ser a "fonte de verdade".
3. **Apostila**: gere uma unidade por vez. Revise. Se uma parte ficou ruim ou repetida, use **✦ Ajustar esta parte** só naquele trecho, ou **✎ Editar texto** para mexer à mão.
4. **Quizzes, podcasts e aulas**: saem do texto da unidade já escrita.
5. **Exportar Word**: arquivos prontos, sem precisar formatar.

## Atualizar o app

Quando eu enviar uma versão nova, substitua o `index.html` no GitHub. O app mostra sozinho a faixa **"Há uma versão nova… Atualizar agora"**. Também há o botão **↻ Atualizar app** nos Ajustes. A versão aparece no topo da tela.

## Novidades da v1.1.0

- **Custo real por disciplina:** cada geração registra os tokens usados e o valor em dólar. O custo aparece no topo da disciplina (toque para ver o detalhe), em cada material e na tela inicial. Em ⚙ Ajustes você pode informar a cotação do dólar para ver também em reais.
- **Podcast no formato de videoaula:** poucas perguntas profundas do apresentador e falas longas do professor, como numa aula. Inclui marcações *[Na tela: …]* para a edição do vídeo.

**Para atualizar da v1.0.0:** rode o `supabase.sql` de novo (ele só acrescenta a tabela `mc_uso`, sem apagar nada) e substitua o `index.html` no GitHub.
