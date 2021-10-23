<template>
  <div class="sudoku-container d-flex flex-column " style="height: 100%">

    <div class="d-flex align-center mb-3" style="gap: 15px">
      <v-select :items="difficulty_list" hide-details v-model="difficulty" label="Difficulty"/>
      <v-btn @click="init()" color="primary">Generate</v-btn>
    </div>

    <div class="flex-grow-1"></div>

    <div class="sudoku">
      <div class="sudoku-inner-container">
        <div class="row" v-for="i in 9" :key="i">
          <div class="col" v-for="j in 9"
               :key="j"
               :class="get_cell_class(i,j)"
               @click="selected_cell = `${i}_${j}`"
          >
            {{ sudoku[`${i}_${j}`] }}
          </div>
        </div>
      </div>
    </div>

    <div class="number-pad mt-3">
      <v-btn tile text @click="input_value(null,null, i)" v-for="i of 9" :key="i" class="number">
        {{ i }}
      </v-btn>
      <v-btn tile text @click="undo" class="number">
        Undo
      </v-btn>
      <v-btn tile text @click="input_value(null,null, 0)" class="number">
        0
      </v-btn>
      <v-btn tile text @click="redo" class="number">
        Redo
      </v-btn>
    </div>

  </div>
</template>

<script>

import {async_timeout} from "../async_utils.js";
import * as localforage from "localforage";

export default {
  name: "Sudoku",
  data() {
    return {
      sudoku: {},
      sudoku_answer: null,
      sudoku_question: null,
      selected_cell: null,
      difficulty_list: [40, 60, 70],
      difficulty: 40,
      errors: [],
      undo_stack: [],
      redo_stack: [],
    };
  },
  async created() {
    let last_game = await localforage.getItem('last_game');
    if (!last_game) {
      this.init();
    } else {
      this.sudoku = last_game.sudoku;
      this.sudoku_answer = last_game.sudoku_answer;
      this.sudoku_question = last_game.sudoku_question;
      this.difficulty = last_game.difficulty;
      this.errors = last_game.errors;
      this.undo_stack = last_game.undo_stack;
      this.redo_stack = last_game.redo_stack;
    }
    document.body.addEventListener('keypress', (e) => {
      if (!this.selected_cell) {
        return;
      }
      let [row, col] = this.selected_cell.split('_');
      let value = e.key;

      if (value.match(/^\d/)) {
        this.input_value(row, col, value * 1);
      }
    })
  },
  methods: {
    undo() {
      if (!this.undo_stack.length) {
        return;
      }
      let command = this.undo_stack.pop();
      let [key, value] = command.undo
      this.sudoku[key] = value;
      this.redo_stack.push(command);
      this.check_errors();
      this.save();

    },
    redo() {
      if (!this.redo_stack.length) {
        return;
      }
      let command = this.redo_stack.pop();
      let [key, value] = command.redo
      this.sudoku[key] = value;
      this.undo_stack.push(command);
      this.check_errors();
      this.save();
    },
    async init() {
      let sudoku;
      sudoku = await this.generate_sudoku();
      let is_complete = this.is_complete(sudoku);
      console.log('is_complete', sudoku, is_complete);
      this.sudoku_answer = sudoku;
      this.sudoku_question = this.mask_sudoku(sudoku, this.difficulty);
      this.sudoku = {...this.sudoku_question}
      this.errors = [];
      this.undo_stack = [];
      this.redo_stack = [];
      this.selected_cell = null;
      this.save();
    },
    get_selected_key() {
      if (!this.selected_cell) {
        return [null, null];
      }

      return this.selected_cell.split('_');
    },
    input_value(row, col, value) {
      let [default_row, default_col] = this.get_selected_key();
      row = row || default_row;
      col = col || default_col;
      if (!row || !col) {
        return;
      }

      let key = `${row}_${col}`;
      if (this.sudoku_question[key] !== null) {
        return;
      }

      let old_value = this.sudoku[key];

      this.sudoku[key] = value > 0 ? value : null;
      this.undo_stack.push({
        undo: [key, old_value],
        redo: [key, value],
      })
      this.check_errors();
      this.save();
      this.check_win();
    },
    async check_win() {
      await async_timeout(1);
      if (this.is_complete(this.sudoku)) {
        alert('you win');
      }
    },
    async save() {
      return localforage.setItem('last_game', {
        sudoku: this.sudoku,
        sudoku_answer: this.sudoku_answer,
        sudoku_question: this.sudoku_question,
        difficulty: this.difficulty,
        errors: this.errors,
        undo_stack: this.undo_stack,
        redo_stack: this.redo_stack,
      })
    },
    check_errors() {
      this.errors = Object.entries(this.sudoku).filter(([key, value]) => {
        let [row, col] = key.split('_');
        return value && !this.check_value_is_valid(this.sudoku, row, col, value)
      }).map(([key]) => key);
    },
    mask_sudoku(sudoku, mask_count = 40) {
      let keys = Object.keys(sudoku)
      for (let i = 0; i < mask_count; i++) {
        let key = this.array_random(keys);
        this.array_remove(keys, key);
        sudoku[key] = null;
      }

      return sudoku;
    },
    is_complete(sudoku) {
      let is_empty = Object.values(sudoku).some(value => value === null);
      if (is_empty) {
        return false;
      }

      let is_all_valid = Object.entries(sudoku).every(([key, value]) => {
        let [row, col] = key.split('_');
        return this.check_value_is_valid(sudoku, row, col, value)
      })
      if (!is_all_valid) {
        return false;
      }

      return true;
    },
    get_pool() {
      let pool = new Map();
      for (let i = 1; i <= 9; i++) {
        for (let j = 1; j <= 9; j++) {
          pool.set(`${i}_${j}`, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
        }
      }
      return pool;
    },
    async generate_sudoku() {
      console.time('generate')
      let sudoku = {};
      let pool = this.get_pool();

      for (let i = 1; i <= 9;) {
        for (let j = 1; j <= 9;) {

          let key = `${i}_${j}`;
          let col_pool = pool.get(key);
          let value = null;
          let is_valid;
          do {
            if (col_pool.length === 0) {
              break;
            }
            value = this.array_random(col_pool);
            this.array_remove(col_pool, value);

            is_valid = this.check_value_is_valid(sudoku, i, j, value);
            if (!is_valid) {
              value = null;
            }
          } while (!is_valid)

          if (value === null) {
            pool.set(key, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
            if (j > 1) {
              j--;
              continue;
            } else {
              j = 9;
              i--;
              if (i <= 0) {
                pool = this.get_pool();
                i = 1;
                j = 1;
                sudoku = {};
                await async_timeout();
              }
              continue;
            }
          }
          sudoku[key] = value;
          j++;
        }
        i++;
      }
      console.timeEnd('generate')
      return sudoku;
    },
    check_value_is_valid(sudoku, row, col, value) {
      let test_key = `${row}_${col}`;
      for (let i = 1; i <= 9; i++) {
        let key = `${row}_${i}`;
        if (key === test_key) {
          continue;
        }
        if (sudoku[key] === value) {
          return false;
        }
      }
      for (let i = 1; i <= 9; i++) {
        let key = `${i}_${col}`;
        if (key === test_key) {
          continue;
        }
        if (sudoku[key] === value) {
          return false;
        }

      }
      let start_row = (Math.floor((row - 1) / 3)) * 3 + 1;
      let start_col = (Math.floor((col - 1) / 3)) * 3 + 1;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let test_row = start_row + i;
          let test_col = start_col + j;
          let key = `${test_row}_${test_col}`;
          if (key === test_key) {
            continue;
          }
          if (sudoku[key] === value) {
            return false;
          }
        }
      }

      return true;
    },
    array_random(arr) {
      let index = Math.floor(Math.random() * 1000) % arr.length;
      return arr[index];
    },
    array_remove(arr, value) {
      let index = arr.indexOf(value);
      if (index !== -1) {
        arr.splice(index, 1);
      }

    },
    get_cell_class(i, j) {
      let row = Math.floor((i - 1) / 3);
      let col = Math.floor((j - 1) / 3);
      let key = `${i}_${j}`;
      let classes = {};
      classes['color'] = (
          ([0, 2].includes(row) && [0, 2].includes(col)) ||
          ([1].includes(row) && [1].includes(col))
      )

      if (this.selected_cell === key) {
        classes['selected'] = true;
      }

      if (this.errors.includes(key)) {
        classes['error'] = true;
      }


      return classes;
    }
  }
}
</script>

<style scoped>

.sudoku-container {
  margin: auto;
  max-width: 800px;
  width: 100%;
  padding: 15px
}

.sudoku {
  position: relative;
  padding-top: 100%;
  border: 1px solid black;
  background: black;
  user-select: none;
}

.sudoku-inner-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}

.row {
  width: 100%;
  display: flex;
  flex: 1;
}

.col {
  width: calc(100% / 9);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background: white;
}

.color {
  background: #ddf2ff;
}

.error {
  background: #ffacac;
}

.selected {
  background: #ffcea4;
}

.number-pad {
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;

  border: 1px solid black;

}

.number {
  width: calc(100% / 3);
}

</style>