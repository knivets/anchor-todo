use anchor_lang::prelude::*;

declare_id!("F3j2R9WWmDFwNHLcyo9KCdQzSHxPohf21Nw5Gzf1BM2X");

#[program]
pub mod todo {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        Ok(())
    }

    pub fn add(ctx: Context<Add>, content: String) -> ProgramResult {
        ctx.accounts.todo_list.list.push(content);
        Ok(())
    }
}

//#[instruction(bump: u8)]
#[derive(Accounts)]
pub struct Initialize<'info> {
    //#[account(init, seeds = [b"todo_list"], bump = bump, payer = user, space = 64 + 64)]
    #[account(init, payer = user, space = 64 + 64)]
    todo_list: Account<'info, TodoList>,
    user: Signer<'info>,
    system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Add<'info> {
    #[account(mut)]
    todo_list: Account<'info, TodoList>,
}

#[account]
pub struct TodoList {
    //todo_list: Vec<Account<'info, TodoItem>>,
    list: Vec<String>
}

pub struct TodoItem {
    content: String
}
