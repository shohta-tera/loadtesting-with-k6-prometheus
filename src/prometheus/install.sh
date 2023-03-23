kubectl create namespace monitoring
helm repo update prometheus-community
helm upgrade prometheus prometheus-community/prometheus \
  --install \
  --namespace monitoring \
  --values=./values.yaml \
;
helm repo add grafana https://grafana.github.io/helm-charts;
helm repo update;