# ─────────────────────────────────────────────
# GetResilience v2.0  –  System Configuration
# Schema: https://getresilience.org/schemas/system-v2.1.json
# ─────────────────────────────────────────────

# ── Build stage ──────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Production stage ─────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

# ── Schema-derived labels ─────────────────────
LABEL org.opencontainers.image.title="GetResilience" \
      org.opencontainers.image.version="2.0" \
      org.opencontainers.image.vendor="DROG Group" \
      gr.schema.id="https://getresilience.org/schemas/system-v2.1.json" \
      gr.compliance.dsa="safe_harbour" \
      gr.compliance.gdpr.legal_basis.art6="legitimate_interest" \
      gr.data.classification="restricted" \
      gr.actor.L0="anonymous_user:submit_signal" \
      gr.actor.L2="rc_member:emod_required" \
      gr.actor.L3="consensus:3_of_n"

# ── System identity (system.*) ────────────────
ENV GR_SYSTEM_NAME="GetResilience" \
    GR_SYSTEM_VERSION="2.0" \
    GR_ENTITY_JURISDICTION="EU"

# ── Security (security.*) ─────────────────────
ENV GR_RATE_LIMITING="true" \
    GR_CAPTCHA="true" \
    GR_DATA_CLASSIFICATION="restricted"

# ── Audit (audit.*) ───────────────────────────
ENV GR_AUDIT_ENABLED="true"

# ── Compliance (compliance.*) ─────────────────
ENV GR_DSA_SAFE_HARBOUR_ACTIVE_ROLE="false" \
    GR_DSA_KNOWLEDGE_CONDITION="post_validation_only" \
    GR_GDPR_ART6="legitimate_interest"

# ── Signal intake (signal_intake.*) ──────────
ENV GR_SIGNAL_CLASSIFICATION="non_attributable_signal"

# ── Track configuration ───────────────────────
# Track A: illegal content → legal notice (attributable)
# Track B: harmful/FIMI/cross-platform → aggregated intelligence (non-attributable)
ENV GR_TRACK_A_SCOPE="illegal_content_only" \
    GR_TRACK_A_OUTPUT="legal_notice" \
    GR_TRACK_B_OUTPUT="aggregated_intelligence"

# ── Runtime ───────────────────────────────────
ENV NODE_ENV="production" \
    PORT="3000"

RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

COPY --from=builder /app/public          ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static    ./.next/static

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
