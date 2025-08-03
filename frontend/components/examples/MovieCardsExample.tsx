import React from 'react';
import Card from '../molecules/Card';
import { ButtonMovie } from '../atoms/ButtonMovie';
import { StartScore } from '../atoms/StartScore';

export default function MovieCardsExample() {
  return (
    <div className='p-8 bg-movie-black min-h-screen'>
      <h1 className='text-3xl font-bold text-movie-duck mb-8 font-mont'>
        Compound Component Pattern Examples
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Ejemplo 1: Card básica */}
        <Card variant='default'>
          <Card.Image
            src='https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg'
            alt='The Matrix'
          />
          <Card.Header>
            <Card.Title>The Matrix</Card.Title>
          </Card.Header>
          <Card.Content>
            <Card.Description>
              A computer hacker learns from mysterious rebels about the true
              nature of his reality.
            </Card.Description>
          </Card.Content>
        </Card>

        {/* Ejemplo 2: Card de película con variant movie */}
        <Card
          variant='movie'
          className='transform hover:scale-105 transition-transform'
        >
          <Card.Image
            src='https://image.tmdb.org/t/p/w500/z9Yu4eBVnWRpsL4fDng9m4GOm6p.jpg'
            alt='Oppenheimer'
          />
          <Card.Header>
            <Card.Title>Oppenheimer</Card.Title>
            <div className='flex items-center gap-2 mt-2'>
              <div className='flex items-center text-movie-duck'>
                <StartScore type='full' />
                <StartScore type='full' />
                <StartScore type='full' />
                <StartScore type='full' />
                <StartScore type='half' />
              </div>
              <span className='text-sm text-movie-metal'>4.5/5</span>
            </div>
          </Card.Header>
          <Card.Content>
            <Card.Description>
              The story of American scientist J. Robert Oppenheimer and his role
              in the development of the atomic bomb.
            </Card.Description>
            <div className='flex flex-wrap gap-2 mt-3'>
              <span className='bg-movie-duck text-movie-black px-2 py-1 rounded text-xs'>
                Biography
              </span>
              <span className='bg-movie-duck text-movie-black px-2 py-1 rounded text-xs'>
                Drama
              </span>
              <span className='bg-movie-duck text-movie-black px-2 py-1 rounded text-xs'>
                History
              </span>
            </div>
          </Card.Content>
          <Card.Footer>
            <div className='flex justify-between items-center'>
              <span className='text-sm'>2023 • 3h 1m</span>
              <ButtonMovie
                type='filled'
                text='Book Tickets'
                onClick={() => alert('Booking tickets!')}
              />
            </div>
          </Card.Footer>
        </Card>

        {/* Ejemplo 3: Card destacada */}
        <Card variant='featured'>
          <Card.Header>
            <Card.Title>🏆 Movie of the Week</Card.Title>
          </Card.Header>
          <Card.Image
            src='https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg'
            alt='Featured Movie'
          />
          <Card.Content>
            <Card.Title>Dune: Part Two</Card.Title>
            <Card.Description>
              Paul Atreides unites with Chani and the Fremen while seeking
              revenge against the conspirators.
            </Card.Description>
          </Card.Content>
          <Card.Footer>
            <div className='text-center'>
              <button className='bg-movie-black text-movie-duck px-4 py-2 rounded font-bold hover:bg-opacity-80 transition'>
                Watch Now
              </button>
            </div>
          </Card.Footer>
        </Card>

        {/* Ejemplo 4: Card personalizada - Solo imagen y título */}
        <Card variant='movie'>
          <Card.Image
            src='https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg'
            alt='Simple Card'
          />
          <Card.Header>
            <Card.Title>Minimalist Design</Card.Title>
          </Card.Header>
        </Card>

        {/* Ejemplo 5: Card con contenido personalizado */}
        <Card variant='default' className='col-span-full md:col-span-2'>
          <Card.Header>
            <Card.Title>Flexibilidad Total</Card.Title>
          </Card.Header>
          <Card.Content>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Card.Description>
                  El Compound Component Pattern te permite crear componentes
                  súper flexibles. Cada sub-componente puede usarse
                  independientemente y en cualquier orden.
                </Card.Description>
              </div>
              <div className='flex flex-col gap-2'>
                <h4 className='font-bold'>Ventajas:</h4>
                <ul className='text-sm space-y-1'>
                  <li>• Máxima flexibilidad de composición</li>
                  <li>• API intuitiva y fácil de usar</li>
                  <li>• Contexto compartido entre componentes</li>
                  <li>• Reutilizable en diferentes escenarios</li>
                </ul>
              </div>
            </div>
          </Card.Content>
          <Card.Footer>
            <div className='flex justify-center'>
              <button className='bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition'>
                Aprende Más
              </button>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}
