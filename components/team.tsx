"use client"

import { Card } from "@/components/ui/card"
import { Crown, Briefcase, Users, Award } from "lucide-react"

const leadership = [
  {
    name: "Sandeep Kumar Singh",
    role: "CEO & Director",
    initials: "SKS",
    icon: Crown,
    gradient: "from-purple-500 to-pink-500",
    description: "Strategic Vision & Leadership",
  },
  {
    name: "Prince Raj",
    role: "Managing Director",
    initials: "PR",
    icon: Briefcase,
    gradient: "from-blue-500 to-cyan-500",
    description: "Operations & Management",
  },
  {
    name: "Rakesh Kumar",
    role: "HR",
    initials: "RK",
    icon: Users,
    gradient: "from-green-500 to-emerald-500",
    description: "Human Resources & Talent",
  },
  {
    name: "Rajnish Kumar",
    role: "Team Leader",
    initials: "RK",
    icon: Award,
    gradient: "from-orange-500 to-red-500",
    description: "Team Coordination & Excellence",
  },
]

export function Team() {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Leadership Team</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-foreground bg-clip-text">
              Meet Our Leadership
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experienced professionals driving innovation and excellence in collection & recovery services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((member, index) => {
              const Icon = member.icon
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-card"
                >
                  {/* Gradient Background Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  {/* Content */}
                  <div className="relative z-10 p-6">
                    {/* Icon Badge */}
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${member.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Avatar Circle */}
                    <div className="relative mb-4">
                      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-xl group-hover:scale-105 transition-transform duration-300">
                        <span className="text-2xl font-bold text-gray-700 dark:text-gray-200">
                          {member.initials}
                        </span>
                      </div>
                      {/* Status Indicator */}
                      <div className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg" />
                    </div>

                    {/* Name & Role */}
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-sm font-semibold text-primary mb-2">{member.role}</p>
                      <p className="text-xs text-muted-foreground">{member.description}</p>
                    </div>

                  </div>

                  {/* Hover Glow Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500 -z-10`}
                  />
                </Card>
              )
            })}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <Card className="inline-block px-8 py-4 border-2 bg-gradient-to-r from-primary/5 to-primary/10">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Golden Sky</span> - Led by experienced professionals
                committed to excellence in debt recovery and collection services
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
