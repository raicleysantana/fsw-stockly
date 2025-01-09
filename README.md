Criando projeto stockly

# instalando o nextjs

    npx create-next-app stockly
    typescript: yes,
    eslint:yes
    tailwindcss : yes,
    src:no,
    app router:yes,
    turbopack:no
    alias:no

# Adicionando plugin tailwindcss para ordenar classes

    Instale o plugin tailwindcss com o comando:
        npm install -D prettier prettier-plugin-tailwindcss

    Crie um arquivo .prettierrc e adicione o seguinte código:
         "plugins": ["prettier-plugins-tailwindcss"]

# Colocando fonte customizada

    No arquivo layout.tsx adicione o seguinte código:
    	const inter = Inter({

subsets: ["latin"],
display: "auto",
});

    	<body className={`${inter.className} antialiased`}>

# Instalando o shadcn

    npx shadcn@latest init

    npx shadcn@latest add button

# Instalando o prisma orm

        npm install prisma
        npx prisma init

# Criando modelo de banco de dados

    npx prisma migrate dev --name init

# Adicionando biblioteca para evitar o envio de dados para o cliente
    npm install server-only

# Adicionando biblioteca para formatar numeros
    npm install react-number-format
