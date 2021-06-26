# AnimaBeyondFoundry

## Instrucciones de instalación para desarrolladores

1) Clonar el repositorio en \AppData\Local\FoundryVTT\Data\systems\AnimaBeyondFoundry. En Sourcetree esto se hace en File-> Clone.

2) Instalar node si no lo tienes: https://nodejs.org/en/download/

3) En VSCode, añadir la carpeta del repositorio al worskpace (boton derecho en el panel izquierda y "Add folder to workspace" por ejemplo). Luego, hacer clic derecho sobre ella y "Open in integrated terminal". Eso abre una terminal de comandos de windows en dicho directorio (...\FoundryVTT\Data\systems\AnimaBeyondFoundry). En esa terminal se debe ejecutar el comando:

4) Duplica el fichero `foundryconfig.example.json` y renombralo a `foundryconfig.json`, luego editalo y el campo `dataPath` rellenalo con la ruta donde tengas la carpeta data, por ejemplo:
4.1. Windows: `C:/Users/<nombredeUsuario>/AppData/Local/FoundryVTT`
4.2. Linux: `/home/<nombredeUsuario>/.local/share/FoundryVTT`

`npm install`

4) Hasta ahora esta carpeta no tiene ningún efecto sobre Foundry. Para generar la carpeta real del sistema, ejecutamos el comando:

`npm run-script build`, para generarla sin más, o 

`npm run-script build:watch`, para generarla y que además se vuelva a generar si hacemos algún cambio en la carpeta del repositorio.

5) Abrir Foundry. Deberíamos ver Anima Beyond Fantasy entre nuestros sistemas instalados.

## Instrucciones de trabajo para desarrolladores

a) Para empezar a trabajar en algo en lo que no se esté trabajando ya:

1) Nos colocamos en la rama DEVELOP. 
-En Sourcetree, la primera vez, tenemos que ir al panel de la izquierda, a >Remotes>background> y hacer doble click en la rama en la que queremos colocarnos. Al hacerlo veremos como ahora en el panel de la izquierda, en >Branches, aparece la rama en la que acabamos de colocarnos (las ramas que aparecen en >Branches son las que tenemos en local, y las que están en >Remote son las que están en GitHub). 
- Las siguientes veces, cuando ya tengamos Develop en el desplegable de >Branches, pues simplemente hacemos doble clic ahí para colocarnos en ella.

2) Nos aseguramos de que tenemos la versión más actualizada dl repositorio: Botón FETCH, y en caso de que se detecte algún cambio Botón PULL.

3) Creamos una nueva rama desde develop. En Sourcetree esto se hace en el botón Branches que hay junto a Fetch. Poned un nombre descriptivo del trabajo que se va a realizar en esa rama, para que todos entendamos qué se está haciendo y qué no

4) Nos colocamos en la rama en la que vamos a trabajar (la que acabamos de crear).

5) Programar cosas: En VSCode, abre la terminal en la carpeta del repositorio y ejecuta el comando:

`npm run-script build:watch`

Mientras la terminal siga corriendo con ese comando, cualquier cambio que se haga en la carpeta del repositorio prvocará que se recompile el proyecto y actualize la carpeta animabf.
- Para ver los cambios en Foundry, por lo general basta con pulsar f5 dentro del mundo una vez el proyecto haya compilado. Si no, Opciones -> Return to setup y cargar de nuevo el mundo.

5) Cuando tu trabajo esté terminado, o cuando quieras guardar el progreso, haz un Commit en la rama en la que estás. En Sourcetree esto se hace en el botón COMMIT arriba a la izquierda. Al darle te salen Staged files y Unstaged files. Dale a Stage a los archivos que quieras guardar, añade abajo un comentario descriptivo de lo que has hecho y dale a Commit en la esquina inferior derecha.

6) Si no has marcado la casilla de "Push Inmediately..." al hacer el commit, verás que se ilumina el botón de Push. Comprueba que efectivamente estás en la rama en la que tienes que estar, y dale al botón PUSH.

7) Cuando el trabajo en una determinada feature esté terminado por completo, entramos en Git y hacemos un PULL REQUEST desde nuestra rama a develop, y marcamos a algunos de los compañeros como reviewers para que repasen nuestro código antes de aceptarlo. Los que tengáis dudas preguntad por Discord.

8) De vez en cuando, cuando la rama Develop haya tenido bastantes cambios, se hará un MERGE de la rama develop a la rama master. De nuevo, esto mejor que solo se haga con consenso entre varios.

b) Para continuar tu trabajo o el trabajo de otro: Lo mismo que lo anterior pero sin el paso 1 ni 3.

## Enlaces útiles

- [Cómo crear un nuevo tipo de item](docs/add-new-item.md)
