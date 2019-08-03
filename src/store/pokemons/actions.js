import axios from 'axios'

const getPokemonData = names =>
  Promise.all(
    names.map(async name => {
      const { data: pokemon } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      return {
        ...pokemon,
        abilities: await Promise.all(
          pokemon.abilities.map(
            async ({ ability: { name: abilityName } }) =>
              (await axios.get(`https://pokeapi.co/api/v2/ability/${abilityName}`)).data
          )
        ),
      }
    })
  )

export async function createPokemonPages({ createPage }) {
  const allPokemon = await getPokemonData(['pikachu', 'charizard', 'squirtle'])

  // Create a page that lists all Pokémon.
  createPage({
    path: '/pokemons/',
    component: require.resolve('../../templates/pokemons/index.jsx'),
    context: { allPokemon },
  })

  // Create a page for each Pokémon.
  allPokemon.forEach(pokemon => {
    createPage({
      path: `/pokemon/${pokemon.name}/`,
      component: require.resolve('../../templates/pokemons/pokemon.jsx'),
      context: { pokemon },
    })

    // Create a page for each ability of the current Pokémon.
    pokemon.abilities.forEach(ability => {
      createPage({
        path: `/pokemon/${pokemon.name}/ability/${ability.name}/`,
        component: require.resolve('../../templates/pokemons/ability.jsx'),
        context: { pokemon, ability },
      })
    })
  })
}
