helm repo add grafana https://grafana.github.io/helm-charts;
helm repo update;
helm upgrade grafana grafana/grafana \
  --install \
  --namespace monitoring \
  -f ./values.yaml \
;