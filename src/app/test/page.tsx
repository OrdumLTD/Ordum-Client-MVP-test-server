"use client";

import MemberEdit from "@/Components/Member/MemberEdit";
import MemberBasic from "@/Components/Member/MemberBasic";
import Milestone from "@/Components/milestones/Milestone/milestone";
import Team from "@/Components/Team";
import Task from "@/Components/tast/task";
import Layout from "@/Components/ui/Layout";
import MemberCreate from "@/Components/Member/MemberCreate";

const Test = () => {
  return (
    <div>
      <Layout>
        <div className="m-10 w-full">
          <h1 className="text-2xl font-bold">MILSTONE CREATE</h1>
          <Milestone name="1st milestone" description="Testing" />

          <div className="mt-10">
            <h1 className="text-2xl font-bold">Task</h1>
            <Task
              name="1st tast"
              description="Task testing"
              taskType="Research"
            />

            <div className="mt-10">
              <h1 className="text-2xl font-bold">Member Create</h1>
              <MemberCreate />
            </div>

            <div className="mt-10">
              <h1 className="text-2xl font-bold">Member Edit</h1>
              <MemberEdit name="Jone Doe" role="Boss Girl" />
            </div>

            <div className="mt-10">
              <h1 className="text-2xl font-bold">Member Basic</h1>
              <MemberBasic name="John Doe" role="CTO" />
            </div>

            <div className="mt-10">
              <h1 className="text-2xl font-bold">Team page</h1>
              <Team
                members={[
                  { name: "Jane Doe1", role: "The boss" },
                  { name: "Jane Doe", role: "The boss" },
                ]}
              />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Test;
