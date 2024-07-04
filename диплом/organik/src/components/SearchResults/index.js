import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './SearchResults.module.css';
import { fetchSearchResults } from '../../http/catalogAPI';
import { Card } from '../Card'; // Импортируем компонент Card

export function SearchResults() {
  const location = useLocation();
  const [results, setResults] = React.useState(location.state && location.state.results ? JSON.parse(location.state.results):[]);

  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');

    if (query) {
      fetchSearchResults(query).then((data) => {
        setResults(data);
      }).catch((error) => {
        console.error('Error fetching search results:', error);
        setResults([]);  // Обработка ошибки
      });
    }
  }, [location.search]);

  console.log(results)

  return (
    
    <div className={styles.results}>
      <h1 className='title'>Результаты поиска</h1>
      <div className="items">
        {results.length > 0 ? (
          results.map(result => (
            <Card key={result.id} data={result} />
          ))
        ) : (
          <p>Ничего не найдено</p>
        )}
      </div>
    </div>
  );
}

//   export function SearchResults() {
//     const location = useLocation();
//     const results = location.state && location.state.results ? JSON.parse(location.state.results) : [];
//     console.log('Received Search Results:', results); // Добавьте этот лог для проверки полученных данных
  
//     return (
//       <div className={styles.results}>
//         <h1>Результаты поиска</h1>
//         <div className="items">
//           {results.length > 0 ? (
//             results.map(result => (
//               <Card key={result.id} data={result} />
//             ))
//           ) : (
//             <p>Ничего не найдено</p>
//           )}
//         </div>
//       </div>
//     );
// }