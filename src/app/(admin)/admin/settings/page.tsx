"use client";

import { useAdmin } from "@/lib/admin/store";
import { useUI } from "@/lib/admin/ui-store";
import { PIPELINE_STAGES, TEAM } from "@/lib/admin/seed";
import { PageHead } from "@/components/admin/ui/PageHead";
import { Panel } from "@/components/admin/ui/Panel";
import { Btn } from "@/components/admin/ui/Btn";
import { Lbl } from "@/components/admin/ui/Lbl";

export default function SettingsPage() {
  const { exportData, resetData } = useAdmin();
  const { toast } = useUI();

  return (
    <>
      <PageHead title="Settings" sub="Workspace, team, and data." />

      <div className="grid grid-cols-3 max-[1100px]:grid-cols-1 gap-px bg-c3-border">
        <Panel title="Team" bodyClassName="flex flex-col gap-3.5">
          {TEAM.map(([i, n, r]) => (
            <div key={n} className="flex items-center gap-3">
              <span className="w-8 h-8 flex-shrink-0 bg-c3-card2 border border-c3-yellow-dim text-c3-yellow inline-flex items-center justify-center font-disp text-[13px]">
                {i}
              </span>
              <div>
                <div className="font-cond font-semibold text-[15px] uppercase tracking-[0.03em]">
                  {n}
                </div>
                <Lbl>{r}</Lbl>
              </div>
            </div>
          ))}
          <Btn
            sm
            variant="ghost"
            className="self-start mt-1.5"
            onClick={() => toast("Invite is a prototype")}
          >
            + Invite teammate
          </Btn>
        </Panel>

        <Panel title="Pipeline Stages">
          {PIPELINE_STAGES.map((s) => (
            <div key={s} className="flex items-center gap-3 py-3 border-b border-dashed border-c3-border last:border-0">
              <span className="w-[18px] h-[18px] border border-c3-yellow-dim flex-shrink-0" />
              <div className="font-body text-[13px] text-c3-text">{s}</div>
            </div>
          ))}
        </Panel>

        <Panel title="Data" bodyClassName="flex flex-col gap-3.5">
          <p className="font-body text-[13px] text-c3-mid leading-[1.6]">
            This is a frontend prototype. All records live in your browser’s local
            storage — nothing is sent anywhere.
          </p>
          <Btn sm variant="ghost" className="self-start" onClick={exportData}>
            Export JSON
          </Btn>
          <Btn
            sm
            variant="danger"
            className="self-start"
            onClick={() => {
              if (confirm("Reset all data to the sample set?")) {
                resetData();
                toast("Data reset");
              }
            }}
          >
            Reset to sample data
          </Btn>
        </Panel>
      </div>
    </>
  );
}
