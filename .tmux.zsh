#!/bin/zsh

SESSION="blog"
SESSIONEXISTS=$(tmux ls | grep $SESSION)
DBNAME="dev"
SERVERSTATUS=$(pg_ctl status -D "$PG_DATA_DIR" | grep 'server is running')

# Start PostgreSQL server if not running
if [ "$SERVERSTATUS" = "" ]
then
    pg_ctl start -D $PG_DATA_DIR -l $PG_LOG_FILE
fi

# Create session if not existing
if [ "$SESSIONEXISTS" = "" ]
then
    # Create session
    tmux new-session -d -s $SESSION

    # Tab 0: terminal
    tmux rename-window -t 0 'terminal'
    tmux send-keys -t 'terminal' "code $ROOT_DIR/repos/blog" C-m
    tmux send-keys -t 'terminal' 'npm outdated -g' C-m
    tmux send-keys -t 'terminal' 'pnpm outdated -r --long' C-m
    tmux send-keys -t 'terminal' 'pnpm audit' C-m
    tmux send-keys -t 'terminal' 'brew update && brew outdated' C-m

    # Tab 1: nvim
    tmux new-window -t 1 -n 'nvim'
    tmux send-keys -t 'nvim' 'nvim .' C-m
    tmux split-window -v
    tmux send-keys -t 'nvim' 'git s' C-m

    # Tab 2: localhost
    tmux new-window -t 2 -n 'localhost'
    tmux send-keys -t 'localhost' 'pnpm frontend:dev --host' C-m
    tmux split-window -h
    tmux send-keys -t 'localhost' 'pnpm backend:dev' C-m

    # Tab 3: postgres
    tmux new-window -t 3 -n 'psql'
    tmux send-keys -t 'psql' "psql $DBNAME" C-m

    # Tab 4: test
    tmux new-window -t 4 -n 'test'
    tmux send-keys -t 'test' 'pnpm test' C-m

    # Tab 5: tsc-frontend
    tmux new-window -t 5 -n 'tsc-frontend'
    tmux send-keys -t 'tsc' "cd $ROOT_DIR/repos/blog/apps/frontend" C-m
    tmux send-keys -t 'tsc' 'pnpm tsc -w --noEmit' C-m

    # Attach to session
    tmux attach-session -t $SESSION:0
else 
    echo "Session [$SESSION] already exists"
fi

