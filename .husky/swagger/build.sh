echo "📖 Building API Docs 📖"
cd "$(dirname "$0")/../" && swagger-cli bundle ../docs/index.yaml --outfile ../docs/swagger.yaml
git add ../docs/swagger.yaml
echo "📖 Finished Building API Docs 📖"