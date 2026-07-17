"use client";
import React, { useState } from "react";
import { useTheme } from "next-themes";

// Shared card wrapper with theme support
export const HITLCard = ({
  children,
  width = "w-[450px]",
  testId,
}: {
  children: React.ReactNode;
  width?: string;
  testId?: string;
}) => {
  const { theme } = useTheme();
  return (
    <div className="flex">
      <div
        data-testid={testId}
        className={`relative rounded-xl ${width} p-6 shadow-lg ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border border-slate-700/50"
            : "bg-gradient-to-br from-white via-gray-50 to-white text-gray-800 border border-gray-200/80"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

// Status badge shown after action is taken
export const StatusBadge = ({
  variant,
  icon,
  label,
}: {
  variant: "success" | "error" | "info";
  icon: string;
  label: string;
}) => {
  const { theme } = useTheme();
  const colors = {
    success:
      theme === "dark"
        ? "bg-green-900/30 text-green-300 border border-green-500/30"
        : "bg-green-50 text-green-700 border border-green-200",
    error:
      theme === "dark"
        ? "bg-red-900/30 text-red-300 border border-red-500/30"
        : "bg-red-50 text-red-700 border border-red-200",
    info:
      theme === "dark"
        ? "bg-blue-900/30 text-blue-300 border border-blue-500/30"
        : "bg-blue-50 text-blue-700 border border-blue-200",
  };

  return (
    <div className="flex flex-col items-center py-4">
      <div className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 ${colors[variant]}`}>
        <span>{icon}</span> {label}
      </div>
    </div>
  );
};

// Card header with title and subtitle
export const CardHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => {
  const { theme } = useTheme();
  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold mb-1">{title}</h3>
      {subtitle && (
        <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-500"}`}>{subtitle}</p>
      )}
    </div>
  );
};

// Primary action button
export const ActionButton = ({
  onClick,
  disabled,
  variant = "primary",
  testId,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "success" | "danger";
  testId?: string;
  children: React.ReactNode;
}) => {
  const { theme } = useTheme();
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white",
    secondary:
      theme === "dark"
        ? "bg-slate-700 hover:bg-slate-600 text-white border border-slate-600"
        : "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300",
    success:
      "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white",
    danger:
      "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white",
  };

  return (
    <button
      data-testid={testId}
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-2 rounded-lg font-medium transition-all ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

// Text input field
export const TextInput = ({
  value,
  onChange,
  placeholder,
  disabled,
  type = "text",
  testId,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: "text" | "password";
  testId?: string;
}) => {
  const { theme } = useTheme();
  return (
    <input
      data-testid={testId}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full p-3 rounded-lg border ${
        theme === "dark"
          ? "bg-slate-800 border-slate-600 text-white placeholder-slate-500"
          : "bg-white border-gray-300 text-gray-800 placeholder-gray-400"
      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
    />
  );
};

// Detail row for displaying key-value pairs
export const DetailRow = ({ label, value }: { label: string; value: string }) => {
  const { theme } = useTheme();
  return (
    <div>
      <span className={`text-xs font-medium ${theme === "dark" ? "text-slate-400" : "text-gray-500"}`}>
        {label}:
      </span>
      <p className="font-medium">{value}</p>
    </div>
  );
};

// Details section with background
export const DetailsSection = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  return (
    <div className={`space-y-3 mb-5 p-4 rounded-lg ${theme === "dark" ? "bg-slate-800/50" : "bg-gray-50"}`}>
      {children}
    </div>
  );
};

// Multiple choice option
export const ChoiceOption = ({
  label,
  selected,
  onClick,
  disabled,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}) => {
  const { theme } = useTheme();
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-3 rounded-lg border text-left transition-all ${
        selected
          ? theme === "dark"
            ? "bg-blue-900/30 border-blue-500/50 text-blue-300"
            : "bg-blue-50 border-blue-300 text-blue-700"
          : theme === "dark"
            ? "bg-slate-800/50 border-slate-600 hover:border-slate-500"
            : "bg-white border-gray-200 hover:border-gray-300"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
            selected
              ? "border-blue-500 bg-blue-500"
              : theme === "dark"
                ? "border-slate-500"
                : "border-gray-300"
          }`}
        >
          {selected && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>
        <span className="font-medium">{label}</span>
      </div>
    </button>
  );
};

// ─── Pre-built HITL Cards ────────────────────────────────────────────

// Email confirmation card (approve/reject)
export const EmailConfirmationCard = ({
  args,
  respond,
  status,
}: {
  args: { to?: string; subject?: string; body?: string };
  respond: (result: any) => void;
  status: string;
}) => {
  const [decision, setDecision] = useState<"approved" | "rejected" | null>(null);

  const handleApprove = () => {
    setDecision("approved");
    // Backend expects {"accepted": true/false} for HITL confirmation
    respond({ accepted: true });
  };

  const handleReject = () => {
    setDecision("rejected");
    respond({ accepted: false });
  };

  if (!args?.to) return null;

  return (
    <HITLCard width="w-[500px]" testId="confirm-email-card">
      {decision ? (
        <StatusBadge
          variant={decision === "approved" ? "success" : "error"}
          icon={decision === "approved" ? "✓" : "✗"}
          label={decision === "approved" ? "Email Sent" : "Cancelled"}
        />
      ) : (
        <>
          <CardHeader title="Confirm Email" subtitle="Review and approve before sending" />
          <DetailsSection>
            <DetailRow label="To" value={args.to} />
            {args.subject && <DetailRow label="Subject" value={args.subject} />}
            {args.body && <DetailRow label="Body" value={args.body} />}
          </DetailsSection>
          <div className="flex justify-center gap-4">
            <ActionButton
              variant="secondary"
              onClick={handleReject}
              disabled={status !== "executing"}
              testId="confirm-email-cancel"
            >
              ✗ Cancel
            </ActionButton>
            <ActionButton
              variant="success"
              onClick={handleApprove}
              disabled={status !== "executing"}
              testId="confirm-email-send"
            >
              ✓ Send Email
            </ActionButton>
          </div>
        </>
      )}
    </HITLCard>
  );
};

// Generic confirmation card (approve/reject any action)
export const ConfirmationCard = ({
  args,
  respond,
  status,
}: {
  args: { action?: string; description?: string; details?: Record<string, string> };
  respond: (result: any) => void;
  status: string;
}) => {
  const [decision, setDecision] = useState<"approved" | "rejected" | null>(null);

  const handleApprove = () => {
    setDecision("approved");
    respond({ approved: true, result: `Action "${args?.action}" approved` });
  };

  const handleReject = () => {
    setDecision("rejected");
    respond({ approved: false, result: `Action "${args?.action}" rejected by user` });
  };

  return (
    <HITLCard width="w-[500px]">
      {decision ? (
        <StatusBadge
          variant={decision === "approved" ? "success" : "error"}
          icon={decision === "approved" ? "✓" : "✗"}
          label={decision === "approved" ? "Approved" : "Rejected"}
        />
      ) : (
        <>
          <CardHeader
            title={args?.action || "Confirm Action"}
            subtitle={args?.description || "This action requires your approval"}
          />
          {args?.details && (
            <DetailsSection>
              {Object.entries(args.details).map(([key, value]) => (
                <DetailRow key={key} label={key} value={value} />
              ))}
            </DetailsSection>
          )}
          <div className="flex justify-center gap-4">
            <ActionButton variant="secondary" onClick={handleReject} disabled={status !== "executing"}>
              ✗ Reject
            </ActionButton>
            <ActionButton variant="success" onClick={handleApprove} disabled={status !== "executing"}>
              ✓ Approve
            </ActionButton>
          </div>
        </>
      )}
    </HITLCard>
  );
};

// Text input card
export const TextInputCard = ({
  args,
  respond,
  status,
}: {
  args: { prompt?: string; placeholder?: string };
  respond: (result: any) => void;
  status: string;
}) => {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    respond({ text: value });
  };

  return (
    <HITLCard>
      {submitted ? (
        <StatusBadge variant="info" icon="✓" label="Input Received" />
      ) : (
        <>
          <CardHeader title="Input Required" subtitle={args?.prompt || "Please provide your input"} />
          <div className="mb-4">
            <TextInput
              value={value}
              onChange={setValue}
              placeholder={args?.placeholder || "Type here..."}
              disabled={status !== "executing"}
            />
          </div>
          <div className="flex justify-center">
            <ActionButton
              onClick={handleSubmit}
              disabled={status !== "executing" || !value.trim()}
            >
              Submit
            </ActionButton>
          </div>
        </>
      )}
    </HITLCard>
  );
};

// Secret/password input card
export const SecretInputCard = ({
  args,
  respond,
  status,
}: {
  args: { prompt?: string; service?: string };
  respond: (result: any) => void;
  status: string;
}) => {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    const masked = value.length > 8 ? value.slice(0, 4) + "..." + value.slice(-4) : "****";
    respond({ secret: value, masked });
  };

  return (
    <HITLCard>
      {submitted ? (
        <StatusBadge variant="success" icon="🔐" label={`${args?.service || "Secret"} Configured`} />
      ) : (
        <>
          <CardHeader
            title={`🔐 ${args?.service || "Secure"} Input`}
            subtitle={args?.prompt || "Enter your secret value"}
          />
          <div className="mb-4">
            <TextInput
              type="password"
              value={value}
              onChange={setValue}
              placeholder="Enter secret..."
              disabled={status !== "executing"}
            />
          </div>
          <div className="flex justify-center">
            <ActionButton
              onClick={handleSubmit}
              disabled={status !== "executing" || !value.trim()}
              variant="primary"
            >
              Configure
            </ActionButton>
          </div>
        </>
      )}
    </HITLCard>
  );
};

// Multiple choice card
export const MultipleChoiceCard = ({
  args,
  respond,
  status,
}: {
  args: { question?: string; options?: string[] };
  respond: (result: any) => void;
  status: string;
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selected) {
      setSubmitted(true);
      respond({ choice: selected });
    }
  };

  const options = args?.options || [];

  return (
    <HITLCard width="w-[500px]">
      {submitted ? (
        <StatusBadge variant="info" icon="✓" label={`Selected: ${selected}`} />
      ) : (
        <>
          <CardHeader title="Make a Choice" subtitle={args?.question || "Select an option"} />
          <div className="space-y-2 mb-5">
            {options.map((option) => (
              <ChoiceOption
                key={option}
                label={option}
                selected={selected === option}
                onClick={() => setSelected(option)}
                disabled={status !== "executing"}
              />
            ))}
          </div>
          <div className="flex justify-center">
            <ActionButton
              onClick={handleSubmit}
              disabled={status !== "executing" || !selected}
            >
              Confirm Selection
            </ActionButton>
          </div>
        </>
      )}
    </HITLCard>
  );
};

// ─── Backend HITL cards (real Agno pause types) ──────────────────────

// ask_user card (backend UserFeedbackTools). Renders one or more questions,
// radio for single-select and checkbox for multi_select, and replies with the
// backend contract: { selections: { "<question>": ["<label>", ...] } }.
export const AskUserCard = ({
  args,
  respond,
  status,
}: {
  args: {
    questions?: {
      question: string;
      header?: string;
      options?: { label: string; description?: string }[];
      multi_select?: boolean;
    }[];
  };
  respond: (result: any) => void;
  status: string;
}) => {
  const { theme } = useTheme();
  const uid = React.useId();
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = args?.questions ?? [];
  if (questions.length === 0) return null;

  const isPicked = (q: string, label: string) => (selections[q] || []).includes(label);
  const toggle = (q: string, label: string, multi: boolean) => {
    setSelections((prev) => {
      const cur = prev[q] || [];
      if (!multi) return { ...prev, [q]: [label] };
      return { ...prev, [q]: cur.includes(label) ? cur.filter((l) => l !== label) : [...cur, label] };
    });
  };

  // A question with no options can't be answered — don't let it deadlock Submit.
  const allAnswered = questions.every(
    (q) => (q.options?.length ?? 0) === 0 || (selections[q.question]?.length ?? 0) > 0,
  );
  const canSubmit = allAnswered && status === "executing" && !submitted;
  const handleSubmit = () => {
    if (canSubmit) {
      setSubmitted(true);
      respond({ selections });
    }
  };

  return (
    <HITLCard width="w-[500px]" testId="ask-user-card">
      {submitted ? (
        <StatusBadge variant="success" icon="✓" label="Submitted" />
      ) : (
        <>
          <CardHeader title="Make a Choice" subtitle="Select an option to continue" />
          <div className="space-y-5 mb-5">
            {questions.map((q, qi) => {
              const multi = q.multi_select === true;
              return (
                <div key={qi}>
                  <div
                    className={`text-xs font-semibold uppercase mb-1 ${
                      theme === "dark" ? "text-slate-400" : "text-gray-500"
                    }`}
                  >
                    {q.header || "Question"}
                    {multi ? " · pick one or more" : ""}
                  </div>
                  <div className={`font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
                    {q.question}
                  </div>
                  <div className="space-y-2">
                    {(q.options || []).map((opt, oi) => (
                      <label
                        key={oi}
                        data-testid="ask-user-option"
                        className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                          isPicked(q.question, opt.label)
                            ? theme === "dark"
                              ? "bg-blue-900/30 border-blue-500/50"
                              : "bg-blue-50 border-blue-300"
                            : theme === "dark"
                              ? "bg-slate-800/50 border-slate-600 hover:border-slate-500"
                              : "bg-white border-gray-200 hover:border-gray-300"
                        } ${status !== "executing" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <input
                          type={multi ? "checkbox" : "radio"}
                          name={`ask-${uid}-${qi}`}
                          checked={isPicked(q.question, opt.label)}
                          disabled={status !== "executing"}
                          onChange={() => toggle(q.question, opt.label, multi)}
                          className="mt-1"
                        />
                        <span>
                          <span className="font-medium">{opt.label}</span>
                          {opt.description && (
                            <span
                              className={`block text-xs ${
                                theme === "dark" ? "text-slate-400" : "text-gray-500"
                              }`}
                            >
                              {opt.description}
                            </span>
                          )}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center">
            <ActionButton onClick={handleSubmit} disabled={!canSubmit} testId="ask-user-submit">
              Submit
            </ActionButton>
          </div>
        </>
      )}
    </HITLCard>
  );
};

// get_user_input form card (backend UserControlFlowTools). Renders one input per
// requested field and replies with the backend contract: { values: { "<field>": "<value>" } }.
export const UserInputFormCard = ({
  args,
  respond,
  status,
}: {
  args: {
    user_input_fields?: { field_name: string; field_type?: string; field_description?: string }[];
  };
  respond: (result: any) => void;
  status: string;
}) => {
  const fields = args?.user_input_fields ?? [];
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (fields.length === 0) return null;

  const isSecret = (f: { field_name: string; field_type?: string }) =>
    /secret|password|api[_-]?key|token/i.test(f.field_name) ||
    /secret|password/i.test(f.field_type || "");

  const allFilled = fields.every((f) => (values[f.field_name] ?? "").trim().length > 0);
  const canSubmit = allFilled && status === "executing" && !submitted;
  const handleSubmit = () => {
    if (canSubmit) {
      setSubmitted(true);
      respond({ values });
    }
  };

  return (
    <HITLCard testId="user-input-form">
      {submitted ? (
        <StatusBadge variant="info" icon="✓" label="Input Received" />
      ) : (
        <>
          <CardHeader title="Input Required" subtitle="Please provide the following" />
          <div className="space-y-4 mb-5">
            {fields.map((f) => (
              <div key={f.field_name}>
                <label className="block text-sm font-medium mb-1">
                  {f.field_description || f.field_name}
                </label>
                <TextInput
                  type={isSecret(f) ? "password" : "text"}
                  value={values[f.field_name] || ""}
                  onChange={(v) => setValues((prev) => ({ ...prev, [f.field_name]: v }))}
                  placeholder={f.field_name}
                  disabled={status !== "executing"}
                  testId="user-input-field"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <ActionButton onClick={handleSubmit} disabled={!canSubmit} testId="user-input-submit">
              Submit
            </ActionButton>
          </div>
        </>
      )}
    </HITLCard>
  );
};
