@echo off
echo =========================================
echo   IMIGRA.AI - Iniciar Projeto
echo =========================================
echo.

REM Verificar se está na pasta certa
if not exist "prototipo-mvp" (
    echo Erro: Execute este script na pasta raiz do projeto
    echo Esperado: F:\.Trabalho\job-matching-platform\
    pause
    exit /b 1
)

echo [1/4] Abrindo Backend...
start cmd /k "cd prototipo-mvp\backend && echo === BACKEND IMIGRA.AI === && echo Instalando dependencias... && npm install && echo. && echo Iniciando servidor... && npm run dev"

echo [2/4] Aguardando 3 segundos...
timeout /t 3 /nobreak

echo [3/4] Abrindo Frontend...
start cmd /k "cd prototipo-mvp\frontend && echo === FRONTEND IMIGRA.AI === && echo Instalando dependencias... && npm install && echo. && echo Iniciando servidor... && npm run dev"

echo [4/4] Abrindo navegador...
timeout /t 5 /nobreak

REM Tentar abrir no navegador padrão
start http://localhost:3000

echo.
echo =========================================
echo ✅ Projeto iniciado!
echo =========================================
echo.
echo URLS:
echo  - Frontend: http://localhost:3000
echo  - Backend:  http://localhost:3001
echo  - Chat IA:  http://localhost:3000/chat
echo.
echo Prototipo disponível. Aproveite! 🚀
echo.
pause
