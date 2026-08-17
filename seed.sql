-- Seed real municipal infrastructure records for GEODAR
-- Using real Raipur, Chhattisgarh locations and coordinates

INSERT INTO profiles (user_id, full_name, email, phone, location, account_type, civic_impact_score, avatar_url)
VALUES 
  ('admin-anubhav', 'Anubhav Wadekar', 'anubhav.w@geodar.io', '+91 98261 40592', 'Raipur, Chhattisgarh', 'Government', 380, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'),
  ('worker-rajesh', 'Rajesh Verma', 'rajesh.v@raipurmc.gov.in', '+91 94252 18930', 'Telibandha, Raipur', 'Field Worker', 240, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80')
ON CONFLICT (user_id) DO NOTHING;

-- Seed Reports
INSERT INTO reports (
  id, report_code, user_id, category, description, latitude, longitude, address, ward, status, 
  visual_severity, contextual_risk, priority_score, severity_level, ai_confidence, ai_classification, detected_issue, ai_observations, source, created_at, updated_at
) VALUES 
(
  'e2d3b4a5-1111-4000-8000-000000000001',
  'GD-28491',
  'admin-anubhav',
  'Pothole',
  'Deep circular cavity (18cm depth, 1.2m diameter) exposing wet aggregate base in the central carriage lane. Sub-base saturated after rainfall.',
  21.2514,
  81.6296,
  'GE Road, Near Magneto Mall, Pandri',
  'Ward 34 — Pandri Sector',
  'Verified',
  88,
  94,
  92,
  'CRITICAL',
  98,
  'CRITICAL',
  'Pothole with Sub-Base Failure',
  '["Severe asphalt loss", "Water intrusion in gravel base", "Immediate heavy vehicle suspension hazard"]'::jsonb,
  'Citizen App',
  NOW() - INTERVAL '3 hours',
  NOW() - INTERVAL '1 hour'
),
(
  'e2d3b4a5-2222-4000-8000-000000000002',
  'GD-28492',
  'admin-anubhav',
  'Waterlogging',
  'Heavy stormwater accumulation spanning 45 meters across both lanes. Primary culvert inlet obstructed with civic debris.',
  21.2468,
  81.6621,
  'VIP Chowk, Shankar Nagar Junction',
  'Ward 12 — Shankar Nagar',
  'Assigned',
  76,
  89,
  84,
  'HIGH',
  94,
  'HIGH',
  'Stormwater Culvert Blockage',
  '["45m submerged corridor", "Drainage gradient reversal", "Traffic flow throttled by 65%"]'::jsonb,
  'Patrol Camera',
  NOW() - INTERVAL '6 hours',
  NOW() - INTERVAL '2 hours'
),
(
  'e2d3b4a5-3333-4000-8000-000000000003',
  'GD-28493',
  'worker-rajesh',
  'Bridge Damage',
  'Expansion joint gap widening (42mm displacement) on westbound flyover approach. Minor concrete spalling on pier cap.',
  21.2385,
  81.6342,
  'Telibandha Flyover (Pier 14)',
  'Ward 28 — Telibandha',
  'Inspection',
  91,
  86,
  89,
  'CRITICAL',
  96,
  'CRITICAL',
  'Expansion Joint Fatigue & Spalling',
  '["42mm gap offset", "Pier cap shear micro-cracks", "Vibration resonance under multi-axle freight"]'::jsonb,
  'Drone Survey',
  NOW() - INTERVAL '12 hours',
  NOW() - INTERVAL '4 hours'
),
(
  'e2d3b4a5-4444-4000-8000-000000000004',
  'GD-28494',
  'admin-anubhav',
  'Drainage',
  'Broken RCC slab cover over primary stormwater drain. 2.4m open gap posing fatal pedestrian fall risk near bus terminal.',
  21.2589,
  81.6453,
  'Devendra Nagar Main Commercial Road',
  'Ward 19 — Devendra Nagar',
  'Repair',
  68,
  74,
  72,
  'MEDIUM',
  92,
  'MEDIUM',
  'Broken Stormwater Drain Cover',
  '["Exposed 2.4m drainage pit", "Missing structural rebar cage", "Civic pedestrian hazard"]'::jsonb,
  'Citizen App',
  NOW() - INTERVAL '1 day',
  NOW() - INTERVAL '5 hours'
),
(
  'e2d3b4a5-5555-4000-8000-000000000005',
  'GD-28495',
  'worker-rajesh',
  'Road Crack',
  'Longitudinal alligator cracking spanning 35m across asphalt surface course with active moisture seepage along curb line.',
  21.2291,
  81.6512,
  'Pachpedi Naka Circle, Ring Road 1',
  'Ward 41 — Pachpedi',
  'Resolved',
  42,
  38,
  40,
  'LOW',
  89,
  'LOW',
  'Longitudinal Pavement Fatigue',
  '["Bitumen embrittlement", "Sub-grade moisture intrusion", "Post-repair asphalt overlay verified"]'::jsonb,
  'Satellite InSAR',
  NOW() - INTERVAL '3 days',
  NOW() - INTERVAL '1 day'
)
ON CONFLICT (id) DO NOTHING;

-- Seed Report Images
INSERT INTO report_images (report_id, storage_path, public_or_signed_url, image_type, file_name)
VALUES
(
  'e2d3b4a5-1111-4000-8000-000000000001',
  'reports/GD-28491/pothole.jpg',
  'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=900&q=80',
  'primary',
  'ge_road_pothole.jpg'
),
(
  'e2d3b4a5-2222-4000-8000-000000000002',
  'reports/GD-28492/waterlogging.jpg',
  'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80',
  'primary',
  'vip_chowk_flood.jpg'
),
(
  'e2d3b4a5-3333-4000-8000-000000000003',
  'reports/GD-28493/bridge.jpg',
  'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=900&q=80',
  'primary',
  'telibandha_flyover.jpg'
),
(
  'e2d3b4a5-4444-4000-8000-000000000004',
  'reports/GD-28494/drainage.jpg',
  'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=900&q=80',
  'primary',
  'devendra_drain.jpg'
),
(
  'e2d3b4a5-5555-4000-8000-000000000005',
  'reports/GD-28495/crack.jpg',
  'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=900&q=80',
  'primary',
  'pachpedi_cracks.jpg'
)
ON CONFLICT (id) DO NOTHING;

-- Seed Report Analysis
INSERT INTO report_analysis (
  report_id, model_used, detected_issue, classification, visual_severity, ai_confidence, 
  observations, structural_integrity_risk, traffic_impact_factor, weather_vulnerability_factor
) VALUES 
(
  'e2d3b4a5-1111-4000-8000-000000000001',
  'gemini-2.5-flash',
  'Pothole with Sub-Base Failure',
  'CRITICAL',
  88,
  98,
  '["Severe asphalt loss", "Water intrusion in gravel base", "Immediate heavy vehicle suspension hazard"]'::jsonb,
  89,
  92,
  95
),
(
  'e2d3b4a5-2222-4000-8000-000000000002',
  'gemini-2.5-flash',
  'Stormwater Culvert Blockage',
  'HIGH',
  76,
  94,
  '["45m submerged corridor", "Drainage gradient reversal", "Traffic flow throttled by 65%"]'::jsonb,
  74,
  88,
  91
),
(
  'e2d3b4a5-3333-4000-8000-000000000003',
  'gemini-2.5-flash',
  'Expansion Joint Fatigue & Spalling',
  'CRITICAL',
  91,
  96,
  '["42mm gap offset", "Pier cap shear micro-cracks", "Vibration resonance under multi-axle freight"]'::jsonb,
  94,
  85,
  82
),
(
  'e2d3b4a5-4444-4000-8000-000000000004',
  'gemini-2.5-flash',
  'Broken Stormwater Drain Cover',
  'MEDIUM',
  68,
  92,
  '["Exposed 2.4m drainage pit", "Missing structural rebar cage", "Civic pedestrian hazard"]'::jsonb,
  65,
  70,
  78
),
(
  'e2d3b4a5-5555-4000-8000-000000000005',
  'gemini-2.5-flash',
  'Longitudinal Pavement Fatigue',
  'LOW',
  42,
  89,
  '["Bitumen embrittlement", "Sub-grade moisture intrusion", "Post-repair asphalt overlay verified"]'::jsonb,
  40,
  35,
  45
)
ON CONFLICT (id) DO NOTHING;

-- Seed Status History
INSERT INTO report_status_history (report_id, status, changed_by, notes, created_at)
VALUES
('e2d3b4a5-1111-4000-8000-000000000001', 'Submitted', 'Citizen App User', 'Initial photo capture uploaded with GPS location', NOW() - INTERVAL '3 hours'),
('e2d3b4a5-1111-4000-8000-000000000001', 'AI Analyzed', 'GEODAR GeoAI Engine', 'Gemini Vision classified as Critical Pothole (98% confidence)', NOW() - INTERVAL '2 hours 58 minutes'),
('e2d3b4a5-1111-4000-8000-000000000001', 'Verified', 'Anubhav Wadekar (Chief Officer)', 'Municipal engineer approved priority queue ranking #1', NOW() - INTERVAL '1 hour'),

('e2d3b4a5-2222-4000-8000-000000000002', 'Submitted', 'Patrol Unit 04', 'Automated dashcam flagged standing water', NOW() - INTERVAL '6 hours'),
('e2d3b4a5-2222-4000-8000-000000000002', 'AI Analyzed', 'GEODAR GeoAI Engine', 'High severity stormwater ponding detected', NOW() - INTERVAL '5 hours 55 minutes'),
('e2d3b4a5-2222-4000-8000-000000000002', 'Verified', 'Municipal Command', 'Cross-referenced with meteorological radar', NOW() - INTERVAL '4 hours'),
('e2d3b4a5-2222-4000-8000-000000000002', 'Assigned', 'Dispatch Controller', 'Routed to Drainage Desilting Team B', NOW() - INTERVAL '2 hours'),

('e2d3b4a5-3333-4000-8000-000000000003', 'Submitted', 'Drone Inspection Pilot', 'Orthomosaic survey capture', NOW() - INTERVAL '12 hours'),
('e2d3b4a5-3333-4000-8000-000000000003', 'AI Analyzed', 'GEODAR GeoAI Engine', 'Structural shear crack morphology detected', NOW() - INTERVAL '11 hours 50 minutes'),
('e2d3b4a5-3333-4000-8000-000000000003', 'Verified', 'PWD Structural Auditor', 'Confirmed expansion gap threshold exceeded', NOW() - INTERVAL '8 hours'),
('e2d3b4a5-3333-4000-8000-000000000003', 'Assigned', 'Chief Engineer', 'Assigned to State Bridges Division', NOW() - INTERVAL '6 hours'),
('e2d3b4a5-3333-4000-8000-000000000003', 'Inspection', 'Field Crew Lead', 'On-site ultrasonic concrete testing underway', NOW() - INTERVAL '4 hours'),

('e2d3b4a5-4444-4000-8000-000000000004', 'Submitted', 'Citizen Reporter', 'Open drain flagged on main street', NOW() - INTERVAL '1 day'),
('e2d3b4a5-4444-4000-8000-000000000004', 'AI Analyzed', 'GEODAR GeoAI Engine', 'Medium severity open slab detected', NOW() - INTERVAL '23 hours'),
('e2d3b4a5-4444-4000-8000-000000000004', 'Verified', 'Zone 3 Inspector', 'Physical inspection barrier erected', NOW() - INTERVAL '18 hours'),
('e2d3b4a5-4444-4000-8000-000000000004', 'Assigned', 'Contractor Cell', 'Prefabricated RCC slab ordered', NOW() - INTERVAL '12 hours'),
('e2d3b4a5-4444-4000-8000-000000000004', 'Inspection', 'Field Supervisor', 'Excavation dimensions validated', NOW() - INTERVAL '8 hours'),
('e2d3b4a5-4444-4000-8000-000000000004', 'Repair', 'Civil Contractor', 'New reinforced cover slab placed and mortared', NOW() - INTERVAL '5 hours'),

('e2d3b4a5-5555-4000-8000-000000000005', 'Submitted', 'Satellite InSAR Feed', 'Surface displacement alert', NOW() - INTERVAL '3 days'),
('e2d3b4a5-5555-4000-8000-000000000005', 'AI Analyzed', 'GEODAR GeoAI Engine', 'Pavement fatigue cracks mapped', NOW() - INTERVAL '3 days'),
('e2d3b4a5-5555-4000-8000-000000000005', 'Verified', 'Road Maintenance Lead', 'Scheduled for routine asphalt resealing', NOW() - INTERVAL '2 days'),
('e2d3b4a5-5555-4000-8000-000000000005', 'Assigned', 'Hot-Mix Asphalt Team', 'Work order issued', NOW() - INTERVAL '2 days'),
('e2d3b4a5-5555-4000-8000-000000000005', 'Inspection', 'Site Supervisor', 'Sub-base pre-compaction checked', NOW() - INTERVAL '36 hours'),
('e2d3b4a5-5555-4000-8000-000000000005', 'Repair', 'Asphalt Paving Crew', 'Micro-surfacing overlay applied', NOW() - INTERVAL '24 hours'),
('e2d3b4a5-5555-4000-8000-000000000005', 'Resolved', 'Quality Assurance Auditor', 'Post-repair ride quality and compaction certified', NOW() - INTERVAL '1 day')
ON CONFLICT (id) DO NOTHING;

-- Seed Infrastructure Assets
INSERT INTO infrastructure_assets (asset_code, name, type, health_score, failure_risk_30d, critical_nodes_count, ward, latitude, longitude)
VALUES
('AST-RD-01', 'GE Road Arterial Corridor', 'Major Arterial Road', 72, 68, 8, 'Ward 34 — Pandri Sector', 21.2514, 81.6296),
('AST-BR-02', 'Telibandha Flyover Complex', 'Bridge / Overpass', 81, 74, 3, 'Ward 28 — Telibandha', 21.2385, 81.6342),
('AST-DR-03', 'Pandri Main Stormwater Outfall', 'Stormwater Drain', 64, 82, 12, 'Ward 12 — Shankar Nagar', 21.2468, 81.6621),
('AST-RD-04', 'Ring Road 1 High-Density Transit', 'Express Highway', 88, 22, 2, 'Ward 41 — Pachpedi', 21.2291, 81.6512),
('AST-CL-05', 'Devendra Nagar Box Culvert', 'Culvert System', 76, 45, 5, 'Ward 19 — Devendra Nagar', 21.2589, 81.6453)
ON CONFLICT (asset_code) DO NOTHING;
