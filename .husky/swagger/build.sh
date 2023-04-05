echo "Building API Docs"
swagger-cli bundle ../swagger/index.yaml --outfile ../swagger/swagger.yaml
echo "Finished Building API Docs"