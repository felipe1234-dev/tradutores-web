<h1 align="center">
	<br />
    <a href="http://www.amitmerchant.com/electron-markdownify">
		<img 
			src="./media/logo.png"
			alt="Tradutores da Web" 
			width="100" 
		/>
	</a>
    <br />
	Tradutores da Web
	<br />
</h1>

<h4 align="center"> 
	🚀 Em construção...  🚧
</h4>

<h4 align="center">
	Uma plataforma para aprendizado de idiomas, na qual você pode traduzir artigos e vídeos da internet.
</h4>

<p align="center">
    <a href="https://web-translators.herokuapp.com/">
		Website
	</a> •
    <a href="#sobre-o-projeto">
		Sobre
	</a> •
	<a href="#inspirac-ao">
		Inspiração
	</a> •
    <a href="#to-do-list">
		To do List
	</a> •
    <a href="#tecnologias-usadas">
		Tecnologias usadas
	</a> •
    <a href="#desafios">
		Desafios
	</a> •
    <a href="#license">
		License
	</a>
</p>

![screenshot](./media/demo_landing.jpg)


## 💻 Sobre o projeto

### Afinal, sobre o que é esse site? 

É uma plataforma de **aprendizado de idiomas** projetada para os usuários postarem **vídeos** e **páginas na internet** *(com os devidos créditos)*, e **traduzirem** para um determinado idioma enquanto deixam **notas explicando suas traduções** para ajudarem outros estudantes.

Com sistema de pontos, níveis e quantidade de "obrigados", o usuário se sente mais motivado a engajar.

## ❤️ Inspiração

Lá pelos meus 12 anos, eu usava muito um site chamado [Duolingo](https://pt.duolingo.com/) - *o jeito grátis, divertido e eficaz de aprender um idioma* - e foi daí que eu aprendi o meu Inglês.

Eles tinham uma ferramenta - que era a *Imersão* - um lugar para **traduzir páginas da internet** para o idioma que estava aprendendo. 

Era uma ferramenta muito boa pois provia um ambiente cooperativo e imersivo, além de atrair usuáios que só queriam ler sobre assuntos adversos.

**Porém**, com o passar do tempo, ela foi **descontinuada**, e isso gerou um impacto para todos nós que usávamos a plataforma/ferramenta.

**Não houve muitas tentativas de refazer a ferramenta** e as que fizeram, não foramm tão fiéis e/ou boas.

Agora sinto que posso recriar o site.

Pode ser que fique popular, não sei, mas farei por amor. ❤️

## 📝 To do List

- [x] Modo escuro
- [ ] Modo claro
- [ ] Cadastro de usuário
- [x] Login de usuário
- [ ] Página de perfil do usuário
- [x] Feed com filtros
- [x] Upload de documentos (páginas da Web)
- [ ] Upload de vídeos
- [x] Extração de texto da página Web
- [x] Separação do texto extraído por frases
- [x] Modelagem do Banco de Dados
- [ ] Publicar novas traduções

## 🛠️ Tecnologias usadas

As seguintes ferramentas foram usadas na construção do projeto:

### **Backend**

- **[Express](https://expressjs.com/)**
- **[Node.js](https://nodejs.org/en/)**
- **[Node SQLite3](https://github.com/mapbox/node-sqlite3)**
- **[Cheerio](https://github.com/cheeriojs/cheerio)**
- **[Axios](https://github.com/axios/axios)**
- **[dotENV](https://github.com/motdotla/dotenv)**
- **[Express Rate Limit](https://github.com/nfriedly/express-rate-limit)**
- **[Express Session](http://expressjs.com/en/resources/middleware/session.html)**
- **[Helmet](https://helmetjs.github.io/)**
- **[Sentence Boundary Detection (SBD)](https://github.com/Tessmore/sbd)**
- **[Simple Git](https://github.com/steveukx/git-js)**

> Veja o arquivo [package.json](./package.json)

### **Frontend**

- **[React](https://pt-br.reactjs.org/)**
- **[React Router Dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)**
- **[Node SASS](https://github.com/sass/node-sass)**
- **[React Suite](https://rsuitejs.com/)**
- **[React Facebook Login](https://github.com/keppelen/react-facebook-login)**
- **[React Google Login](https://github.com/anthonyjgrove/react-google-login)**
- **[React Responsive](https://github.com/contra/react-responsive)**
- **[Use on Screen](https://github.com/felipe1234-dev/use-on-screen)**

> Veja o arquivo [package.json](./client/package.json)

## 💪 Desafios 

O maior desafio foi o **baixo orçamento**. Infelizmente, não posso gastar com hospedagem de site nem de banco de dados.

A solução que encontrei quanto à hospedagem de domínio foi o [Heroku](https://www.heroku.com) - só havia um problema - Heroku provia planos grátis bem limitados para bancos de dados.

Mas aí vem o ***SQLite***!! SQLite é um sistema de banco de dados baseado em um sistema de arquivos, ou seja, o seu banco de dados fica embutido em um **único** arquivo na linguagem **C** que procura simular um banco de dados real, você pode até usar SQL sem problema nenhum. Por cima de tudo, *grátis*.

**Mas os mais espertos perceberão uma coisa com a associação entre o Heroku e o SQLite, mas eu acredito ter resolvido esse problema**.

### Mas o Heroku não é efêmero?

Sim, o Heroku é **efêmero** - isto é, as alterações feitas ao seu sistema de arquivos é passageira - então, se eu tenho o arquivo A e um usuário faz uma alteração nele dinamicamente com uma linguagem de servidor,  depois de 1 dia, essa alteração não vai mais valer.

**Então, como vamos ter um banco de dados baseado em arquivo único sendo que o Heroku zera tudo no fim do dia??**

### Então, o que fazer?

A verdade é que o que vale é *o que vai para o Github*, o Heroku só considera o que estiver escrito no seu repositório no Github.

Bom, a pergunta agora é se podemos atualizar o arquivo do banco no Github sempre que alguma interação for feita com ele? E a resposta é *sim*.

