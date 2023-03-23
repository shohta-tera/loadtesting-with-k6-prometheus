import { check } from "k6"
import { Trend } from "k6/metrics"
import http from "k6/http"

const myTrend = new Trend("Test Trend")

export const options = {
    vus: 10,
    duration: '30s',
    thresholds: {
        http_req_failed: ["rate<0.01"],
        http_req_duration: ["p(90)<2000"]
    }
}

export default function () {
    const headers = {
        "Content-Type": "application/json"
    }

    const res = http.post(
        "https://test.k6.io",
        { headers: headers },
        {
            tags: {
                senario: "actual request"
            }
        }
    )
    check(res, {
        'is_status_200': (r) => r.status === 200
    }, { check_response: "Check response" })

    myTrend.add(res.timings.connecting, { custom_metric: "connection" })
}