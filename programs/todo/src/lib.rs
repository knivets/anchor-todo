use anchor_lang::prelude::*;

declare_id!("F3j2R9WWmDFwNHLcyo9KCdQzSHxPohf21Nw5Gzf1BM2X");

#[program]
pub mod todo {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, bump: u8) -> ProgramResult {
        ctx.accounts.todo_list.bump = bump;
        Ok(())
    }

    pub fn add(ctx: Context<Add>, content: String) -> ProgramResult {
        ctx.accounts.todo_list.list.push(content);
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct Initialize<'info> {
    #[account(init, seeds = [user.key.as_ref()], bump = bump, payer = user, space = 5000)]
    todo_list: Account<'info, TodoList>,
    user: Signer<'info>,
    system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Add<'info> {
    user: Signer<'info>,
    #[account(mut, seeds = [user.key.as_ref()], bump = todo_list.bump)]
    todo_list: Account<'info, TodoList>,
}

#[account]
pub struct TodoList {
    //todo_list: Vec<Account<'info, TodoItem>>,
    bump: u8,
    list: Vec<String>
}

pub struct TodoItem {
    content: String
}
