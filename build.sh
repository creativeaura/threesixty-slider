echo "\n\n\n"
echo "   ______                                    __                      __"
echo "  / ____/___ ___  ___________ __   __       / /___ _______________ _/ /"
echo " / / __/ __ \`/ / / / ___/ __ \`/ | / /  __  / / __ \`/ ___/ ___/ __ \`/ / "
echo "/ /_/ / /_/ / /_/ / /  / /_/ /| |/ /  / /_/ / /_/ (__  |__  ) /_/ / /  "
echo "\____/\__,_/\__,_/_/   \__,_/ |___/   \____/\__,_/____/____/\__,_/_/   "
                                                                                                                                         
echo "\033[36m\nBuilding the deployment package. Please wait ...\033[0m\n\n"

START=$(date +%s)

echo "Minifying with uglyfyjs2    ......		\033[32m✔\033[39m Done" 
uglifyjs src/threesixty.js -o dist/threesixty.min.js -p 5 -c -m

END=$(date +%s)

DIFF=$(( ($END - $START)))

echo "\033[33m\n\nIt took ${DIFF} seconds to finish the build process.\033[0m\n\n"

echo "Thanks"
echo "<3 @gauravjassal\n"
