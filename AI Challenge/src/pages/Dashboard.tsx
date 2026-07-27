import { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { JobCard } from '../components/jobs/JobCard'
import { JobsTopBar, type JobsTab } from '../components/jobs/JobsTopBar'
import { RightRail } from '../components/jobs/RightRail'
import { mockJobs } from '../data/mockJobs'
import { getCurrentUser, logoutUser } from '../lib/mockAuth'
import type { CurrentUser } from '../types/auth'

export default function Dashboard() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [checked, setChecked] = useState(false)
  const [jobsTab, setJobsTab] = useState<JobsTab>('Recommended')

  useEffect(() => {
    setUser(getCurrentUser())
    setChecked(true)
  }, [])

  function handleLogout(): void {
    logoutUser()
    navigate('/login')
  }

  if (!checked) return null
  if (!user) return <Navigate to="/login" replace />

  const isJobsRoute = pathname === '/dashboard'

  return (
    <DashboardLayout user={user} onLogout={handleLogout} noPadding={isJobsRoute}>
      {isJobsRoute && (
        <>
          <JobsTopBar activeTab={jobsTab} onTabChange={setJobsTab} />
          <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-8 py-6">
            <div className="flex-1 space-y-4 min-w-0">
              {jobsTab === 'Recommended' &&
                mockJobs.map((job) => <JobCard key={job.id} job={job} />)}
              {jobsTab !== 'Recommended' && (
                <div className="text-sm text-[var(--color-muted)] py-12 text-center">
                  No {jobsTab.toLowerCase()} jobs to show yet.
                </div>
              )}
            </div>
            <RightRail user={user} />
          </div>
        </>
      )}
    </DashboardLayout>
  )
}
