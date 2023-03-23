ARG K6_VERSION
ARG XK6_VERSION
ARG K6_PROMTHEUS_VERSION

FROM golang:1.20 as builder
ARG K6_VERSION=v0.42.0
ARG XK6_VERSION=v0.9.0
ARG K6_PROMETHEUS_VERSION=v0.2.0

WORKDIR $GOPATH/src/go.k6.io/k6
ADD . .
RUN go install -trimpath go.k6.io/xk6/cmd/xk6@${XK6_VERSION}
RUN xk6 build \
  --with github.com/grafana/xk6-output-prometheus-remote@${K6_PROMETHEUS_VERSION} \
  --with github.com/szkiba/xk6-dashboard@latest
RUN cp -r k6 $GOPATH/bin/k6
WORKDIR /go/src/app
COPY ./job ./

USER k6:k6
FROM gcr.io/distroless/static-debian11
WORKDIR /app
COPY --from=builder --chown=k6:k6 /go/bin/k6 ./
COPY --from=builder --chown=k6:k6 /go/src/app ./

ENTRYPOINT [ "k6" ]