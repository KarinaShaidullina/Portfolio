import styles from './Counter.module.css';
import React from 'react';

export function Counter({count, onIncrement, onDecrement }) {
    return (
        <div className={styles.items}>
          <div className={styles.items__control} onClick={onDecrement}>-</div>
          <div className={styles.items__current}>{count}</div>
          <div className={styles.items__control} onClick={onIncrement}>+</div>
        </div>
    );
}


