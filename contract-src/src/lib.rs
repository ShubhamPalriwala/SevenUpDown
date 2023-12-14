// We use the `no_std` attribute to tell the compiler to not link the Rust standard library.
#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, vec, Env, Symbol, Vec};

// The contract is named `SevenUpOrDown` and is implemented by the `contractimpl` macro.
#[contract]
pub struct SevenUpOrDown;

// The contract has a single method `play` which takes a prediction and returns a vector of symbols.
#[contractimpl]
impl SevenUpOrDown {
    pub fn play(env: Env, prediction: Symbol) -> Vec<Symbol> {
        // Generate a random number between 2 and 12 (the sum of 2 dices)
        let random_number = env.prng().gen_range(2..=12);
        // Determine if the outcome is up, down or same
        let outcome = match random_number {
            1..=6 => symbol_short!("down"),
            7 => symbol_short!("same"),
            _ => symbol_short!("up"),
        };

        // Determine if the prediction was correct
        let is_prediction_correct = outcome.eq(&prediction);
        let result_symbol = Self::number_to_symbol(&env, random_number);

        // Generate the output vector
        let win_or_lose = if is_prediction_correct {
            symbol_short!("won")
        } else {
            symbol_short!("lost")
        };

        vec![
            &env,
            symbol_short!("You"),
            win_or_lose,
            symbol_short!("with"),
            prediction,
            symbol_short!("as"),
            symbol_short!("number"),
            symbol_short!("was"),
            result_symbol,
        ]
    }

    fn number_to_symbol(env: &Env, number: u64) -> Symbol {
        // Map numbers to symbols
        match number {
            2 => Symbol::new(env, "2"),
            3 => Symbol::new(env, "3"),
            4 => Symbol::new(env, "4"),
            5 => Symbol::new(env, "5"),
            6 => Symbol::new(env, "6"),
            7 => Symbol::new(env, "7"),
            8 => Symbol::new(env, "8"),
            9 => Symbol::new(env, "9"),
            10 => Symbol::new(env, "10"),
            11 => Symbol::new(env, "11"),
            12 => Symbol::new(env, "12"),
            _ => Symbol::new(env, "Invalid"),
        }
    }
}
