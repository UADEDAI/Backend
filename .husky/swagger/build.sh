echo "Building API Docs"
cd "$(dirname "$0")/../../" && swagger-cli bundle ../swagger/index.yaml --outfile ../swagger/swagger.yaml
echo "Finished Building API Docs"