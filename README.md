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

// ----------------------------------------------------------------------------------------------------------------------------
CORRECT THE FOLLOWING ISSUES
// ----------------------------------------------------------------------------------------------------------------------------

Frontend
CRITICAL - editing does not seem to be working anywhere - DONE 11:58 - 25/03/2021
CRITICAL - upgrading/downgrading a user to admin does not work - DONE 18:19 - 24/03/2021

MAJOR - name is throwing an error with underscore - DONE 13:27 - 25/03/2021
MAJOR - user that created cards or collections doesn't show when logged as admin - 25/03/2021
MAJOR - searching by user does not work - DONE 13:35 25/03/2021
MAJOR - adding a collection or card should return to the dashboard or clean the form - DONE 12:44 - 25/03/2021 (cleaning form)

MINOR - empty sign up has wrong error message - DONE 17:42 - 24/03/2021
MINOR - inserting a card throws a backend error instead of a user error - DONE 12:42 - 25/03/2021
MINOR - search placeholder on user table is wrong - DONE 17:51 - 24/03/2021
MINOR - Adding to a collection should close - DONE 12:43 - 25/03/2021

//-------------------------------------------------------------------------------------------------------------------------
Backend

CRITICAL - Allows you to edit collections/cards with a regular user - DONE 13:40 - 24/03/2021
CRITICAL - Allows you to get all collections/cards with regular user - DONE 11:04 - 24/03/2021
CRITICAL - Allows you to get a collection/card from a different user - DONE 12:53 - 24/03/2021
CRITICAL - Allows you to delete a collection/card from a different user - DONE 12:52 - 24/03/2021
CRITICAL - Get User allows you to get all user date without being an admin - DONE 19:07 - 23/03/2021
CRITICAL - Adding a card without a number crashes the backend - DONE 14:05 - 24/03/2021

MAJOR - Password type crashing backend - DONE 16:37 - 25/03/2021
MAJOR - Missing fields timeout on sign up - DONE 14:35 - 24/03/2021
MAJOR - Validation for variable types on login - DONE 14:35 - 24/03/2021
MAJOR - Updating a card crashes the app because of the name - DONE 14:06 - 24/03/2021
MAJOR - Adding a collection without anything is not being handle - DONE 14:07 - 24/03/2021

MINOR - Allows to add more than 4 cards to a collection (your rule) - DONE 15:33 - 24/03/2021
MINOR - Empty json message is not sanitized - DONE 14:43 - 24/03/2021

EXTRA - Verify if cars in cardsList are related with the user - DONE 16:49 - 24/03/2021
