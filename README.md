Neste projecto a ideia é implementar uma aplicação web relativamente simples como forma de testar
(e às vezes melhorar) os conhecimentos de web development.

Como domínio vamos escolher colecções de cartas coleccionáveis genéricas ao estilo de Magic: The Gathering.
Requisitos:

o utilizador pode-se registar com nome de utilizador, password e nome real

o utilizador pode inserir cartas; cada carta tem 3 atributos: um valor numérico, um nome e uma descrição

o utilizador pode criar colecções com números arbitrários de cartas; cada colecção tem um nome e uma lista de cartas associadas

o utilizador pode editar ou apagar as suas cartas e colecções

o utilizador pode ver as suas cartas e colecções, e pode filtrar a lista de cartas e colecções com base, pelo menos, no nome destas
além do utilizador base.

a aplicação deve incluir um papel de administrador que tem as seguintes permissões: apagar e editar colecções e cartas; apagar e editar utilizadores;
qualquer utilizador pode ser promovido a administrador (mesmo que isso tenho de ser feito à mão)

o front-end da aplicação deve comunicar com o back-end sempre usando a mesma API web, que deve seguir as convenções REST

a API REST deve ser testável por programas exteriores, por exemplo, com o Postman

a aplicação deve seguir o conceito de single page web application

Para implementar a aplicação podem-se usar quaisquer frameworks e linguagens,
partindo do princípio que o programador conhece minimamente o seu funcionamento interno.
