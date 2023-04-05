echo "Building API Docs"
cd "$(dirname "$0")/../" && swagger-cli bundle ../swagger/index.yaml --outfile ../docs/swagger.yaml
echo "Finished Building API Docs"